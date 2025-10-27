const axios = require('axios');

class AIService {
    constructor() {
        this.huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
        this.huggingfaceApiUrl = 'https://api-inference.huggingface.co/models/';
    }

    /**
     * Analyze Property Images
     * Detects: quality, authenticity, property features
     */
    async analyzePropertyImages(imageUrls) {
        try {
            const analyses = [];

            for (const imageUrl of imageUrls.slice(0, 5)) { // Limit to 5 images
                try {
                    // For MVP, we'll use mock analysis
                    // In production, integrate with Hugging Face API
                    const mockAnalysis = {
                        imageUrl,
                        classification: [
                            { label: 'building', score: 0.95 },
                            { label: 'house', score: 0.87 },
                            { label: 'architecture', score: 0.82 }
                        ],
                        objects: [
                            { label: 'window', score: 0.92, box: { x: 100, y: 50, width: 200, height: 300 } },
                            { label: 'door', score: 0.88, box: { x: 300, y: 400, width: 150, height: 250 } }
                        ],
                        quality: this.calculateImageQuality(imageUrl)
                    };

                    analyses.push(mockAnalysis);
                } catch (error) {
                    console.error(`Error analyzing image ${imageUrl}:`, error);
                    analyses.push({
                        imageUrl,
                        error: 'Failed to analyze image',
                        quality: 50
                    });
                }
            }

            return {
                totalImages: imageUrls.length,
                analyzedImages: analyses.length,
                analyses,
                overallQuality: this.calculateOverallQuality(analyses)
            };
        } catch (error) {
            console.error('Error in analyzePropertyImages:', error);
            return {
                totalImages: imageUrls.length,
                analyzedImages: 0,
                analyses: [],
                overallQuality: 50
            };
        }
    }

    /**
     * Fraud Detection
     * Analyzes listing data for suspicious patterns
     */
    async detectFraud(propertyData) {
        try {
            console.log('🔍 AI Service - Analyzing property data:', propertyData);
            
            // Ensure propertyData is an object
            if (!propertyData || typeof propertyData !== 'object') {
                console.error('Invalid property data provided:', propertyData);
                return {
                    fraudScore: 0,
                    riskLevel: 'UNKNOWN',
                    indicators: ['Invalid property data'],
                    recommendation: 'REVIEW'
                };
            }
            
            const {
                price = 0,
                location = '',
                title = '',
                description = '',
                images = [],
                area_sqm = 0,
                bedrooms = 0
            } = propertyData;

            let fraudScore = 0;
            let fraudIndicators = [];

            // Check 1: Price anomalies
            const pricePerSqm = area_sqm ? price / area_sqm : 0;
            if (pricePerSqm < 1000 || pricePerSqm > 1000000) {
                fraudScore += 25;
                fraudIndicators.push('Suspicious price per square meter');
            }

            // Check 2: Incomplete description
            if (!description || description.length < 50) {
                fraudScore += 15;
                fraudIndicators.push('Insufficient property description');
            }

            // Check 3: Limited images
            if (!images || images.length < 3) {
                fraudScore += 20;
                fraudIndicators.push('Too few property images');
            }

            // Check 4: Contact information spam
            const spamKeywords = ['whatsapp only', 'cash only', 'urgent', 'too good'];
            const textContent = (title + ' ' + description).toLowerCase();
            const hasSpam = spamKeywords.some(keyword => textContent.includes(keyword));
            
            if (hasSpam) {
                fraudScore += 15;
                fraudIndicators.push('Contains spam keywords');
            }

            // Check 5: Suspicious pricing patterns
            if (price < 1000000) { // Less than 1M NGN
                fraudScore += 10;
                fraudIndicators.push('Unusually low price');
            }

            console.log('✅ Fraud detection completed:', { fraudScore, riskLevel: this.getFraudRiskLevel(fraudScore) });

            return {
                fraudScore: Math.min(fraudScore, 100),
                riskLevel: this.getFraudRiskLevel(fraudScore),
                indicators: fraudIndicators,
                recommendation: fraudScore > 50 ? 'REJECT' : fraudScore > 30 ? 'REVIEW' : 'APPROVE'
            };
        } catch (error) {
            console.error('❌ Error in fraud detection:', error);
            return {
                fraudScore: 0,
                riskLevel: 'UNKNOWN',
                indicators: ['Error during analysis'],
                recommendation: 'REVIEW'
            };
        }
    }

    /**
     * Price Prediction
     * Estimates fair market price based on location and features
     */
    async predictPrice(propertyData) {
        try {
            const {
                location,
                city,
                propertyType,
                bedrooms,
                bathrooms,
                area_sqm
            } = propertyData;

            // Base prices per city (Nigerian Naira per sqm)
            const basePrices = {
                'Lagos': 250000,
                'Abuja': 200000,
                'Port Harcourt': 150000,
                'Ibadan': 120000,
                'Kano': 100000,
                'default': 100000
            };

            const basePrice = basePrices[city] || basePrices['default'];

            // Property type multipliers
            const typeMultipliers = {
                'apartment': 1.0,
                'house': 1.2,
                'duplex': 1.5,
                'mansion': 2.0,
                'land': 0.7,
                'commercial': 1.3
            };

            const typeMultiplier = typeMultipliers[propertyType?.toLowerCase()] || 1.0;

            // Calculate predicted price
            let predictedPrice = basePrice * area_sqm * typeMultiplier;

            // Adjust for bedrooms (if available)
            if (bedrooms) {
                predictedPrice *= (1 + (bedrooms - 2) * 0.1);
            }

            // Adjust for bathrooms
            if (bathrooms) {
                predictedPrice *= (1 + (bathrooms - 1) * 0.05);
            }

            return {
                predictedPrice: Math.round(predictedPrice),
                pricePerSqm: Math.round(predictedPrice / area_sqm),
                confidence: 0.75,
                factors: {
                    basePrice,
                    typeMultiplier,
                    area_sqm,
                    bedrooms,
                    bathrooms
                }
            };
        } catch (error) {
            console.error('Error in price prediction:', error);
            return {
                predictedPrice: 0,
                pricePerSqm: 0,
                confidence: 0,
                factors: {}
            };
        }
    }

    /**
     * AI Property Recommendations
     */
    async getPropertyRecommendations(userPreferences, availableProperties) {
        try {
            const {
                budget,
                location,
                propertyType,
                bedrooms,
                searchHistory
            } = userPreferences;

            // Score and rank properties
            const scoredProperties = availableProperties.map(property => {
                let score = 100;

                // Budget match
                if (property.price <= budget) {
                    score += 20;
                } else if (property.price <= budget * 1.2) {
                    score += 10;
                } else {
                    score -= 30;
                }

                // Location match
                if (property.city === location) {
                    score += 30;
                }

                // Property type match
                if (property.property_type === propertyType) {
                    score += 25;
                }

                // Bedrooms match
                if (property.bedrooms === bedrooms) {
                    score += 15;
                }

                // Verified properties bonus
                if (property.verified) {
                    score += 10;
                }

                // Quality score bonus
                if (property.quality_score) {
                    score += property.quality_score * 0.1;
                }

                return {
                    ...property,
                    matchScore: Math.max(0, Math.min(100, score))
                };
            });

            // Sort by match score
            scoredProperties.sort((a, b) => b.matchScore - a.matchScore);

            return scoredProperties.slice(0, 20);
        } catch (error) {
            console.error('Error getting recommendations:', error);
            return [];
        }
    }

    /**
     * Analyze property description for sentiment and keywords
     */
    async analyzeDescription(description) {
        try {
            if (!description) {
                return {
                    sentiment: 'neutral',
                    keywords: [],
                    quality: 0
                };
            }

            // Simple keyword extraction
            const keywords = description.toLowerCase()
                .split(/\W+/)
                .filter(word => word.length > 3)
                .filter(word => !['this', 'that', 'with', 'from', 'they', 'have', 'been', 'were', 'said', 'each', 'which', 'their', 'time', 'will', 'about', 'there', 'could', 'other', 'after', 'first', 'well', 'also', 'where', 'much', 'some', 'very', 'when', 'than', 'into', 'over', 'think', 'more', 'these', 'your', 'work', 'first', 'may', 'down', 'side', 'been', 'now', 'find'].includes(word));

            // Simple sentiment analysis
            const positiveWords = ['beautiful', 'excellent', 'amazing', 'perfect', 'great', 'wonderful', 'stunning', 'luxury', 'modern', 'spacious'];
            const negativeWords = ['bad', 'terrible', 'awful', 'poor', 'small', 'old', 'broken', 'damaged'];

            const positiveCount = positiveWords.filter(word => description.toLowerCase().includes(word)).length;
            const negativeCount = negativeWords.filter(word => description.toLowerCase().includes(word)).length;

            let sentiment = 'neutral';
            if (positiveCount > negativeCount) sentiment = 'positive';
            if (negativeCount > positiveCount) sentiment = 'negative';

            return {
                sentiment,
                keywords: keywords.slice(0, 10),
                quality: Math.min(100, (keywords.length * 2) + (positiveCount * 10) - (negativeCount * 5))
            };
        } catch (error) {
            console.error('Error analyzing description:', error);
            return {
                sentiment: 'neutral',
                keywords: [],
                quality: 50
            };
        }
    }

    // Helper Methods

    calculateImageQuality(imageUrl) {
        // Simple quality calculation based on URL patterns
        if (imageUrl.includes('unsplash.com')) return 85;
        if (imageUrl.includes('placeholder')) return 30;
        return 70; // Default quality
    }

    calculateOverallQuality(analyses) {
        if (analyses.length === 0) return 0;
        
        const validAnalyses = analyses.filter(a => a.quality);
        if (validAnalyses.length === 0) return 0;

        const avgQuality = validAnalyses.reduce((sum, a) => sum + a.quality, 0) / validAnalyses.length;
        return Math.round(avgQuality);
    }

    getFraudRiskLevel(score) {
        if (score >= 70) return 'HIGH';
        if (score >= 40) return 'MEDIUM';
        if (score >= 20) return 'LOW';
        return 'VERY_LOW';
    }
}

module.exports = new AIService();