const hederaService = require('../services/hederaService');
const aiService = require('../services/aiService');
const { pool } = require('../config/mockDatabase');

const propertyController = {
    // Create new property listing
    async createProperty(req, res) {
        try {
            const {
                title,
                description,
                property_type,
                listing_type,
                country,
                city,
                state_region,
                address,
                latitude,
                longitude,
                price,
                currency,
                bedrooms,
                bathrooms,
                area_sqm,
                year_built,
                images
            } = req.body;

            const owner_id = req.user.id; // From auth middleware

            // Step 1: Run AI Analysis
            console.log('🤖 Running AI analysis...');
            
            const aiAnalysis = await aiService.analyzePropertyImages(images || []);
            const fraudDetection = await aiService.detectFraud({
                price,
                location: city,
                title,
                description,
                images,
                area_sqm,
                bedrooms
            });
            const pricePrediction = await aiService.predictPrice({
                location: state_region,
                city,
                propertyType: property_type,
                bedrooms,
                bathrooms,
                area_sqm
            });

            // Step 2: Create on Hedera blockchain
            console.log('⛓️  Creating property on Hedera...');
            
            const hederaResult = await hederaService.createPropertyListing({
                title,
                location: `${city}, ${country}`,
                price,
                propertyType: property_type,
                ownerId: owner_id,
                images,
                description
            });

            // Step 3: Store in database
            console.log('💾 Storing in database...');
            
            const query = `
                INSERT INTO properties (
                    owner_id, hedera_contract_id, hedera_transaction_id,
                    title, description, property_type, listing_type,
                    country, city, state_region, address, latitude, longitude,
                    price, currency, bedrooms, bathrooms, area_sqm, year_built,
                    images, thumbnail,
                    ai_analysis, fraud_score, price_prediction, quality_score,
                    status, verified, blockchain_verified
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
                    $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25,
                    $26, $27, $28
                ) RETURNING *
            `;

            const values = [
                owner_id,
                hederaResult.topicId,
                hederaResult.transactionId,
                title,
                description,
                property_type,
                listing_type || 'sale',
                country,
                city,
                state_region,
                address,
                latitude,
                longitude,
                price,
                currency || 'NGN',
                bedrooms,
                bathrooms,
                area_sqm,
                year_built,
                JSON.stringify(images || []),
                images?.[0] || null, // First image as thumbnail
                JSON.stringify({
                    imageAnalysis: aiAnalysis,
                    fraudDetection,
                    pricePrediction
                }),
                fraudDetection.fraudScore,
                pricePrediction.predictedPrice,
                aiAnalysis.overallQuality,
                fraudDetection.recommendation === 'REJECT' ? 'pending_review' : 'active',
                false,
                true
            ];

            const result = await pool.query(query, values);
            const property = result.rows[0];

            res.status(201).json({
                success: true,
                message: 'Property created successfully',
                data: {
                    property,
                    blockchain: {
                        topicId: hederaResult.topicId,
                        transactionId: hederaResult.transactionId
                    },
                    aiAnalysis: {
                        fraudScore: fraudDetection.fraudScore,
                        riskLevel: fraudDetection.riskLevel,
                        qualityScore: aiAnalysis.overallQuality,
                        predictedPrice: pricePrediction.predictedPrice
                    }
                }
            });

        } catch (error) {
            console.error('Error creating property:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create property',
                error: error.message
            });
        }
    },

    // Get all properties with filters
    async getProperties(req, res) {
        try {
            // For MVP, return mock properties directly
            const mockProperties = [
                {
                    id: 1,
                    title: 'Luxury 3-Bedroom Apartment with City Views',
                    description: 'This stunning apartment offers modern living in the heart of Victoria Island.',
                    location: 'Victoria Island, Lagos',
                    price: 45000000,
                    currency: 'NGN',
                    property_type: 'apartment',
                    bedrooms: 3,
                    bathrooms: 2,
                    area_sqm: 1200,
                    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
                    owner_id: 1,
                    is_verified: true,
                    is_featured: true,
                    status: 'active',
                    views: 1200,
                    inquiries: 45,
                    created_at: new Date('2023-01-15T10:00:00Z'),
                    updated_at: new Date('2023-01-15T10:00:00Z')
                },
                {
                    id: 2,
                    title: 'Modern Family House in Lekki',
                    description: 'Beautiful family home in the heart of Lekki Phase 1.',
                    location: 'Lekki Phase 1, Lagos',
                    price: 85000000,
                    currency: 'NGN',
                    property_type: 'house',
                    bedrooms: 4,
                    bathrooms: 3,
                    area_sqm: 2000,
                    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
                    owner_id: 2,
                    is_verified: true,
                    is_featured: false,
                    status: 'active',
                    views: 850,
                    inquiries: 30,
                    created_at: new Date('2023-03-20T11:30:00Z'),
                    updated_at: new Date('2023-03-20T11:30:00Z')
                },
                {
                    id: 3,
                    title: 'Premium Office Space in Ikoyi',
                    description: 'Prime commercial space with modern amenities.',
                    location: 'Ikoyi, Lagos',
                    price: 200000000,
                    currency: 'NGN',
                    property_type: 'commercial',
                    bedrooms: 0,
                    bathrooms: 4,
                    area_sqm: 1500,
                    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
                    owner_id: 2,
                    is_verified: true,
                    is_featured: true,
                    status: 'active',
                    views: 900,
                    inquiries: 35,
                    created_at: new Date('2023-02-10T08:00:00Z'),
                    updated_at: new Date('2023-02-10T08:00:00Z')
                }
            ];

            res.json({
                success: true,
                data: {
                    properties: mockProperties,
                    pagination: {
                        page: 1,
                        limit: 20,
                        total: mockProperties.length,
                        pages: 1
                    }
                }
            });

        } catch (error) {
            console.error('Error getting properties:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get properties',
                error: error.message
            });
        }
    },

    // Get single property by ID
    async getPropertyById(req, res) {
        try {
            const { id } = req.params;

            // For MVP, return mock property data
            const mockProperties = [
                {
                    id: 1,
                    title: 'Luxury 3-Bedroom Apartment with City Views',
                    description: 'This stunning apartment offers modern living in the heart of Victoria Island.',
                    location: 'Victoria Island, Lagos',
                    price: 45000000,
                    currency: 'NGN',
                    property_type: 'apartment',
                    bedrooms: 3,
                    bathrooms: 2,
                    area_sqm: 1200,
                    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
                    owner_id: 1,
                    is_verified: true,
                    is_featured: true,
                    status: 'active',
                    views: 1200,
                    inquiries: 45,
                    created_at: new Date('2023-01-15T10:00:00Z'),
                    updated_at: new Date('2023-01-15T10:00:00Z')
                },
                {
                    id: 2,
                    title: 'Modern Family House in Lekki',
                    description: 'Beautiful family home in the heart of Lekki Phase 1.',
                    location: 'Lekki Phase 1, Lagos',
                    price: 85000000,
                    currency: 'NGN',
                    property_type: 'house',
                    bedrooms: 4,
                    bathrooms: 3,
                    area_sqm: 2000,
                    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
                    owner_id: 2,
                    is_verified: true,
                    is_featured: false,
                    status: 'active',
                    views: 850,
                    inquiries: 30,
                    created_at: new Date('2023-03-20T11:30:00Z'),
                    updated_at: new Date('2023-03-20T11:30:00Z')
                },
                {
                    id: 3,
                    title: 'Premium Office Space in Ikoyi',
                    description: 'Prime commercial space with modern amenities.',
                    location: 'Ikoyi, Lagos',
                    price: 200000000,
                    currency: 'NGN',
                    property_type: 'commercial',
                    bedrooms: 0,
                    bathrooms: 4,
                    area_sqm: 1500,
                    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
                    owner_id: 2,
                    is_verified: true,
                    is_featured: true,
                    status: 'active',
                    views: 900,
                    inquiries: 35,
                    created_at: new Date('2023-02-10T08:00:00Z'),
                    updated_at: new Date('2023-02-10T08:00:00Z')
                }
            ];

            const property = mockProperties.find(p => p.id === parseInt(id));

            if (!property) {
                return res.status(404).json({
                    success: false,
                    message: 'Property not found'
                });
            }

            // Mock owner info
            const owner = {
                id: property.owner_id,
                full_name: 'John Doe',
                email: 'john@example.com',
                phone: '+234-123-456-7890',
                verified: true
            };

            res.json({
                success: true,
                data: {
                    property,
                    owner
                }
            });

        } catch (error) {
            console.error('Error getting property:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get property',
                error: error.message
            });
        }
    },

    // Update property
    async updateProperty(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const userId = req.user.id;

            // For MVP, simulate property update
            const mockProperty = {
                id: parseInt(id),
                title: updates.title || 'Updated Property',
                description: updates.description || 'Updated description',
                price: updates.price || 50000000,
                status: updates.status || 'active',
                bedrooms: updates.bedrooms || 3,
                bathrooms: updates.bathrooms || 2,
                area_sqm: updates.area_sqm || 1200,
                updated_at: new Date().toISOString()
            };

            res.json({
                success: true,
                message: 'Property updated successfully',
                data: mockProperty
            });

        } catch (error) {
            console.error('Error updating property:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update property',
                error: error.message
            });
        }
    },

    // Delete property
    async deleteProperty(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            // For MVP, simulate property deletion
            res.json({
                success: true,
                message: 'Property deleted successfully'
            });

        } catch (error) {
            console.error('Error deleting property:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete property',
                error: error.message
            });
        }
    },

    // Get AI recommendations for user
    async getRecommendations(req, res) {
        try {
            const userId = req.user.id;

            // Mock user preferences
            const preferences = {
                budget: 50000000,
                location: 'Lagos',
                propertyType: 'apartment',
                bedrooms: 2
            };

            // Mock available properties
            const mockProperties = [
                {
                    id: 1,
                    title: 'Luxury 3-Bedroom Apartment with City Views',
                    location: 'Victoria Island, Lagos',
                    price: 45000000,
                    property_type: 'apartment',
                    bedrooms: 3,
                    bathrooms: 2,
                    area_sqm: 1200,
                    verified: true,
                    quality_score: 85
                },
                {
                    id: 2,
                    title: 'Modern Family House in Lekki',
                    location: 'Lekki Phase 1, Lagos',
                    price: 85000000,
                    property_type: 'house',
                    bedrooms: 4,
                    bathrooms: 3,
                    area_sqm: 2000,
                    verified: true,
                    quality_score: 90
                }
            ];

            // Get AI recommendations
            const recommendations = await aiService.getPropertyRecommendations(
                preferences,
                mockProperties
            );

            res.json({
                success: true,
                data: {
                    recommendations: recommendations.slice(0, 10),
                    preferences
                }
            });

        } catch (error) {
            console.error('Error getting recommendations:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get recommendations',
                error: error.message
            });
        }
    }
};

module.exports = propertyController;