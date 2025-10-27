const bcrypt = require('bcryptjs');
const { pool } = require('../config/mockDatabase');

class UserService {
  constructor() {
    // Database connection is handled by the pool
  }

  // Get user by ID
  async getUserById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        'SELECT id, email, first_name, last_name, phone, user_type, avatar_url, is_verified, is_active, created_at, last_login FROM users WHERE id = $1',
        [id]
      );
      client.release();
      
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      
      const user = result.rows[0];
      return {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        userType: user.user_type,
        avatarUrl: user.avatar_url,
        isVerified: user.is_verified,
        isActive: user.is_active,
        createdAt: user.created_at,
        lastLogin: user.last_login
      };
    } catch (error) {
      console.error('❌ Failed to get user:', error.message);
      throw new Error('Failed to get user');
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        'SELECT id, email, password, first_name, last_name, phone, user_type, avatar_url, is_verified, is_active, created_at, last_login FROM users WHERE email = $1',
        [email]
      );
      client.release();
      
      if (result.rows.length === 0) {
        return null;
      }
      
      const user = result.rows[0];
      return {
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        userType: user.user_type,
        avatarUrl: user.avatar_url,
        isVerified: user.is_verified,
        isActive: user.is_active,
        createdAt: user.created_at,
        lastLogin: user.last_login
      };
    } catch (error) {
      console.error('❌ Failed to get user by email:', error.message);
      throw new Error('Failed to get user by email');
    }
  }

  // Create new user
  async createUser(userData) {
    try {
      const { email, password, firstName, lastName, phone, userType } = userData;
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const client = await pool.connect();
      const result = await client.query(
        `INSERT INTO users (email, password, first_name, last_name, phone, user_type) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING id, email, first_name, last_name, phone, user_type, is_verified, is_active, created_at`,
        [email, hashedPassword, firstName, lastName, phone, userType]
      );
      client.release();
      
      const user = result.rows[0];
      console.log('✅ User created:', user.id);
      
      return {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        userType: user.user_type,
        isVerified: user.is_verified,
        isActive: user.is_active,
        createdAt: user.created_at
      };
    } catch (error) {
      console.error('❌ Failed to create user:', error.message);
      throw new Error('Failed to create user');
    }
  }

  // Update user
  async updateUser(id, updateData) {
    try {
      const userIndex = this.users.findIndex(u => u.id === parseInt(id));
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateData,
        updatedAt: new Date()
      };

      console.log('✅ User updated:', id);
      return this.users[userIndex];
    } catch (error) {
      console.error('❌ Failed to update user:', error.message);
      throw new Error('Failed to update user');
    }
  }

  // Delete user
  async deleteUser(id) {
    try {
      const userIndex = this.users.findIndex(u => u.id === parseInt(id));
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      this.users.splice(userIndex, 1);
      console.log('✅ User deleted:', id);
      return true;
    } catch (error) {
      console.error('❌ Failed to delete user:', error.message);
      throw new Error('Failed to delete user');
    }
  }

  // Get user's properties
  async getUserProperties(userId) {
    try {
      const PropertyService = require('./propertyService');
      const allProperties = await PropertyService.getAllProperties({ page: 1, limit: 100 });
      return allProperties.properties.filter(p => p.ownerId === parseInt(userId));
    } catch (error) {
      console.error('❌ Failed to get user properties:', error.message);
      throw new Error('Failed to get user properties');
    }
  }

  // Get favorite properties
  async getFavoriteProperties(userId) {
    try {
      const PropertyService = require('./propertyService');
      const userFavorites = this.favorites.filter(f => f.userId === parseInt(userId));
      const favoriteProperties = [];

      for (const favorite of userFavorites) {
        const property = await PropertyService.getPropertyById(favorite.propertyId);
        if (property) {
          favoriteProperties.push(property);
        }
      }

      return favoriteProperties;
    } catch (error) {
      console.error('❌ Failed to get favorite properties:', error.message);
      throw new Error('Failed to get favorite properties');
    }
  }

  // Add property to favorites
  async addToFavorites(userId, propertyId) {
    try {
      const existingFavorite = this.favorites.find(f => 
        f.userId === parseInt(userId) && f.propertyId === parseInt(propertyId)
      );

      if (existingFavorite) {
        throw new Error('Property already in favorites');
      }

      this.favorites.push({
        userId: parseInt(userId),
        propertyId: parseInt(propertyId),
        createdAt: new Date()
      });

      console.log('✅ Property added to favorites:', propertyId);
      return true;
    } catch (error) {
      console.error('❌ Failed to add to favorites:', error.message);
      throw new Error('Failed to add to favorites');
    }
  }

  // Remove property from favorites
  async removeFromFavorites(userId, propertyId) {
    try {
      const favoriteIndex = this.favorites.findIndex(f => 
        f.userId === parseInt(userId) && f.propertyId === parseInt(propertyId)
      );

      if (favoriteIndex === -1) {
        throw new Error('Property not in favorites');
      }

      this.favorites.splice(favoriteIndex, 1);
      console.log('✅ Property removed from favorites:', propertyId);
      return true;
    } catch (error) {
      console.error('❌ Failed to remove from favorites:', error.message);
      throw new Error('Failed to remove from favorites');
    }
  }

  // Get user profile with statistics
  async getUserProfile(userId) {
    try {
      const user = await this.getUserById(userId);
      const userProperties = await this.getUserProperties(userId);
      const favoriteProperties = await this.getFavoriteProperties(userId);

      return {
        ...user,
        statistics: {
          totalProperties: userProperties.length,
          totalFavorites: favoriteProperties.length,
          memberSince: user.createdAt
        }
      };
    } catch (error) {
      console.error('❌ Failed to get user profile:', error.message);
      throw new Error('Failed to get user profile');
    }
  }

  // Search users
  async searchUsers(query, filters = {}) {
    try {
      let results = [...this.users];

      // Text search
      if (query) {
        const searchTerms = query.toLowerCase().split(' ');
        results = results.filter(user => {
          const searchableText = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
          return searchTerms.some(term => searchableText.includes(term));
        });
      }

      // Apply filters
      if (filters.userType) {
        results = results.filter(user => user.userType === filters.userType);
      }

      if (filters.isActive !== undefined) {
        results = results.filter(user => user.isActive === filters.isActive);
      }

      return results;
    } catch (error) {
      console.error('❌ Failed to search users:', error.message);
      throw new Error('Failed to search users');
    }
  }

  // Get user activity
  async getUserActivity(userId, limit = 10) {
    try {
      // Mock activity data for MVP
      const activities = [
        {
          id: 1,
          type: 'property_viewed',
          description: 'Viewed property: Beautiful 2-bedroom apartment',
          timestamp: new Date('2024-01-20T10:30:00Z')
        },
        {
          id: 2,
          type: 'property_favorited',
          description: 'Added property to favorites: Spacious 3-bedroom house',
          timestamp: new Date('2024-01-19T15:45:00Z')
        },
        {
          id: 3,
          type: 'search_performed',
          description: 'Searched for: 2-bedroom apartments in Lagos',
          timestamp: new Date('2024-01-18T09:15:00Z')
        }
      ];

      return activities.slice(0, limit);
    } catch (error) {
      console.error('❌ Failed to get user activity:', error.message);
      throw new Error('Failed to get user activity');
    }
  }

  // Update user preferences
  async updateUserPreferences(userId, preferences) {
    try {
      const user = await this.getUserById(userId);
      const updatedUser = await this.updateUser(userId, {
        preferences: {
          ...user.preferences,
          ...preferences
        }
      });

      return updatedUser;
    } catch (error) {
      console.error('❌ Failed to update user preferences:', error.message);
      throw new Error('Failed to update user preferences');
    }
  }

  // Get user recommendations
  async getUserRecommendations(userId) {
    try {
      const user = await this.getUserById(userId);
      const userProperties = await this.getUserProperties(userId);
      const favoriteProperties = await this.getFavoriteProperties(userId);

      // Simple recommendation logic for MVP
      const recommendations = [
        'Consider listing more properties to increase visibility',
        'Update your property photos for better appeal',
        'Set competitive prices based on market trends',
        'Respond quickly to inquiries to improve conversion'
      ];

      if (userProperties.length === 0) {
        recommendations.unshift('Start by listing your first property');
      }

      if (favoriteProperties.length === 0) {
        recommendations.push('Browse and favorite properties you like');
      }

      return recommendations;
    } catch (error) {
      console.error('❌ Failed to get user recommendations:', error.message);
      throw new Error('Failed to get user recommendations');
    }
  }
}

module.exports = new UserService();

