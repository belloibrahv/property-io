# Environment Configuration Guide

This document explains all environment variables needed for the Afrika Property Guardian project.

## Quick Setup

1. Copy the example file:
```bash
cd frontends
cp env.example .env.local
```

2. Fill in your actual values in `.env.local`

## Environment Variables

### Required Variables

#### Hedera Network Configuration

```env
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```
- **Required**: Yes
- **Values**: `testnet` or `mainnet`
- **Purpose**: Determines which Hedera network to connect to
- **Default**: `testnet`

#### Smart Contract Configuration

```env
NEXT_PUBLIC_CONTRACT_ID=0.0.XXXXXX
```
- **Required**: Yes (after deploying contract)
- **Format**: Hedera contract ID (e.g., `0.0.1234567`)
- **Purpose**: The PropertyRegistry smart contract address
- **How to get**: Deploy PropertyRegistry.sol and use the returned contract ID

#### Operator Account (for signing transactions)

```env
NEXT_PUBLIC_OPERATOR_ID=0.0.XXXXXX
NEXT_PUBLIC_OPERATOR_KEY=YOUR_PRIVATE_KEY
```
- **Required**: Yes
- **Purpose**: Hedera account for signing contract interactions
- **How to get**: 
  - Create account at https://portal.hedera.com (testnet) or use HashConnect
  - Export your private key

#### Token Configuration (Optional - for fractional ownership)

```env
NEXT_PUBLIC_TOKEN_ID=0.0.XXXXXX
```
- **Required**: No (only if implementing fractional ownership)
- **Purpose**: HTS token ID for fractional property shares
- **How to get**: Create HTS token for a property

### WalletConnect AppKit Configuration

```env
NEXT_PUBLIC_PROJECT_ID=a9fbadc760baa309220363ec867b732e
NEXT_PUBLIC_ENVIRONMENT=testnet
```
- **Required**: Yes (already configured with Billoq project ID)
- **Purpose**: Enables wallet connection via WalletConnect
- **Note**: This is already set up and working

### Mirror Node Configuration

The Mirror Node URL is automatically set based on `NEXT_PUBLIC_HEDERA_NETWORK`:

- **Testnet**: `https://testnet.mirrornode.hedera.com`
- **Mainnet**: `https://mainnet-public.mirrornode.hedera.com`

No manual configuration needed!

## Getting Your Hedera Account

### Option 1: Hedera Portal (Recommended for Development)

1. Visit https://portal.hedera.com
2. Select "Testnet" or "Mainnet"
3. Create a new account or import existing
4. Copy your Account ID and Private Key

### Option 2: HashConnect (For Integration Testing)

1. Install HashPack wallet extension
2. Create or import wallet
3. Copy account details from wallet

### Option 3: Hedera SDK (Programmatic)

```javascript
const { Client, PrivateKey, AccountCreateTransaction, Hbar } = require("@hashgraph/sdk");

async function createAccount() {
  const operatorId = "0.0.XXXXXX"; // Your existing account ID
  const operatorKey = "YOUR_PRIVATE_KEY";
  
  const client = Client.forTestnet().setOperator(operatorId, operatorKey);
  
  const newKey = PrivateKey.generate();
  const newPublicKey = newKey.publicKey;
  
  const transaction = new AccountCreateTransaction()
    .setKey(newPublicKey)
    .setInitialBalance(Hbar.from(100));
    
  const response = await transaction.execute(client);
  const receipt = await response.getReceipt(client);
  const newAccountId = receipt.accountId;
  
  console.log("New Account ID:", newAccountId.toString());
  console.log("Private Key:", newKey.toString());
  
  return { accountId: newAccountId, privateKey: newKey };
}
```

## Deploying the Smart Contract

1. Compile the contract:
```bash
cd Smart-contract
# Use your preferred Solidity compiler
```

2. Deploy to Hedera:
```javascript
const { Client, ContractCreateTransaction, ContractFunctionParameters } = require("@hashgraph/sdk");

async function deployContract(bytecode) {
  const client = Client.forTestnet()
    .setOperator(process.env.NEXT_PUBLIC_OPERATOR_ID, process.env.NEXT_PUBLIC_OPERATOR_KEY);
  
  const transaction = new ContractCreateTransaction()
    .setBytecode(bytecode)
    .setGas(100000);
    
  const response = await transaction.execute(client);
  const receipt = await response.getReceipt(client);
  const contractId = receipt.contractId;
  
  console.log("Contract deployed:", contractId.toString());
  return contractId.toString();
}
```

3. Update `.env.local` with the contract ID

## Security Notes

### Private Keys
- **NEVER** commit `.env.local` to version control
- `.env.local` is already in `.gitignore`
- Keep your private keys secure
- Use testnet accounts for development

### Production Deployment
- Use environment variables in your hosting platform (Vercel, Netlify, etc.)
- Use Hedera mainnet accounts for production
- Set up proper key management
- Consider using wallet connection instead of operator keys for production

## Verification

After setting up your environment:

1. Check variables are loaded:
```bash
cd frontends
npm run dev
```

2. Open browser console and check:
```javascript
console.log(process.env.NEXT_PUBLIC_HEDERA_NETWORK); // Should show 'testnet' or 'mainnet'
```

3. Test Mirror Node connection:
- The app will automatically query Hedera Mirror Node
- Check network tab in browser dev tools for API calls

## Troubleshooting

### "Contract ID not configured"
- Make sure `NEXT_PUBLIC_CONTRACT_ID` is set in `.env.local`
- Restart dev server after changing environment variables

### "Mirror Node connection failed"
- Check your internet connection
- Verify Mirror Node URLs are accessible
- Check browser console for specific errors

### "Transaction signing failed"
- Verify `NEXT_PUBLIC_OPERATOR_KEY` is correct
- Ensure account has sufficient HBAR for fees
- Check account ID format is correct

### "Wallet connection not working"
- Verify `NEXT_PUBLIC_PROJECT_ID` is set
- Check AppKit context is properly configured
- Try clearing browser cache

## Example .env.local

```env
# Hedera Network Configuration
NEXT_PUBLIC_HEDERA_NETWORK=testnet

# Smart Contract
NEXT_PUBLIC_CONTRACT_ID=0.0.1234567

# Operator Account (replace with your actual values)
NEXT_PUBLIC_OPERATOR_ID=0.0.2345678
NEXT_PUBLIC_OPERATOR_KEY=302e020100300506032b657004220420abc123...your_private_key_here

# Token (optional)
NEXT_PUBLIC_TOKEN_ID=0.0.3456789

# AppKit Configuration (already configured)
NEXT_PUBLIC_PROJECT_ID=a9fbadc760baa309220363ec867b732e
NEXT_PUBLIC_ENVIRONMENT=testnet
```

## Support

For issues or questions:
- Check Hedera docs: https://docs.hedera.com
- Mirror Node API: https://docs.hedera.com/api/mirror-node-api
- WalletConnect AppKit: https://docs.walletconnect.com/appkit

