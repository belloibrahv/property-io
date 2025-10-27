const express = require('express');
const router = express.Router();
const hederaService = require('../services/hederaService');
const { authMiddleware, requireRole, requireVerification } = require('../middleware/auth');
const { catchAsync } = require('../utils/logger');

// Hedera API routes
const hederaController = {
  // Health check
  healthCheck: catchAsync(async (req, res) => {
    const health = await hederaService.healthCheck();
    res.json(health);
  }),

  // Register property on Hedera
  registerProperty: catchAsync(async (req, res) => {
    const propertyData = req.body;
    const result = await hederaService.registerProperty(propertyData);
    
    res.json({
      success: true,
      data: result
    });
  }),

  // Verify property on Hedera
  verifyProperty: catchAsync(async (req, res) => {
    const { propertyId } = req.params;
    const verificationData = req.body;
    
    const result = await hederaService.verifyProperty(parseInt(propertyId), verificationData);
    
    res.json({
      success: true,
      data: result
    });
  }),

  // Tokenize property on Hedera
  tokenizeProperty: catchAsync(async (req, res) => {
    const { propertyId } = req.params;
    const tokenizationData = req.body;
    
    const result = await hederaService.tokenizeProperty(parseInt(propertyId), tokenizationData);
    
    res.json({
      success: true,
      data: result
    });
  }),

  // Transfer ownership on Hedera
  transferOwnership: catchAsync(async (req, res) => {
    const { propertyId } = req.params;
    const { newOwnerId } = req.body;
    
    const result = await hederaService.transferOwnership(parseInt(propertyId), newOwnerId);
    
    res.json({
      success: true,
      data: result
    });
  }),

  // Get property data from Hedera
  getPropertyData: catchAsync(async (req, res) => {
    const { propertyId } = req.params;
    
    const result = await hederaService.getPropertyData(parseInt(propertyId));
    
    res.json({
      success: true,
      data: result
    });
  }),

  // Get contract statistics
  getContractStats: catchAsync(async (req, res) => {
    const result = await hederaService.getContractStats();
    
    res.json({
      success: true,
      data: result
    });
  }),

  // Create Hedera account
  createAccount: catchAsync(async (req, res) => {
    const userData = req.body;
    
    const result = await hederaService.createHederaAccount(userData);
    
    res.json({
      success: true,
      data: result
    });
  }),

  // Get account balance
  getAccountBalance: catchAsync(async (req, res) => {
    const { accountId } = req.params;
    
    const result = await hederaService.getAccountBalance(accountId);
    
    res.json({
      success: true,
      data: result
    });
  })
};

// Public routes
router.get('/health', hederaController.healthCheck);
router.get('/stats', hederaController.getContractStats);

// Protected routes (require authentication)
router.use(authMiddleware);

// Property operations
router.post('/register-property', hederaController.registerProperty);
router.post('/verify-property/:propertyId', hederaController.verifyProperty);
router.post('/tokenize-property/:propertyId', hederaController.tokenizeProperty);
router.post('/transfer-ownership/:propertyId', hederaController.transferOwnership);
router.get('/property/:propertyId', hederaController.getPropertyData);

// Account operations
router.post('/create-account', hederaController.createAccount);
router.get('/account/:accountId/balance', hederaController.getAccountBalance);

module.exports = router;
