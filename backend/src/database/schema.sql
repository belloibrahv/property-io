-- Afrika Property Guardian Database Schema
-- Comprehensive PostgreSQL schema with proper relationships and indexes

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('buyer', 'seller', 'agent')),
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    hedera_account_id VARCHAR(50),
    kyc_status VARCHAR(20) DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
    last_login TIMESTAMP WITH TIME ZONE,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions table for refresh tokens
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    device_info JSONB,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Properties table
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    coordinates POINT, -- PostGIS point for geolocation
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'Nigeria',
    price DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NGN',
    property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('apartment', 'house', 'commercial', 'land')),
    bedrooms INTEGER DEFAULT 0,
    bathrooms INTEGER DEFAULT 0,
    size DECIMAL(10,2) NOT NULL,
    size_unit VARCHAR(10) DEFAULT 'sqm' CHECK (size_unit IN ('sqm', 'sqft')),
    year_built INTEGER,
    condition VARCHAR(50) CHECK (condition IN ('new', 'excellent', 'good', 'fair', 'poor')),
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_tokenized BOOLEAN DEFAULT FALSE,
    hedera_tx_id VARCHAR(100),
    hedera_contract_id VARCHAR(100),
    token_id VARCHAR(100),
    token_supply INTEGER,
    token_price DECIMAL(15,2),
    views INTEGER DEFAULT 0,
    inquiries INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property images table
CREATE TABLE property_images (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_type VARCHAR(50) DEFAULT 'gallery' CHECK (image_type IN ('main', 'gallery', 'floor_plan', 'document')),
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property features table
CREATE TABLE property_features (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    feature_name VARCHAR(100) NOT NULL,
    feature_value VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property verifications table
CREATE TABLE property_verifications (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    verifier_id INTEGER REFERENCES users(id),
    verification_type VARCHAR(50) NOT NULL CHECK (verification_type IN ('ownership', 'legal', 'technical', 'financial')),
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
    verification_hash VARCHAR(255) UNIQUE NOT NULL,
    document_hash VARCHAR(255),
    verification_notes TEXT,
    verified_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property transactions table
CREATE TABLE property_transactions (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    buyer_id INTEGER REFERENCES users(id),
    seller_id INTEGER REFERENCES users(id),
    transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('sale', 'rent', 'lease', 'token_purchase')),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NGN',
    tokens_transferred INTEGER,
    hedera_tx_id VARCHAR(100),
    transaction_status VARCHAR(20) DEFAULT 'pending' CHECK (transaction_status IN ('pending', 'completed', 'failed', 'cancelled')),
    payment_method VARCHAR(50),
    transaction_notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites table
CREATE TABLE user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- Property inquiries table
CREATE TABLE property_inquiries (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    inquirer_id INTEGER REFERENCES users(id),
    inquiry_type VARCHAR(50) DEFAULT 'general' CHECK (inquiry_type IN ('general', 'viewing', 'price', 'availability')),
    message TEXT NOT NULL,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI analysis table
CREATE TABLE ai_analyses (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    analysis_type VARCHAR(50) NOT NULL CHECK (analysis_type IN ('fraud_detection', 'price_prediction', 'market_analysis', 'image_analysis')),
    analysis_data JSONB NOT NULL,
    confidence_score DECIMAL(5,2),
    fraud_score DECIMAL(5,2),
    risk_level VARCHAR(20) CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH')),
    recommendations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search history table
CREATE TABLE search_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    search_query TEXT,
    search_filters JSONB,
    results_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL CHECK (notification_type IN ('property_update', 'inquiry', 'transaction', 'verification', 'system')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_hedera_account_id ON users(hedera_account_id);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_refresh_token ON user_sessions(refresh_token);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);

CREATE INDEX idx_properties_owner_id ON properties(owner_id);
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_state ON properties(state);
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_is_verified ON properties(is_verified);
CREATE INDEX idx_properties_is_featured ON properties(is_featured);
CREATE INDEX idx_properties_is_active ON properties(is_active);
CREATE INDEX idx_properties_coordinates ON properties USING GIST(coordinates);
CREATE INDEX idx_properties_created_at ON properties(created_at);

CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_property_images_is_primary ON property_images(is_primary);

CREATE INDEX idx_property_features_property_id ON property_features(property_id);

CREATE INDEX idx_property_verifications_property_id ON property_verifications(property_id);
CREATE INDEX idx_property_verifications_verifier_id ON property_verifications(verifier_id);
CREATE INDEX idx_property_verifications_status ON property_verifications(verification_status);

CREATE INDEX idx_property_transactions_property_id ON property_transactions(property_id);
CREATE INDEX idx_property_transactions_buyer_id ON property_transactions(buyer_id);
CREATE INDEX idx_property_transactions_seller_id ON property_transactions(seller_id);
CREATE INDEX idx_property_transactions_status ON property_transactions(transaction_status);

CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_user_favorites_property_id ON user_favorites(property_id);

CREATE INDEX idx_property_inquiries_property_id ON property_inquiries(property_id);
CREATE INDEX idx_property_inquiries_inquirer_id ON property_inquiries(inquirer_id);
CREATE INDEX idx_property_inquiries_status ON property_inquiries(status);

CREATE INDEX idx_ai_analyses_property_id ON ai_analyses(property_id);
CREATE INDEX idx_ai_analyses_type ON ai_analyses(analysis_type);

CREATE INDEX idx_search_history_user_id ON search_history(user_id);
CREATE INDEX idx_search_history_created_at ON search_history(created_at);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(notification_type);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_property_verifications_updated_at BEFORE UPDATE ON property_verifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_property_transactions_updated_at BEFORE UPDATE ON property_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update property views
CREATE OR REPLACE FUNCTION increment_property_views(property_id_param INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE properties 
    SET views = views + 1 
    WHERE id = property_id_param;
END;
$$ LANGUAGE plpgsql;

-- Create function to update property inquiries
CREATE OR REPLACE FUNCTION increment_property_inquiries(property_id_param INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE properties 
    SET inquiries = inquiries + 1 
    WHERE id = property_id_param;
END;
$$ LANGUAGE plpgsql;

-- Create function to get property statistics
CREATE OR REPLACE FUNCTION get_property_stats()
RETURNS TABLE(
    total_properties BIGINT,
    verified_properties BIGINT,
    tokenized_properties BIGINT,
    total_users BIGINT,
    total_transactions BIGINT,
    total_value DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_properties,
        COUNT(*) FILTER (WHERE is_verified = true) as verified_properties,
        COUNT(*) FILTER (WHERE is_tokenized = true) as tokenized_properties,
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM property_transactions WHERE transaction_status = 'completed') as total_transactions,
        COALESCE(SUM(price), 0) as total_value
    FROM properties 
    WHERE is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data for testing
INSERT INTO users (email, password_hash, first_name, last_name, phone, user_type, is_verified, hedera_account_id) VALUES
('buyer@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8Kz8Kz8K', 'John', 'Doe', '+234-123-456-7890', 'buyer', true, '0.0.123456'),
('seller@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8Kz8Kz8K', 'Jane', 'Smith', '+234-987-654-3210', 'seller', true, '0.0.789012'),
('agent@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8Kz8Kz8K', 'Mike', 'Johnson', '+234-555-123-4567', 'agent', true, '0.0.345678');

-- Insert sample properties
INSERT INTO properties (owner_id, title, description, location, address, city, state, price, property_type, bedrooms, bathrooms, size, is_verified, is_featured) VALUES
(2, 'Luxury 3-Bedroom Apartment with City Views', 'This stunning apartment offers modern living in the heart of Victoria Island.', 'Victoria Island, Lagos', '123 Victoria Island Road', 'Lagos', 'Lagos', 45000000, 'apartment', 3, 2, 1200, true, true),
(2, 'Modern Family House in Lekki', 'Beautiful family home in the heart of Lekki Phase 1.', 'Lekki Phase 1, Lagos', '456 Lekki Phase 1 Avenue', 'Lagos', 'Lagos', 85000000, 'house', 4, 3, 2000, true, false),
(2, 'Premium Office Space in Ikoyi', 'Prime commercial space with modern amenities.', 'Ikoyi, Lagos', '789 Ikoyi Commercial Street', 'Lagos', 'Lagos', 200000000, 'commercial', 0, 4, 1500, true, true);

-- Insert sample property images
INSERT INTO property_images (property_id, image_url, image_type, is_primary) VALUES
(1, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 'main', true),
(1, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'gallery', false),
(2, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 'main', true),
(3, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 'main', true);

-- Insert sample property features
INSERT INTO property_features (property_id, feature_name, feature_value) VALUES
(1, 'Swimming Pool', 'Yes'),
(1, 'Gym', 'Yes'),
(1, 'Parking', '2 spaces'),
(1, 'Security', '24/7'),
(2, 'Garden', 'Large'),
(2, 'Parking', '3 spaces'),
(2, 'Security', 'Gated community'),
(3, 'Elevator', 'Yes'),
(3, 'Parking', '10 spaces'),
(3, 'Security', '24/7');

COMMENT ON TABLE users IS 'User accounts and profiles';
COMMENT ON TABLE properties IS 'Property listings with detailed information';
COMMENT ON TABLE property_images IS 'Property images and media';
COMMENT ON TABLE property_features IS 'Property features and amenities';
COMMENT ON TABLE property_verifications IS 'Property verification records';
COMMENT ON TABLE property_transactions IS 'Property transaction history';
COMMENT ON TABLE user_favorites IS 'User favorite properties';
COMMENT ON TABLE property_inquiries IS 'Property inquiry messages';
COMMENT ON TABLE ai_analyses IS 'AI analysis results for properties';
COMMENT ON TABLE search_history IS 'User search history';
COMMENT ON TABLE notifications IS 'User notifications';
COMMENT ON TABLE audit_logs IS 'System audit trail';
