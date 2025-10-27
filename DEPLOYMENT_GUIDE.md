# Contract Deployment Guide

This guide walks you through deploying the PropertyRegistry contract to Hedera.

## Prerequisites

1. Hedera Testnet Account with HBAR
2. Hedera SDK installed
3. Contract compiled and bytecode ready

## Step 1: Install Dependencies

```bash
cd scripts
npm install
```

## Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Hedera credentials:

```env
HEDERA_OPERATOR_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_OPERATOR_KEY=YOUR_PRIVATE_KEY_HERE
HEDERA_NETWORK=testnet
```

## Step 3: Compile Contract

### Option A: Using Remix IDE (Recommended)

1. Go to [https://remix.ethereum.org](https://remix.ethereum.org)
2. Create new file `PropertyRegistry.sol`
3. Copy contract code from `Smart-contract/PropertyRegistry.sol`
4. Compile with Solidity 0.8.19
5. Get bytecode from "Compilation Details"
6. Save as `scripts/contractBytecode.txt`

### Option B: Using Hardhat (Advanced)

```bash
# Install Hardhat
npm install --save-dev hardhat

# Compile
npx hardhat compile

# Get bytecode from artifacts
```

## Step 4: Deploy Contract

```bash
cd scripts
node deployContract.js
```

Expected output:
```
🚀 Starting Afrika Property Guardian contract deployment...
📤 Uploading contract to Hedera...
✅ Contract uploaded to file: 0.0.XXXXXX
🏗️ Deploying contract...
🎉 CONTRACT DEPLOYED SUCCESSFULLY!
📍 Contract ID: 0.0.XXXXXX
🔗 View on Hashscan: https://hashscan.io/testnet/contract/0.0.XXXXXX
📝 Updating .env.local...
✅ Environment updated!
```

## Step 5: Update Frontend Configuration

The deployment script automatically updates `frontends/.env.local`, but you can also manually update:

```bash
cd ../frontends
```

Edit `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ID=0.0.XXXXXX  # Your deployed contract ID
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```

## Step 6: Update contracts.ts

Edit `frontends/src/config/contracts.ts`:

```typescript
// Hedera Testnet Contract Addresses
export const HederaTestnetContractAddresses = {
  PROPERTY_REGISTRY: '0.0.XXXXXX' as string,  // Your deployed contract ID
} as const;
```

## Step 7: Verify Deployment

1. Visit the Hashscan URL from deployment output
2. Check contract shows as "Active"
3. Verify contract code is visible

## Creating HTS Tokens (Optional)

For fractional ownership feature:

```bash
cd scripts
node createTokens.js
```

This creates:
- Property fractionalization token
- Ownership verification NFT

## Troubleshooting

### "Insufficient HBAR"
- Add HBAR to your account at https://portal.hedera.com
- Minimum 10 HBAR recommended for deployment

### "Bytecode file not found"
- Compile contract first
- Save bytecode as `contractBytecode.txt` in scripts folder

### "Invalid contract ID"
- Verify contract ID format: `0.0.XXXXXXXXX`
- Check you're using correct network (testnet vs mainnet)

## Mainnet Deployment

For mainnet deployment:

1. Change `HEDERA_NETWORK=mainnet` in `.env`
2. Update client in deploy script:
   ```javascript
   const client = Client.forMainnet();
   ```
3. Ensure sufficient mainnet HBAR
4. Follow same deployment steps

## Contract Verification

After deployment, verify on Hashscan:

1. Click "Verify Contract" on Hashscan
2. Upload contract source code
3. Enter compiler version and settings
4. Submit verification

## Next Steps

- Update `frontends/src/config/contracts.ts` with deployed contract ID
- Update `frontends/.env.local` with contract configuration
- Test contract interactions in frontend
- Create HTS tokens for fractional ownership

