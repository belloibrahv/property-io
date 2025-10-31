/**
 * Property Service using Hedera Mirror Node
 * 
 * This service tracks property operations by querying Hedera Mirror Node.
 * No backend database needed - all data comes from blockchain.
 */

import { mirrorNodeService, Transaction, ContractResult } from './mirrorNode';

export interface PropertyDetails {
  memo?: string;
  transfers?: Transaction['transfers'];
  fee?: number;
  result?: string;
  functionName?: string;
  functionParameters?: string;
  gasUsed?: number;
  logs?: ContractResult['logs'];
}

export interface PropertyOperation {
  transactionId: string;
  timestamp: string;
  operation: 'list' | 'update' | 'fractionalize' | 'sell' | 'deactivate';
  propertyId?: string;
  details: PropertyDetails;
  accountId: string;
}

export interface PropertyHistory {
  propertyId: string;
  operations: PropertyOperation[];
  ownershipHistory: Array<{
    from: string;
    to: string;
    timestamp: string;
    transactionId: string;
  }>;
}

export class PropertyService {
  private contractId: string;

  constructor() {
    this.contractId = process.env.NEXT_PUBLIC_CONTRACT_ID || '';
    if (!this.contractId) {
      console.warn('Contract ID not configured. Property operations will not be tracked.');
    }
  }

  /**
   * Get all property-related transactions for a specific account
   */
  async getAccountPropertyOperations(accountId: string): Promise<PropertyOperation[]> {
    try {
      const transactions = await mirrorNodeService.getAccountTransactions(accountId, 100);
      
      return transactions
        .filter(tx => this.isPropertyTransaction(tx))
        .map(tx => this.parsePropertyTransaction(tx))
        .filter(op => op !== null) as PropertyOperation[];
    } catch (error) {
      console.error('Failed to get account property operations:', error);
      return [];
    }
  }

  /**
   * Get property history by searching transaction memos
   */
  async getPropertyHistory(propertyId: string): Promise<PropertyHistory> {
    try {
      // Search for transactions with property ID in memo
      const transactions = await mirrorNodeService.searchTransactionsByMemo(propertyId, 100);
      
      const operations: PropertyOperation[] = [];
      const ownershipHistory: Array<{
        from: string;
        to: string;
        timestamp: string;
        transactionId: string;
      }> = [];

      transactions.forEach(tx => {
        const operation = this.parsePropertyTransaction(tx);
        if (operation) {
          operations.push(operation);
          
          // Extract ownership changes from transfers
          if (tx.transfers && tx.transfers.length >= 2) {
            const fromTransfer = tx.transfers.find(t => t.amount < 0);
            const toTransfer = tx.transfers.find(t => t.amount > 0);
            
            if (fromTransfer && toTransfer) {
              ownershipHistory.push({
                from: fromTransfer.account,
                to: toTransfer.account,
                timestamp: tx.consensus_timestamp,
                transactionId: tx.transaction_id
              });
            }
          }
        }
      });

      return {
        propertyId,
        operations: operations.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ),
        ownershipHistory: ownershipHistory.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      };
    } catch (error) {
      console.error('Failed to get property history:', error);
      return {
        propertyId,
        operations: [],
        ownershipHistory: []
      };
    }
  }

  /**
   * Get recent property listings across the network
   */
  async getRecentPropertyListings(limit: number = 20): Promise<PropertyOperation[]> {
    try {
      // Prefer contract results if contractId is configured
      if (this.contractId) {
        try {
          const results = await mirrorNodeService.getContractResults(this.contractId, limit * 2);
          return results
            .map(res => this.parseContractResult(res))
            .filter(op => op !== null)
            .slice(0, limit) as PropertyOperation[];
        } catch (e) {
          console.warn('Falling back to recent transactions due to contract results error:', e);
        }
      }

      const transactions = await mirrorNodeService.getRecentTransactions(limit * 2);
      return transactions
        .filter(tx => this.isPropertyTransaction(tx) && this.isListingTransaction(tx))
        .map(tx => this.parsePropertyTransaction(tx))
        .filter(op => op !== null)
        .slice(0, limit) as PropertyOperation[];
    } catch (error) {
      console.error('Failed to get recent property listings:', error);
      return [];
    }
  }

  /**
   * Get fractional ownership data for a property
   */
  async getFractionalOwnershipData(tokenId: string): Promise<{
    totalSupply: number;
    holders: Array<{
      accountId: string;
      balance: number;
      percentage: number;
    }>;
  }> {
    try {
      const tokenInfo = await mirrorNodeService.getTokenInfo(tokenId);
      const totalSupply = parseInt(tokenInfo.total_supply);

      // Get all token holders (this would need to be implemented based on token transfers)
      // For now, return basic info
      return {
        totalSupply,
        holders: [] // Would need to query token transfer history
      };
    } catch (error) {
      console.error('Failed to get fractional ownership data:', error);
      return {
        totalSupply: 0,
        holders: []
      };
    }
  }

  /**
   * Check if a transaction is property-related
   */
  private isPropertyTransaction(tx: Transaction): boolean {
    // Check if transaction involves our contract
    if (tx.name === 'ContractCall' || tx.name === 'ContractCreate') {
      return true;
    }

    // Check memo for property-related keywords
    const memo = tx.memo_base64 ? atob(tx.memo_base64) : '';
    const propertyKeywords = ['property', 'listing', 'fractional', 'ownership'];
    
    return propertyKeywords.some(keyword => 
      memo.toLowerCase().includes(keyword)
    );
  }

  /**
   * Check if a transaction is a property listing
   */
  private isListingTransaction(tx: Transaction): boolean {
    const memo = tx.memo_base64 ? atob(tx.memo_base64) : '';
    return memo.toLowerCase().includes('list') || memo.toLowerCase().includes('register');
  }

  /**
   * Parse transaction into property operation
   */
  private parsePropertyTransaction(tx: Transaction): PropertyOperation | null {
    try {
      const memo = tx.memo_base64 ? atob(tx.memo_base64) : '';
      const accountId = tx.transfers?.[0]?.account || '';

      // Determine operation type from memo or transaction name
      let operation: PropertyOperation['operation'] = 'list';
      
      if (memo.includes('update') || memo.includes('edit')) {
        operation = 'update';
      } else if (memo.includes('fractional') || memo.includes('tokenize')) {
        operation = 'fractionalize';
      } else if (memo.includes('sell') || memo.includes('transfer')) {
        operation = 'sell';
      } else if (memo.includes('deactivate') || memo.includes('hide')) {
        operation = 'deactivate';
      }

      // Extract property ID from memo if available
      const propertyIdMatch = memo.match(/property[:\s]*(\w+)/i);
      const propertyId = propertyIdMatch ? propertyIdMatch[1] : undefined;

      return {
        transactionId: tx.transaction_id,
        timestamp: tx.consensus_timestamp,
        operation,
        propertyId,
        details: {
          memo,
          transfers: tx.transfers,
          fee: tx.charged_tx_fee,
          result: tx.result
        },
        accountId
      };
    } catch (error) {
      console.error('Failed to parse property transaction:', error);
      return null;
    }
  }

  /**
   * Parse contract results into property operations (best-effort without ABI)
   */
  private parseContractResult(res: ContractResult): PropertyOperation | null {
    try {
      const fn = (res.function_name || '').toLowerCase();
      let operation: PropertyOperation['operation'] = 'list';

      if (fn.includes('update')) {
        operation = 'update';
      } else if (fn.includes('fraction') || fn.includes('token')) {
        operation = 'fractionalize';
      } else if (fn.includes('sell') || fn.includes('transfer')) {
        operation = 'sell';
      } else if (fn.includes('deactivate') || fn.includes('hide')) {
        operation = 'deactivate';
      }

      // Try to infer propertyId from function_parameters (hex-encoded)
      let propertyId: string | undefined = undefined;
      const paramsHex: string = res.function_parameters || '';
      if (paramsHex) {
        // Naive attempt: decode ASCII segments from hex
        try {
          const hex = paramsHex.replace(/^0x/, '');
          const bytes = new Uint8Array(hex.match(/.{1,2}/g)?.map(b => parseInt(b, 16)) || []);
          const ascii = new TextDecoder().decode(bytes);
          const match = ascii.match(/property[:\s]*(\w+)/i);
          propertyId = match ? match[1] : undefined;
        } catch (_) {
          // ignore decode errors
        }
      }

      return {
        transactionId: res.transaction_hash || res.timestamp,
        timestamp: res.timestamp,
        operation,
        propertyId,
        details: {
          functionName: res.function_name,
          functionParameters: res.function_parameters,
          gasUsed: res.gas_used,
          result: res.result,
          logs: res.logs
        },
        accountId: res.from || ''
      };
    } catch (error) {
      console.error('Failed to parse contract result:', error);
      return null;
    }
  }

  /**
   * Get account's token balances (for fractional ownership)
   */
  async getAccountTokenBalances(accountId: string): Promise<Array<{
    tokenId: string;
    symbol: string;
    balance: number;
    decimals: number;
  }>> {
    try {
      const tokens = await mirrorNodeService.getAccountTokens(accountId);
      
      const balances = await Promise.all(
        tokens.map(async (token) => {
          const balance = await mirrorNodeService.getTokenBalance(accountId, token.token_id);
          return {
            tokenId: token.token_id,
            symbol: token.symbol,
            balance,
            decimals: token.decimals
          };
        })
      );

      return balances.filter(b => b.balance > 0);
    } catch (error) {
      console.error('Failed to get account token balances:', error);
      return [];
    }
  }

  /**
   * Get network statistics for property operations
   */
  async getPropertyNetworkStats(): Promise<{
    totalTransactions: number;
    recentActivity: number;
    networkHealth: string;
  }> {
    try {
      const stats = await mirrorNodeService.getNetworkStats();
      const recentTxs = await mirrorNodeService.getRecentTransactions(10);
      
      return {
        totalTransactions: stats.total_transactions || 0,
        recentActivity: recentTxs.length,
        networkHealth: 'healthy' // Simplified for now
      };
    } catch (error) {
      console.error('Failed to get network stats:', error);
      return {
        totalTransactions: 0,
        recentActivity: 0,
        networkHealth: 'unknown'
      };
    }
  }
}

// Export singleton instance
export const propertyService = new PropertyService();
