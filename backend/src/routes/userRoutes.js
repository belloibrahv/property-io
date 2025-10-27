const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, requireRole, requireVerification } = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);
router.get('/verify-email/:token', userController.verifyEmail);

// Protected routes (require authentication)
router.use(authMiddleware);

// User profile routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.delete('/account', userController.deleteAccount);
router.post('/logout', userController.logout);

// Role-based routes
router.get('/seller-only', requireRole(['seller', 'agent']), (req, res) => {
  res.json({ success: true, message: 'Seller/Agent access granted' });
});

router.get('/verified-only', requireVerification, (req, res) => {
  res.json({ success: true, message: 'Verified user access granted' });
});

module.exports = router;