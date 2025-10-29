"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../components/Logo";
import { 
  Home, 
  User, 
  Search, 
  Filter, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  DollarSign,
  Calendar,
  Building2,
  TrendingUp,
  Star,
  Eye,
  Heart,
  Share2,
  ChevronDown,
  Grid,
  List,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Bookmark,
  Clock,
  Shield,
  Zap,
  Award,
  Globe,
  Bell,
  Settings,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Layers,
  Map,
  Camera,
  Video,
  Wifi,
  Car,
  Trees,
  Waves,
  Mountain
} from "lucide-react";

import { properties } from "@/data/properties";

export default function BrowseProperties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [propertyType, setPropertyType] = useState("all");
  const [bedroomFilter, setBedroomFilter] = useState("all");
  const [bathroomFilter, setBathroomFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const itemsPerPage = 9;

  // Initialize current time on client side to prevent hydration errors
  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toLocaleTimeString());
    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Use shared properties data
  const mockProperties = properties.map(property => ({
    ...property,
    originalPrice: property.price,
    subtitle: property.description?.split('.')[0] || property.subtitle || '',
    shares: property.shares,
    roi: property.monthlyRent ? ((property.monthlyRent * 12) / property.price * 100) : property.roi,
    occupancyRate: property.occupancyRate,
    imageHash: property.imageHash || "QmSample...",
    verified: property.rating >= 4.5,
    trending: property.isFeatured,
    isFeatured: property.isFeatured
  }));

  // Filter and sort properties
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || property.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesType = propertyType === "all" || property.type === propertyType;
    const matchesBedrooms = bedroomFilter === "all" || 
      (bedroomFilter === "1" && property.bedrooms === 1) ||
      (bedroomFilter === "2" && property.bedrooms === 2) ||
      (bedroomFilter === "3" && property.bedrooms === 3) ||
      (bedroomFilter === "4+" && property.bedrooms >= 4);
    const matchesBathrooms = bathroomFilter === "all" ||
      (bathroomFilter === "1" && property.bathrooms === 1) ||
      (bathroomFilter === "2" && property.bathrooms === 2) ||
      (bathroomFilter === "3+" && property.bathrooms >= 3);
    const matchesSize = sizeFilter === "all" ||
      (sizeFilter === "small" && property.size < 150) ||
      (sizeFilter === "medium" && property.size >= 150 && property.size < 250) ||
      (sizeFilter === "large" && property.size >= 250);
    
    return matchesSearch && matchesLocation && matchesPrice && matchesType && 
           matchesBedrooms && matchesBathrooms && matchesSize && property.isActive;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "roi":
        return b.roi - a.roi;
      case "newest":
      default:
        return new Date(b.listedTime).getTime() - new Date(a.listedTime).getTime();
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setPriceRange([0, 2000000]);
    setPropertyType("all");
    setBedroomFilter("all");
    setBathroomFilter("all");
    setSizeFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced Navigation Header */}
      <nav className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Logo variant="compact" width={120} height={32} />
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/browse" className="text-blue-400 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors">
                  Properties
                </Link>
                <Link href="/fractionalize" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Fractionalize
                </Link>
                <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                <Link href="/learn" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Learn
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors relative">
                <Bell className="w-4 h-4 text-gray-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Discover Properties
              </h1>
              <p className="text-gray-400 mb-4">
                Explore premium real estate investments across Africa with blockchain-powered fractional ownership
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4" />
                  <span>{filteredProperties.length} Properties Available</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>3 Countries</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Avg ROI: 11.2%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/list-property"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>List Property</span>
              </Link>
              <button className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-slate-600">
                <Map className="w-4 h-4" />
                <span>Map View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 mb-8 border border-slate-600/50">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, property name, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
            
            {/* Quick Filters */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  showFilters ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="border-t border-slate-600/50 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <div className="relative">
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="">All Locations</option>
                      <option value="lagos">Lagos, Nigeria</option>
                      <option value="abuja">Abuja, Nigeria</option>
                      <option value="port harcourt">Port Harcourt, Nigeria</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <div className="relative">
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="all">All Types</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bedrooms</label>
                  <div className="relative">
                    <select
                      value={bedroomFilter}
                      onChange={(e) => setBedroomFilter(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="all">Any</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4+">4+ Bedrooms</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bathrooms</label>
                  <div className="relative">
                    <select
                      value={bathroomFilter}
                      onChange={(e) => setBathroomFilter(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="all">Any</option>
                      <option value="1">1 Bathroom</option>
                      <option value="2">2 Bathrooms</option>
                      <option value="3+">3+ Bathrooms</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
                  <div className="relative">
                    <select
                      value={sizeFilter}
                      onChange={(e) => setSizeFilter(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="all">All Sizes</option>
                      <option value="small">Under 150 sqm</option>
                      <option value="medium">150-250 sqm</option>
                      <option value="large">Over 250 sqm</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price Range: ${priceRange[1].toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Sort and Clear Options */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-300">Sort By:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "newest", label: "Newest" },
                      { value: "price-asc", label: "Price ↑" },
                      { value: "price-desc", label: "Price ↓" },
                      { value: "rating", label: "Rating" },
                      { value: "roi", label: "ROI" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          sortBy === option.value 
                            ? "bg-blue-600 text-white" 
                            : "bg-slate-700/50 text-gray-300 hover:bg-slate-600"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Showing {paginatedProperties.length} of {filteredProperties.length} properties
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Updated {currentTime || 'Loading...'}</span>
          </div>
        </div>

        {/* Properties Grid/List */}
        {paginatedProperties.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" 
            : "space-y-6 mb-8"
          }>
            {paginatedProperties.map((property) => (
              <div key={property.id} className={`group ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={`bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl overflow-hidden border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                  {/* Property Image */}
                  <div className={`relative bg-slate-700 ${viewMode === 'list' ? 'w-80 h-48' : 'h-48'} overflow-hidden`}>
                    {property.images && property.images.length > 0 ? (
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <Building2 className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Property Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {property.isFeatured && (
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Featured</span>
                        </div>
                      )}
                      {property.trending && (
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Trending</span>
                        </div>
                      )}
                      {property.verified && (
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          favorites.includes(property.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-800/80 text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(property.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="w-8 h-8 bg-slate-800/80 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price Discount Badge */}
                    {property.originalPrice > property.price && (
                      <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {Math.round(((property.originalPrice - property.price) / property.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">{property.subtitle}</p>
                        <div className="flex items-center space-x-1 text-gray-400 text-sm mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{property.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{property.rating}</span>
                        <span className="text-xs text-gray-400">({property.reviews})</span>
                      </div>
                    </div>

                    {/* Property Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Bed className="w-4 h-4" />
                        <span className="text-sm">{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Bath className="w-4 h-4" />
                        <span className="text-sm">{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Square className="w-4 h-4" />
                        <span className="text-sm">{property.size}m²</span>
                      </div>
                    </div>

                    {/* Investment Info */}
                    <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-400">Available Shares</p>
                          <p className="text-white font-medium">{property.availableShares}/{property.shares}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Expected ROI</p>
                          <p className="text-green-400 font-medium">{property.roi}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-2xl font-bold text-white">
                            ${property.price.toLocaleString()}
                          </p>
                          {property.originalPrice > property.price && (
                            <p className="text-sm text-gray-400 line-through">
                              ${property.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">Starting from $1,000</p>
                      </div>
                      
                      <Link
                        href={`/property/${property.id}`}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-12 text-center border border-slate-600/50">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Properties Found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
               We couldn&apos;t find any properties matching your criteria. Try adjusting your filters or search terms.
             </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && (
                <>
                  <span className="flex items-center text-gray-400">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

