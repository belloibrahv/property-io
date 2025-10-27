const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/propertyController');
const { authMiddleware } = require('../middleware/auth');
const { multipleUpload } = require('../middleware/upload');

// Property routes
router.get('/', PropertyController.getProperties);
router.get('/:id', PropertyController.getPropertyById);
router.post('/', authMiddleware, multipleUpload, PropertyController.createProperty);
router.put('/:id', authMiddleware, PropertyController.updateProperty);
router.delete('/:id', authMiddleware, PropertyController.deleteProperty);

// AI-powered features
router.get('/recommendations/user', authMiddleware, PropertyController.getRecommendations);

module.exports = router;
