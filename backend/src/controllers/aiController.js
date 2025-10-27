const aiService = require('../services/aiService');

const aiController = {
    // Analyze property image
    async analyzeImage(req, res) {
        try {
            const { imageUrl } = req.body;

            if (!imageUrl) {
                return res.status(400).json({
                    success: false,
                    message: 'Image URL is required'
                });
            }

            const analysis = await aiService.analyzePropertyImages([imageUrl]);

            res.json({
                success: true,
                data: {
                    analysis: analysis.analyses[0],
                    overallQuality: analysis.overallQuality
                }
            });

        } catch (error) {
            console.error('Error analyzing image:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to analyze image',
                error: error.message
            });
        }
    },

    // Detect fraud in property listing
    async detectFraud(req, res) {
        try {
            const propertyData = req.body;

            console.log('🔍 Analyzing property for fraud:', propertyData);

            const fraudDetection = await aiService.detectFraud(propertyData);

            res.json({
                success: true,
                data: fraudDetection
            });

        } catch (error) {
            console.error('Error detecting fraud:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to detect fraud',
                error: error.message
            });
        }
    },

    // Predict property price
    async predictPrice(req, res) {
        try {
            const propertyData = req.body;

            const pricePrediction = await aiService.predictPrice(propertyData);

            res.json({
                success: true,
                data: pricePrediction
            });

        } catch (error) {
            console.error('Error predicting price:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to predict price',
                error: error.message
            });
        }
    },

    // Get property recommendations
    async getRecommendations(req, res) {
        try {
            const userId = req.user.id;
            const { preferences } = req.body;

            // Build user preferences
            const userPreferences = {
                budget: preferences?.budget || 50000000,
                location: preferences?.location || 'Lagos',
                propertyType: preferences?.propertyType || 'apartment',
                bedrooms: preferences?.bedrooms || 2,
                searchHistory: []
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
                userPreferences,
                mockProperties
            );

            res.json({
                success: true,
                data: {
                    recommendations: recommendations.slice(0, 10),
                    preferences: userPreferences
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
    },

    // Get market insights
    async getMarketInsights(req, res) {
        try {
            const { city, property_type } = req.query;

            // Get market data from database
            let query = 'SELECT * FROM properties WHERE status = $1';
            let values = ['active'];

            if (city) {
                query += ' AND city = $2';
                values.push(city);
            }

            if (property_type) {
                query += ` AND property_type = $${values.length + 1}`;
                values.push(property_type);
            }

            const result = await pool.query(query, values);
            const properties = result.rows;

            // Calculate market insights
            const totalProperties = properties.length;
            const avgPrice = properties.reduce((sum, p) => sum + p.price, 0) / totalProperties;
            const avgPricePerSqm = properties.reduce((sum, p) => sum + (p.price / (p.area_sqm || 1)), 0) / totalProperties;

            // Price distribution
            const priceRanges = {
                'under_10m': properties.filter(p => p.price < 10000000).length,
                '10m_to_50m': properties.filter(p => p.price >= 10000000 && p.price < 50000000).length,
                '50m_to_100m': properties.filter(p => p.price >= 50000000 && p.price < 100000000).length,
                'over_100m': properties.filter(p => p.price >= 100000000).length
            };

            // Property type distribution
            const typeDistribution = properties.reduce((acc, p) => {
                acc[p.property_type] = (acc[p.property_type] || 0) + 1;
                return acc;
            }, {});

            res.json({
                success: true,
                data: {
                    totalProperties,
                    averagePrice: Math.round(avgPrice),
                    averagePricePerSqm: Math.round(avgPricePerSqm),
                    priceRanges,
                    typeDistribution,
                    lastUpdated: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('Error getting market insights:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get market insights',
                error: error.message
            });
        }
    },

    // Smart search with AI
    async smartSearch(req, res) {
        try {
            const { query, filters } = req.body;

            // Get all properties
            const propertiesResult = await pool.query(
                'SELECT * FROM properties WHERE status = $1',
                ['active']
            );

            let filteredProperties = propertiesResult.rows;

            // Apply filters
            if (filters) {
                if (filters.city) {
                    filteredProperties = filteredProperties.filter(p => 
                        p.city.toLowerCase().includes(filters.city.toLowerCase())
                    );
                }

                if (filters.property_type) {
                    filteredProperties = filteredProperties.filter(p => 
                        p.property_type === filters.property_type
                    );
                }

                if (filters.min_price) {
                    filteredProperties = filteredProperties.filter(p => 
                        p.price >= filters.min_price
                    );
                }

                if (filters.max_price) {
                    filteredProperties = filteredProperties.filter(p => 
                        p.price <= filters.max_price
                    );
                }

                if (filters.bedrooms) {
                    filteredProperties = filteredProperties.filter(p => 
                        p.bedrooms >= filters.bedrooms
                    );
                }
            }

            // If there's a text query, use AI to rank results
            if (query) {
                const searchPreferences = {
                    budget: filters?.max_price || 100000000,
                    location: filters?.city || 'Lagos',
                    propertyType: filters?.property_type || 'apartment',
                    bedrooms: filters?.bedrooms || 2
                };

                const rankedProperties = await aiService.getPropertyRecommendations(
                    searchPreferences,
                    filteredProperties
                );

                filteredProperties = rankedProperties;
            }

            res.json({
                success: true,
                data: {
                    properties: filteredProperties.slice(0, 20),
                    total: filteredProperties.length,
                    query,
                    filters
                }
            });

        } catch (error) {
            console.error('Error in smart search:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to perform smart search',
                error: error.message
            });
        }
    }
};

module.exports = aiController;