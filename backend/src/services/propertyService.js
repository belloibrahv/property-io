// Mock database for MVP - in production, use PostgreSQL
class PropertyService {
  constructor() {
    this.properties = [
      {
        id: 1,
        title: 'Beautiful 2-bedroom apartment in Victoria Island',
        description: 'Modern apartment with stunning ocean views, fully furnished, 24/7 security, gym, and pool access.',
        location: 'Victoria Island, Lagos',
        price: 150000,
        propertyType: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        size: 1200,
        amenities: ['pool', 'gym', 'security', 'parking'],
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        ownerId: 1,
        ownerName: 'John Doe',
        ownerPhone: '+234-123-456-7890',
        ownerEmail: 'john@example.com',
        isActive: true,
        createdAt: new Date('2024-01-15'),
        hederaTxId: '0.0.123456@1642204800',
        aiAnalysis: {
          fraudRisk: 0.1,
          priceAccuracy: 0.9,
          imageQuality: 0.8,
          recommendations: ['Great location', 'Competitive pricing']
        }
      },
      {
        id: 2,
        title: 'Spacious 3-bedroom house in Ikoyi',
        description: 'Family home with garden, modern kitchen, and spacious living areas. Perfect for families.',
        location: 'Ikoyi, Lagos',
        price: 250000,
        propertyType: 'house',
        bedrooms: 3,
        bathrooms: 3,
        size: 2000,
        amenities: ['garden', 'parking', 'security'],
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        ownerId: 2,
        ownerName: 'Jane Smith',
        ownerPhone: '+234-987-654-3210',
        ownerEmail: 'jane@example.com',
        isActive: true,
        createdAt: new Date('2024-01-20'),
        hederaTxId: '0.0.123457@1642291200',
        aiAnalysis: {
          fraudRisk: 0.05,
          priceAccuracy: 0.95,
          imageQuality: 0.9,
          recommendations: ['Excellent value', 'Great for families']
        }
      },
      {
        id: 3,
        title: 'Modern office space in Lekki',
        description: 'Prime commercial space with modern amenities, perfect for businesses.',
        location: 'Lekki, Lagos',
        price: 300000,
        propertyType: 'commercial',
        bedrooms: 0,
        bathrooms: 2,
        size: 1500,
        amenities: ['elevator', 'security', 'parking', 'conference room'],
        images: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        ownerId: 3,
        ownerName: 'Mike Johnson',
        ownerPhone: '+234-555-123-4567',
        ownerEmail: 'mike@example.com',
        isActive: true,
        createdAt: new Date('2024-01-25'),
        hederaTxId: '0.0.123458@1642377600',
        aiAnalysis: {
          fraudRisk: 0.08,
          priceAccuracy: 0.88,
          imageQuality: 0.85,
          recommendations: ['Prime location', 'Good for business']
        }
      }
    ];
  }

  // Get all properties with pagination and filtering
  async getAllProperties({ page = 1, limit = 10, filters = {} }) {
    try {
      let filteredProperties = [...this.properties];

      // Apply filters
      if (filters.location) {
        filteredProperties = filteredProperties.filter(p => 
          p.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.minPrice) {
        filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice);
      }

      if (filters.maxPrice) {
        filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice);
      }

      if (filters.propertyType) {
        filteredProperties = filteredProperties.filter(p => 
          p.propertyType === filters.propertyType
        );
      }

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

      return {
        properties: paginatedProperties,
        total: filteredProperties.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProperties.length / limit)
      };
    } catch (error) {
      console.error('❌ Failed to get properties:', error.message);
      throw new Error('Failed to get properties');
    }
  }

  // Search properties with AI-powered matching
  async searchProperties({ query, location, filters = {} }) {
    try {
      let results = [...this.properties];

      // Text search
      if (query) {
        const searchTerms = query.toLowerCase().split(' ');
        results = results.filter(property => {
          const searchableText = `${property.title} ${property.description} ${property.location}`.toLowerCase();
          return searchTerms.some(term => searchableText.includes(term));
        });
      }

      // Location filter
      if (location) {
        results = results.filter(property => 
          property.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      // Apply additional filters
      if (filters.minPrice) {
        results = results.filter(property => property.price >= filters.minPrice);
      }

      if (filters.maxPrice) {
        results = results.filter(property => property.price <= filters.maxPrice);
      }

      if (filters.propertyType) {
        results = results.filter(property => property.propertyType === filters.propertyType);
      }

      if (filters.bedrooms) {
        results = results.filter(property => property.bedrooms >= filters.bedrooms);
      }

      // Sort by relevance (simple scoring for MVP)
      results = results.sort((a, b) => {
        const scoreA = this.calculateRelevanceScore(a, query, location);
        const scoreB = this.calculateRelevanceScore(b, query, location);
        return scoreB - scoreA;
      });

      return results;
    } catch (error) {
      console.error('❌ Failed to search properties:', error.message);
      throw new Error('Failed to search properties');
    }
  }

  // Get property by ID
  async getPropertyById(id) {
    try {
      const property = this.properties.find(p => p.id === parseInt(id));
      return property || null;
    } catch (error) {
      console.error('❌ Failed to get property:', error.message);
      throw new Error('Failed to get property');
    }
  }

  // Create new property
  async createProperty(propertyData) {
    try {
      const newProperty = {
        id: this.properties.length + 1,
        ...propertyData,
        createdAt: new Date(),
        isActive: true,
        aiAnalysis: {
          fraudRisk: Math.random() * 0.3,
          priceAccuracy: Math.random() * 0.3 + 0.7,
          imageQuality: Math.random() * 0.3 + 0.7,
          recommendations: ['Property listed successfully']
        }
      };

      this.properties.push(newProperty);
      console.log('✅ Property created:', newProperty.id);
      return newProperty;
    } catch (error) {
      console.error('❌ Failed to create property:', error.message);
      throw new Error('Failed to create property');
    }
  }

  // Update property
  async updateProperty(id, updateData) {
    try {
      const propertyIndex = this.properties.findIndex(p => p.id === parseInt(id));
      if (propertyIndex === -1) {
        throw new Error('Property not found');
      }

      this.properties[propertyIndex] = {
        ...this.properties[propertyIndex],
        ...updateData,
        updatedAt: new Date()
      };

      console.log('✅ Property updated:', id);
      return this.properties[propertyIndex];
    } catch (error) {
      console.error('❌ Failed to update property:', error.message);
      throw new Error('Failed to update property');
    }
  }

  // Delete property
  async deleteProperty(id) {
    try {
      const propertyIndex = this.properties.findIndex(p => p.id === parseInt(id));
      if (propertyIndex === -1) {
        throw new Error('Property not found');
      }

      this.properties.splice(propertyIndex, 1);
      console.log('✅ Property deleted:', id);
      return true;
    } catch (error) {
      console.error('❌ Failed to delete property:', error.message);
      throw new Error('Failed to delete property');
    }
  }

  // Get properties by owner
  async getPropertiesByOwner(ownerId) {
    try {
      return this.properties.filter(p => p.ownerId === parseInt(ownerId));
    } catch (error) {
      console.error('❌ Failed to get owner properties:', error.message);
      throw new Error('Failed to get owner properties');
    }
  }

  // Get featured properties
  async getFeaturedProperties(limit = 5) {
    try {
      return this.properties
        .filter(p => p.isActive)
        .sort((a, b) => b.aiAnalysis.priceAccuracy - a.aiAnalysis.priceAccuracy)
        .slice(0, limit);
    } catch (error) {
      console.error('❌ Failed to get featured properties:', error.message);
      throw new Error('Failed to get featured properties');
    }
  }

  // Get similar properties
  async getSimilarProperties(propertyId, limit = 5) {
    try {
      const property = await this.getPropertyById(propertyId);
      if (!property) {
        throw new Error('Property not found');
      }

      const similarProperties = this.properties
        .filter(p => p.id !== propertyId && p.isActive)
        .filter(p => 
          p.propertyType === property.propertyType ||
          p.location === property.location ||
          Math.abs(p.price - property.price) < property.price * 0.3
        )
        .sort((a, b) => {
          const scoreA = this.calculateSimilarityScore(a, property);
          const scoreB = this.calculateSimilarityScore(b, property);
          return scoreB - scoreA;
        })
        .slice(0, limit);

      return similarProperties;
    } catch (error) {
      console.error('❌ Failed to get similar properties:', error.message);
      throw new Error('Failed to get similar properties');
    }
  }

  // Helper methods
  calculateRelevanceScore(property, query, location) {
    let score = 0;

    // Query relevance
    if (query) {
      const searchableText = `${property.title} ${property.description}`.toLowerCase();
      const queryTerms = query.toLowerCase().split(' ');
      queryTerms.forEach(term => {
        if (searchableText.includes(term)) {
          score += 1;
        }
      });
    }

    // Location relevance
    if (location && property.location.toLowerCase().includes(location.toLowerCase())) {
      score += 2;
    }

    // AI analysis score
    score += property.aiAnalysis.priceAccuracy * 2;
    score += (1 - property.aiAnalysis.fraudRisk) * 2;

    return score;
  }

  calculateSimilarityScore(property1, property2) {
    let score = 0;

    // Property type match
    if (property1.propertyType === property2.propertyType) {
      score += 3;
    }

    // Location match
    if (property1.location === property2.location) {
      score += 2;
    }

    // Price similarity
    const priceDiff = Math.abs(property1.price - property2.price);
    const priceSimilarity = 1 - (priceDiff / Math.max(property1.price, property2.price));
    score += priceSimilarity * 2;

    // Bedroom match
    if (property1.bedrooms === property2.bedrooms) {
      score += 1;
    }

    return score;
  }
}

module.exports = new PropertyService();

