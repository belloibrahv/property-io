/**
 * React hooks for Hedera Mirror Node integration
 */

import { useState, useEffect, useCallback } from 'react';
import { mirrorNodeService, AccountInfo, Transaction } from '../services/mirrorNode';
import { propertyService, PropertyOperation, PropertyHistory } from '../services/propertyService';

// Hook for account information
export function useAccountInfo(accountId: string | null) {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccountInfo = useCallback(async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);

    try {
      const info = await mirrorNodeService.getAccountInfo(accountId);
      const accountBalance = await mirrorNodeService.getAccountBalance(accountId);
      
      setAccountInfo(info);
      setBalance(accountBalance);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch account info');
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  return {
    accountInfo,
    balance,
    loading,
    error,
    refetch: fetchAccountInfo
  };
}

// Hook for account transactions
export function useAccountTransactions(accountId: string | null, limit: number = 25) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);

    try {
      const txs = await mirrorNodeService.getAccountTransactions(accountId, limit);
      setTransactions(txs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [accountId, limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions
  };
}

// Hook for property operations
export function usePropertyOperations(accountId: string | null) {
  const [operations, setOperations] = useState<PropertyOperation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOperations = useCallback(async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);

    try {
      const ops = await propertyService.getAccountPropertyOperations(accountId);
      setOperations(ops);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch property operations');
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchOperations();
  }, [fetchOperations]);

  return {
    operations,
    loading,
    error,
    refetch: fetchOperations
  };
}

// Hook for property history
export function usePropertyHistory(propertyId: string | null) {
  const [history, setHistory] = useState<PropertyHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!propertyId) return;

    setLoading(true);
    setError(null);

    try {
      const hist = await propertyService.getPropertyHistory(propertyId);
      setHistory(hist);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch property history');
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    error,
    refetch: fetchHistory
  };
}

// Hook for recent property listings
export function useRecentPropertyListings(limit: number = 20) {
  const [listings, setListings] = useState<PropertyOperation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const recentListings = await propertyService.getRecentPropertyListings(limit);
      setListings(recentListings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recent listings');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return {
    listings,
    loading,
    error,
    refetch: fetchListings
  };
}

// Hook for token balances (fractional ownership)
export function useTokenBalances(accountId: string | null) {
  const [balances, setBalances] = useState<Array<{
    tokenId: string;
    symbol: string;
    balance: number;
    decimals: number;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalances = useCallback(async () => {
    if (!accountId) return;

    setLoading(true);
    setError(null);

    try {
      const tokenBalances = await propertyService.getAccountTokenBalances(accountId);
      setBalances(tokenBalances);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token balances');
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return {
    balances,
    loading,
    error,
    refetch: fetchBalances
  };
}

// Hook for network statistics
export function useNetworkStats() {
  const [stats, setStats] = useState<{
    totalTransactions: number;
    recentActivity: number;
    networkHealth: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const networkStats = await propertyService.getPropertyNetworkStats();
      setStats(networkStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch network stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
}
