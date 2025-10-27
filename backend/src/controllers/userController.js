const User = require('../models/User');
const { authMiddleware, requireRole, requireVerification } = require('../middleware/auth');

const userController = {
  // Register new user
  async register(req, res) {
    try {
      const { email, password, firstName, lastName, phone, userType } = req.body;

      // Validate input
      const errors = [];
      if (!email) errors.push('Email is required');
      if (!password) errors.push('Password is required');
      if (!firstName) errors.push('First name is required');
      if (!lastName) errors.push('Last name is required');
      if (!phone) errors.push('Phone number is required');
      if (!userType) errors.push('User type is required');

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        errors.push('Invalid email format');
      }

      // Password validation
      if (password && password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }

      // User type validation
      const validUserTypes = ['buyer', 'seller', 'agent'];
      if (userType && !validUserTypes.includes(userType)) {
        errors.push('Invalid user type');
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors
        });
      }

      // Check if user already exists
      const existingUser = User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Create new user
      const userData = {
        id: Math.floor(Math.random() * 10000) + 1000, // Generate unique ID
        email,
        password,
        firstName,
        lastName,
        phone,
        userType,
        isVerified: false,
        isActive: true,
        hederaAccountId: null, // Will be generated later
        createdAt: new Date().toISOString()
      };

      const user = await User.create(userData);

      // Generate tokens
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: user.toJSON(),
          token: accessToken,
          refreshToken
        }
      });

    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to register user',
        error: error.message
      });
    }
  },

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Find user by email
      const userData = User.findByEmail(email);
      if (!userData) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const user = new User(userData);

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        });
      }

      // Verify password
      const isPasswordValid = await user.verifyPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Update last login
      user.lastLogin = new Date().toISOString();

      // Generate tokens
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: user.toJSON(),
          token: accessToken,
          refreshToken
        }
      });

    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to login',
        error: error.message
      });
    }
  },

  // Refresh access token
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token is required'
        });
      }

      // In a real app, you would validate the refresh token against the database
      // For MVP, we'll generate a new access token
      const userData = User.findById(1); // Mock user
      const user = new User(userData);
      
      const accessToken = user.generateAccessToken();

      res.json({
        success: true,
        data: {
          token: accessToken
        }
      });

    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to refresh token',
        error: error.message
      });
    }
  },

  // Get user profile
  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const userData = User.findById(userId);

      if (!userData) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const user = new User(userData);

      res.json({
        success: true,
        data: user.toJSON()
      });

    } catch (error) {
      console.error('Error getting profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get profile',
        error: error.message
      });
    }
  },

  // Update user profile
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { firstName, lastName, phone, userType } = req.body;

      const userData = User.findById(userId);
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const user = new User(userData);

      // Update fields if provided
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (phone) user.phone = phone;
      if (userType) user.userType = userType;

      user.updatedAt = new Date().toISOString();

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: user.toJSON()
      });

    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update profile',
        error: error.message
      });
    }
  },

  // Logout user
  async logout(req, res) {
    try {
      // In a real implementation, you would invalidate the refresh token
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to logout',
        error: error.message
      });
    }
  },

  // Delete user account
  async deleteAccount(req, res) {
    try {
      const userId = req.user.id;

      // In a real implementation, you would soft delete the user
      res.json({
        success: true,
        message: 'Account deleted successfully'
      });

    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete account',
        error: error.message
      });
    }
  },

  // Verify email (placeholder for future implementation)
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;

      // In a real implementation, you would verify the email token
      res.json({
        success: true,
        message: 'Email verified successfully'
      });

    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to verify email',
        error: error.message
      });
    }
  }
};

module.exports = userController;