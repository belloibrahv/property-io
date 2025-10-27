const express = require('express');
const router = express.Router();
const AIController = require('../controllers/aiController');
const { authMiddleware } = require('../middleware/auth');
const { singleUpload } = require('../middleware/upload');

// AI analysis routes
router.post('/analyze-image', singleUpload, AIController.analyzeImage);
router.post('/detect-fraud', AIController.detectFraud);
router.post('/predict-price', AIController.predictPrice);

// AI insights and recommendations
router.get('/market-insights', AIController.getMarketInsights);
router.post('/recommendations', authMiddleware, AIController.getRecommendations);

// AI-powered search
router.post('/smart-search', AIController.smartSearch);

module.exports = router;
