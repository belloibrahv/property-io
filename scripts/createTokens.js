const {
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  Hbar,
  PrivateKey
} = require("@hashgraph/sdk");
const fs = require("fs");

// Load environment variables
require('dotenv').config();

// Your account details from environment variables
const operatorId = process.env.HEDERA_OPERATOR_ID;
const operatorKey = PrivateKey.fromStringECDSA(process.env.HEDERA_OPERATOR_KEY);

async function createTokens() {
  console.log("🏠 Starting Afrika Property Guardian token creation...");

  // Create Hedera client
  const client = Client.forTestnet();
  client.setOperator(operatorId, operatorKey);

  try {
    // STEP 1: Create PropertyToken (For fractional ownership)
    console.log("💰 Creating PropertyToken...");

    const propertyTokenTx = new TokenCreateTransaction()
      .setTokenName("Afrika Property Token")
      .setTokenSymbol("APT")
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(2)
      .setInitialSupply(10000000) // 10 million tokens
      .setSupplyType(TokenSupplyType.Infinite)
      .setTreasuryAccountId(operatorId)
      .setAdminKey(operatorKey)
      .setSupplyKey(operatorKey)
      .setMaxTransactionFee(new Hbar(30));

    const propertyTokenSubmit = await propertyTokenTx.execute(client);
    const propertyTokenReceipt = await propertyTokenSubmit.getReceipt(client);
    const propertyTokenId = propertyTokenReceipt.tokenId;

    console.log(`✅ PropertyToken created: ${propertyTokenId}`);
    console.log(`🔗 View on Hashscan: https://hashscan.io/testnet/token/${propertyTokenId}`);

    // STEP 2: Create Verification NFT Token (For verified listings)
    console.log("🏆 Creating Verification NFT token...");

    const verificationNFTTx = new TokenCreateTransaction()
      .setTokenName("Afrika Property Verification")
      .setTokenSymbol("APV")
      .setTokenType(TokenType.NonFungibleUnique)
      .setSupplyType(TokenSupplyType.Infinite)
      .setTreasuryAccountId(operatorId)
      .setAdminKey(operatorKey)
      .setSupplyKey(operatorKey)
      .setMaxTransactionFee(new Hbar(30));

    const verificationNFTSubmit = await verificationNFTTx.execute(client);
    const verificationNFTReceipt = await verificationNFTSubmit.getReceipt(client);
    const verificationNFTId = verificationNFTReceipt.tokenId;

    console.log(`✅ Verification NFT created: ${verificationNFTId}`);
    console.log(`🔗 View on Hashscan: https://hashscan.io/testnet/token/${verificationNFTId}`);

    // STEP 3: Update environment file
    console.log("📝 Updating .env.local with token IDs...");

    const envPath = '../frontend/.env.local';
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace('NEXT_PUBLIC_PROPERTY_TOKEN_ID=0.0.TOKEN_ID', `NEXT_PUBLIC_PROPERTY_TOKEN_ID=${propertyTokenId}`);

    // Add verification NFT ID
    if (!envContent.includes('NEXT_PUBLIC_VERIFICATION_NFT_ID')) {
      envContent += `\nNEXT_PUBLIC_VERIFICATION_NFT_ID=${verificationNFTId}`;
    } else {
      envContent = envContent.replace('NEXT_PUBLIC_VERIFICATION_NFT_ID=0.0.NFT_TOKEN_ID', `NEXT_PUBLIC_VERIFICATION_NFT_ID=${verificationNFTId}`);
    }

    fs.writeFileSync(envPath, envContent);

    console.log("✅ Environment updated!");
    console.log("");
    console.log("🎉 ALL TOKENS CREATED SUCCESSFULLY!");
    console.log("📋 Summary:");
    console.log(`   💰 PropertyToken: ${propertyTokenId}`);
    console.log(`   🏆 Verification NFT: ${verificationNFTId}`);
    console.log("");
    console.log("🎯 Next step: Create HCS topic using createHCSTopic.js");

  } catch (error) {
    console.error("❌ Token creation failed:", error);
  }

  client.close();
}

// Run token creation
createTokens();
