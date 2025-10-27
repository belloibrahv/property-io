# 🚀 AFRIKA PROPERTY GUARDIAN - SETUP GUIDE

This guide will walk you through setting up the entire Afrika Property Guardian platform from scratch.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Get Hedera Testnet Account](#get-hedera-testnet-account)
3. [Deploy Smart Contract](#deploy-smart-contract)
4. [Create HTS Tokens](#create-hts-tokens)
5. [Setup Frontend](#setup-frontend)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org)
- **Git** - [Download](https://git-scm.com)
- **MetaMask** browser extension - [Install](https://metamask.io)
- Code editor (VS Code recommended)

### Check Installation
\`\`\`bash
node --version  # Should be v18+
npm --version   # Should be v8+
git --version
\`\`\`

---

## 2. Get Hedera Testnet Account

### Option A: Create via Hedera Portal (Recommended)

1. **Visit Hedera Portal**
   - Go to [https://portal.hedera.com](https://portal.hedera.com)
   - Click "Create Account"

2. **Sign Up**
   - Use your email or Google account
   - Verify your email

3. **Get Testnet Account**
   - Navigate to "Testnet"
   - Click "Create Testnet Account"
   - **IMPORTANT**: Save your Account ID and Private Key
   - Example Account ID: \`0.0.1234567\`
   - Example Private Key: \`302e020100300506032b657004220420...\`

4. **Fund Your Account**
   - Use the testnet faucet to get free HBAR
   - You'll receive ~10,000 testnet HBAR

### Option B: Use Existing Account

If you already have a Hedera testnet account:
- Locate your Account ID (format: 0.0.XXXXXX)
- Locate your ECDSA Private Key

---

## 3. Deploy Smart Contract

### Step 3.1: Clone and Setup

\`\`\`bash
# Clone repository
git clone https://github.com/yourusername/afrika-property-guardian.git
cd afrika-property-guardian

# Setup scripts folder
cd scripts
npm install
\`\`\`

### Step 3.2: Configure Environment

\`\`\`bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials
nano .env  # or use your favorite editor
\`\`\`

Add your Hedera credentials:
\`\`\`env
HEDERA_OPERATOR_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_OPERATOR_KEY=YOUR_PRIVATE_KEY_HERE
HEDERA_NETWORK=testnet
\`\`\`

### Step 3.3: Compile Contract

1. **Open Remix IDE**
   - Go to [https://remix.ethereum.org](https://remix.ethereum.org)

2. **Create New File**
   - Click "+" icon in file explorer
   - Name it \`PropertyGuardian.sol\`

3. **Copy Contract Code**
   - Open \`Smart-contract/PropertyGuardian.sol\` from the project
   - Copy all the code
   - Paste into Remix

4. **Compile**
   - Click on "Solidity Compiler" tab (left sidebar)
   - Select compiler version: **0.8.19**
   - Click "Compile PropertyGuardian.sol"
   - Wait for green checkmark

5. **Get Bytecode**
   - Click "Compilation Details" button
   - Scroll to "BYTECODE" section
   - Click copy icon
   - Save to \`scripts/contractBytecode.txt\`

   **Important**: The bytecode should start with \`0x608060...\`

### Step 3.4: Deploy to Hedera

\`\`\`bash
# Make sure you're in scripts folder
cd scripts

# Deploy contract
npm run deploy
\`\`\`

**Expected Output:**
\`\`\`
🚀 Starting Afrika Property Guardian contract deployment...
📤 Uploading contract to Hedera...
✅ Contract uploaded to file: 0.0.XXXXXX
🏗️ Deploying contract...
🎉 CONTRACT DEPLOYED SUCCESSFULLY!
📍 Contract ID: 0.0.XXXXXX
🔗 View on Hashscan: https://hashscan.io/testnet/contract/0.0.XXXXXX
📝 Updating .env.local...
✅ Environment updated!
\`\`\`

**Save your Contract ID!** You'll need it later.

---

## 4. Create HTS Tokens

### Step 4.1: Create PropertyToken and NFT

\`\`\`bash
# Still in scripts folder
npm run create-tokens
\`\`\`

**Expected Output:**
\`\`\`
🏠 Starting Afrika Property Guardian token creation...
💰 Creating PropertyToken...
✅ PropertyToken created: 0.0.XXXXXX
🔗 View on Hashscan: https://hashscan.io/testnet/token/0.0.XXXXXX
🏆 Creating Verification NFT token...
✅ Verification NFT created: 0.0.XXXXXX
📝 Updating .env.local with token IDs...
✅ Environment updated!
🎉 ALL TOKENS CREATED SUCCESSFULLY!
\`\`\`

### Step 4.2: Create HCS Topic

\`\`\`bash
npm run create-topic
\`\`\`

**Expected Output:**
\`\`\`
📨 Creating HCS topic for property events...
✅ HCS Topic created: 0.0.XXXXXX
✅ Test message sent!
🎉 HCS TOPIC CREATED SUCCESSFULLY!
🎯 Your platform now has full transparency!
\`\`\`

---

## 5. Setup Frontend

### Step 5.1: Install Dependencies

\`\`\`bash
# Navigate to frontend folder
cd ../frontend
npm install
\`\`\`

### Step 5.2: Configure Environment

The deployment scripts should have auto-created \`.env.local\`. Verify it:

\`\`\`bash
cat .env.local
\`\`\`

Should contain:
\`\`\`env
NEXT_PUBLIC_CONTRACT_ADDRESS=0.0.XXXXXX
NEXT_PUBLIC_HEDERA_NETWORK=testnet
NEXT_PUBLIC_HEDERA_OPERATOR_ID=0.0.YOUR_ACCOUNT_ID
NEXT_PUBLIC_HEDERA_OPERATOR_KEY=YOUR_PRIVATE_KEY
NEXT_PUBLIC_PROPERTY_TOKEN_ID=0.0.XXXXXX
NEXT_PUBLIC_VERIFICATION_NFT_ID=0.0.XXXXXX
NEXT_PUBLIC_PROPERTY_EVENTS_TOPIC=0.0.XXXXXX
\`\`\`

If missing, copy from example:
\`\`\`bash
cp .env.local.example .env.local
# Edit with your values
\`\`\`

### Step 5.3: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

**Expected Output:**
\`\`\`
   ▲ Next.js 15.5.4
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.3s
\`\`\`

### Step 5.4: Open Browser

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the Afrika Property Guardian homepage
3. Click "Connect Wallet" to connect MetaMask

---

## 6. Testing

### Test 1: Connect Wallet

1. Click "Connect Wallet" button
2. MetaMask should popup
3. Select your account
4. Click "Connect"
5. You should see your address in the header

### Test 2: List a Property

1. Navigate to "List Property" tab
2. Fill in the form:
   - **Title**: "Modern 2-Bedroom Apartment"
   - **Location**: "Lagos, Nigeria"
   - **Property Type**: Apartment
   - **Price**: 50000
   - **Size**: 85
   - **Bedrooms**: 2
   - **Bathrooms**: 2
   - **Description**: "Beautiful modern apartment..."
3. Click "List Property on Blockchain"
4. Wait for transaction confirmation
5. Check Hashscan to verify

### Test 3: Search Properties

1. Navigate to "Search Properties" tab
2. Try different filters
3. View property cards
4. Click "View Details"

### Test 4: View on Hashscan

Visit your contract on Hashscan:
\`\`\`
https://hashscan.io/testnet/contract/YOUR_CONTRACT_ID
\`\`\`

You should see:
- Contract creation transaction
- Any property listing transactions
- Contract bytecode

---

## 7. Troubleshooting

### Common Issues

#### Issue: "HEDERA_OPERATOR_ID is not defined"

**Solution:**
\`\`\`bash
# Make sure .env file exists in scripts folder
cd scripts
ls -la .env

# If missing, create it
cp .env.example .env
# Add your credentials
\`\`\`

#### Issue: "contractBytecode.txt not found"

**Solution:**
1. Make sure you compiled the contract in Remix
2. Copy the bytecode (starts with \`0x608060...\`)
3. Save to \`scripts/contractBytecode.txt\`
4. Run deployment again

#### Issue: "INSUFFICIENT_ACCOUNT_BALANCE"

**Solution:**
- Your Hedera account needs HBAR for gas fees
- Visit testnet faucet: [https://portal.hedera.com](https://portal.hedera.com)
- Request testnet HBAR

#### Issue: "Failed to connect wallet"

**Solution:**
1. Make sure MetaMask is installed
2. Make sure you're on the correct network
3. Try refreshing the page
4. Check browser console for errors

#### Issue: Frontend won't start

**Solution:**
\`\`\`bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next

# Try again
npm run dev
\`\`\`

### Getting Help

If you're still stuck:

1. **Check Logs**
   - Frontend: Browser console (F12)
   - Backend: Terminal output

2. **Verify Environment**
   - All IDs in \`.env.local\` are correct
   - Private key is valid
   - Account has HBAR balance

3. **Check Hashscan**
   - View your account transactions
   - Verify contract deployment
   - Check token creation

4. **Contact Support**
   - GitHub Issues
   - Discord community
   - Twitter: @AfrikaProperty

---

## 🎉 Success!

If you've made it here, you should have:
- ✅ Deployed smart contract on Hedera
- ✅ Created HTS tokens
- ✅ Running frontend application
- ✅ Successfully listed a property

**Next Steps:**
- Explore the platform features
- List more properties
- Test fractional ownership
- Share with friends!

---

**Need more help?** Check out:
- [Main README](README.md)
- [Hedera Documentation](https://docs.hedera.com)
- [Next.js Documentation](https://nextjs.org/docs)
