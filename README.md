# Afrika Property Guardian

Immutable property listings and fractional ownership built on Hedera Hashgraph for the Hedera Africa Hackathon.

## What This Actually Does

Stores property listings permanently on Hedera blockchain. Prevents deletion. Tracks ownership history. Enables fractional investment starting at ten dollars. This creates fraud-resistant records.

## Key Features

- Immutable property registry (cannot delete history)
- Fractional ownership via HTS tokenization (invest from $10)
- Complete transaction history (all edits tracked)
- Transparent ownership records (verifiable on-chain)
- Smart contract automation (rules enforced programmatically)

## Technology Stack

### Hedera Integration
- Smart Contracts: PropertyRegistry.sol deployed on Hedera
- HTS (Token Service): Fractional ownership tokens
- HCS (Consensus Service): Event logging and tracking
- Hedera SDK: Frontend integration with @hashgraph/sdk

### Frontend
- Framework: Next.js 16 with React 19
- Language: TypeScript
- Styling: Tailwind CSS
- Wallet Connection: AppKit (WalletConnect) v1.7.10
- Hedera SDK: Direct blockchain communication

## Architecture

No backend required. Frontend communicates directly with Hedera blockchain.

### Frontend → Smart Contract (Direct)
Property listings stored directly on Hedera smart contracts. Permanent. Immutable.

### Frontend → HTS Tokens (Direct)
Fractional ownership managed through HTS tokens. Minted on-chain. Tradeable.

### Frontend → Mirror Node (Direct)
Transaction history queried directly from Hedera Mirror Node. No database needed.

## Project Structure

```
afrika-property-guardian/
├── frontends/              # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   └── utils/         # Hedera SDK integration
│   └── package.json
├── Smart-contract/
│   └── PropertyRegistry.sol  # Hedera smart contract
└── scripts/                # Deployment scripts
```

## Core Smart Contract Functions

### Property Management
- `listProperty()`: Create immutable property listing
- `updatePropertyPrice()`: Edit tracked permanently
- `deactivateProperty()`: Hide listing (history remains)
- `getProperty()`: View property details

### Fractional Ownership
- `fractionalizeProperty()`: Tokenize with HTS
- `purchaseFractionalShares()`: Buy ownership tokens
- `getFractionalOwnership()`: View share ownership

### History Tracking
- `getPropertyEditHistory()`: All edits visible
- `getOwnershipHistory()`: Complete transfer chain

## Benefits

### Eliminates Backend
- No server required
- No database maintenance
- No API layer overhead
- All data on Hedera blockchain

### Decentralized
- Blockchain backend
- Smart contract logic
- Token economy
- Permanent data storage

### Simple Deployment
- Frontend only deployment
- No server scaling issues
- Reduced operational costs

## Supported Networks

### Hedera Testnet
- Network: Hedera Testnet
- Explorer: https://hashscan.io/testnet

### Mainnet
- Network: Hedera Mainnet
- Explorer: https://hashscan.io/mainnet

## Setting Up

### 1. Install Dependencies
```bash
cd frontends
npm install
```

### 2. Configure Environment
```bash
cp env.example .env.local
```

Add your configuration to `.env.local`:
```env
# Hedera Network Configuration
NEXT_PUBLIC_HEDERA_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ID=0.0.XXXXXX
NEXT_PUBLIC_OPERATOR_ID=0.0.XXXXXX
NEXT_PUBLIC_OPERATOR_KEY=YOUR_PRIVATE_KEY
NEXT_PUBLIC_TOKEN_ID=0.0.XXXXXX

# Mirror Node Configuration (automatically set based on NEXT_PUBLIC_HEDERA_NETWORK)
# Testnet: https://testnet.mirrornode.hedera.com
# Mainnet: https://mainnet-public.mirrornode.hedera.com

# AppKit Wallet Configuration
NEXT_PUBLIC_PROJECT_ID=a9fbadc760baa309220363ec867b732e
NEXT_PUBLIC_ENVIRONMENT=testnet
```

**Required Variables:**
- `NEXT_PUBLIC_HEDERA_NETWORK`: Network to use (`testnet` or `mainnet`)
- `NEXT_PUBLIC_CONTRACT_ID`: Deployed PropertyRegistry contract ID
- `NEXT_PUBLIC_PROJECT_ID`: WalletConnect AppKit project ID (already configured)
- `NEXT_PUBLIC_OPERATOR_ID`: Your Hedera account ID (for contract interactions)
- `NEXT_PUBLIC_OPERATOR_KEY`: Your private key (for signing transactions)
- `NEXT_PUBLIC_TOKEN_ID`: HTS token ID for fractional ownership (if implemented)

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

## Demo Flow

### List Property
1. Connect wallet
2. Fill property details form
3. Submit to Hedera smart contract
4. Property stored permanently on blockchain

### Fractionalize
1. Select property
2. Create HTS token for shares
3. Mint fractional ownership tokens
4. Sell shares starting at $10

### View History
1. Search property
2. View complete edit history
3. Track ownership transfers
4. Verify on Hashscan

## Why This Works

Blockchain does three things well:
1. Immutability: Cannot delete history
2. Transparency: Public verification
3. Programmability: Smart contract rules

We use these strengths. We don't promise AI magic or cost elimination. We promise permanent records and transparent ownership.

## Contributing

Contributions welcome. Submit pull requests.

## License

MIT License

## Acknowledgements

- Hedera Hashgraph
- Hedera Africa Hackathon
- WalletConnect (AppKit)
- GameD project for architectural inspiration
