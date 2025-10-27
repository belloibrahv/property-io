const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.userType = data.userType; // 'buyer' | 'seller' | 'agent'
    this.isVerified = data.isVerified || false;
    this.isActive = data.isActive !== false;
    this.hederaAccountId = data.hederaAccountId;
    this.refreshToken = data.refreshToken;
    this.lastLogin = data.lastLogin;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Hash password before saving
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  // Verify password
  async verifyPassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Generate JWT access token
  generateAccessToken() {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        userType: this.userType,
        isVerified: this.isVerified
      },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
      { expiresIn: process.env.JWT_EXPIRE || '15m' }
    );
  }

  // Generate refresh token
  generateRefreshToken() {
    const refreshToken = crypto.randomBytes(40).toString('hex');
    this.refreshToken = refreshToken;
    return refreshToken;
  }

  // Get user data without sensitive information
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      userType: this.userType,
      isVerified: this.isVerified,
      isActive: this.isActive,
      hederaAccountId: this.hederaAccountId,
      lastLogin: this.lastLogin,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Static method to create user
  static async create(userData) {
    const user = new User(userData);
    await user.hashPassword();
    return user;
  }

  // Static method to find user by email
  static findByEmail(email) {
    // In a real app, this would query the database
    // For MVP, we'll use mock data
    const mockUsers = [
      {
        id: 1,
        email: 'buyer@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8Kz8Kz8K', // 'password123'
        firstName: 'John',
        lastName: 'Doe',
        phone: '+234-123-456-7890',
        userType: 'buyer',
        isVerified: true,
        isActive: true,
        hederaAccountId: '0.0.123456',
        createdAt: '2023-01-01T00:00:00Z'
      },
      {
        id: 2,
        email: 'seller@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8Kz8Kz8K', // 'password123'
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+234-987-654-3210',
        userType: 'seller',
        isVerified: true,
        isActive: true,
        hederaAccountId: '0.0.789012',
        createdAt: '2023-01-02T00:00:00Z'
      }
    ];

    return mockUsers.find(user => user.email === email);
  }

  // Static method to find user by ID
  static findById(id) {
    const mockUsers = [
      {
        id: 1,
        email: 'buyer@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8Kz8Kz8K',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+234-123-456-7890',
        userType: 'buyer',
        isVerified: true,
        isActive: true,
        hederaAccountId: '0.0.123456',
        createdAt: '2023-01-01T00:00:00Z'
      },
      {
        id: 2,
        email: 'seller@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8Kz8Kz8K',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+234-987-654-3210',
        userType: 'seller',
        isVerified: true,
        isActive: true,
        hederaAccountId: '0.0.789012',
        createdAt: '2023-01-02T00:00:00Z'
      }
    ];

    return mockUsers.find(user => user.id === parseInt(id));
  }
}

module.exports = User;
