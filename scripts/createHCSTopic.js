const {
  Client,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  Hbar,
  PrivateKey
} = require("@hashgraph/sdk");
const fs = require("fs");

// Load environment variables
require('dotenv').config();

// Your account details from environment variables
const operatorId = process.env.HEDERA_OPERATOR_ID;
const operatorKey = PrivateKey.fromStringECDSA(process.env.HEDERA_OPERATOR_KEY);

async function createHCSTopic() {
  console.log("📨 Creating HCS topic for property events...");

  // Create Hedera client
  const client = Client.forTestnet();
  client.setOperator(operatorId, operatorKey);

  try {
    // STEP 1: Create HCS Topic for property listings
    console.log("📋 Creating property events topic...");

    const topicCreateTx = new TopicCreateTransaction()
      .setTopicMemo("Afrika Property Guardian - Property Listings & Transactions")
      .setAdminKey(operatorKey)
      .setSubmitKey(operatorKey)
      .setMaxTransactionFee(new Hbar(10));

    const topicCreateSubmit = await topicCreateTx.execute(client);
    const topicCreateReceipt = await topicCreateSubmit.getReceipt(client);
    const topicId = topicCreateReceipt.topicId;

    console.log(`✅ HCS Topic created: ${topicId}`);
    console.log(`🔗 View on Hashscan: https://hashscan.io/testnet/topic/${topicId}`);

    // STEP 2: Test by sending a message
    console.log("📤 Testing topic with sample message...");

    const testMessage = JSON.stringify({
      event: "platform_initialized",
      timestamp: new Date().toISOString(),
      message: "Afrika Property Guardian HCS topic is working!",
      platform: "Afrika Property Guardian",
      version: "1.0.0"
    });

    const messageSubmitTx = new TopicMessageSubmitTransaction()
      .setTopicId(topicId)
      .setMessage(testMessage)
      .setMaxTransactionFee(new Hbar(1));

    const messageSubmitSubmit = await messageSubmitTx.execute(client);
    const messageSubmitReceipt = await messageSubmitSubmit.getReceipt(client);

    console.log(`✅ Test message sent! Sequence number: ${messageSubmitReceipt.topicSequenceNumber}`);

    // STEP 3: Update environment file
    console.log("📝 Updating .env.local with topic ID...");

    const envPath = '../frontend/.env.local';
    let envContent = fs.readFileSync(envPath, 'utf8');

    if (!envContent.includes('NEXT_PUBLIC_PROPERTY_EVENTS_TOPIC')) {
      envContent += `\nNEXT_PUBLIC_PROPERTY_EVENTS_TOPIC=${topicId}`;
    } else {
      envContent = envContent.replace('NEXT_PUBLIC_PROPERTY_EVENTS_TOPIC=0.0.TOPIC_ID', `NEXT_PUBLIC_PROPERTY_EVENTS_TOPIC=${topicId}`);
    }

    fs.writeFileSync(envPath, envContent);

    console.log("✅ Environment updated!");
    console.log("");
    console.log("🎉 HCS TOPIC CREATED SUCCESSFULLY!");
    console.log("📋 What this enables:");
    console.log("   📨 Public property listing logging");
    console.log("   ⏰ Timestamped proof of transactions");
    console.log("   🛡️ Anti-fraud verification");
    console.log("   📊 Public transaction transparency");
    console.log("");
    console.log("🎯 Your platform now has full transparency!");
    console.log("🚀 Ready to start development: npm run dev");

  } catch (error) {
    console.error("❌ HCS topic creation failed:", error);
  }

  client.close();
}

// Run HCS topic creation
createHCSTopic();
