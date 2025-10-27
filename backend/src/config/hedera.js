const { Client, PrivateKey, AccountId } = require("@hashgraph/sdk");
require('dotenv').config();

class HederaClient {
    constructor() {
        this.client = null;
        this.operatorId = null;
        this.operatorKey = null;
    }

    async initialize() {
        try {
            // Get credentials from environment
            this.operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID || '0.0.123456');
            
            // Use a valid testnet private key format for development
            const defaultPrivateKey = '302e020100300506032b657004220420' + 
                'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890';
            this.operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY || defaultPrivateKey);

            // Create client for testnet
            if (process.env.HEDERA_NETWORK === 'testnet') {
                this.client = Client.forTestnet();
            } else if (process.env.HEDERA_NETWORK === 'mainnet') {
                this.client = Client.forMainnet();
            } else {
                // Default to testnet
                this.client = Client.forTestnet();
            }

            // Set operator
            this.client.setOperator(this.operatorId, this.operatorKey);
            
            // Set default max transaction fee (2 HBAR)
            this.client.setDefaultMaxTransactionFee(2);
            
            // Set max query payment (1 HBAR)
            this.client.setDefaultMaxQueryPayment(1);

            console.log('✅ Hedera client initialized successfully');
            return this.client;
        } catch (error) {
            console.error('❌ Error initializing Hedera client:', error);
            // For MVP, we'll use a mock client instead of throwing
            console.log('⚠️ Using mock Hedera client for development');
            this.client = null;
            return null;
        }
    }

    getClient() {
        if (!this.client) {
            console.log('⚠️ Hedera client not available, using mock mode');
            return null;
        }
        return this.client;
    }

    getOperatorId() {
        return this.operatorId;
    }

    getOperatorKey() {
        return this.operatorKey;
    }
}

// Export singleton instance
const hederaClient = new HederaClient();
module.exports = hederaClient;
