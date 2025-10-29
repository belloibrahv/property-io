"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import Logo from "@/components/Logo";
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  User, 
  Edit, 
  Share2, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  TrendingUp,
  Gem,
  Building2,
  X,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

import { getPropertyById } from "@/data/properties";

export default function PropertyDetail() {
  const params = useParams();
  const propertyId = params?.id as string;
  const { isConnected, address } = useAppKitAccount();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'history' | 'ownership'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerData, setOfferData] = useState({
    amount: '',
    message: '',
    validUntil: ''
  });
  const [offerErrors, setOfferErrors] = useState<Record<string, string>>({});
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);

  // Get property data from shared data source
  const propertyData = getPropertyById(propertyId);
  
  // Fallback to default data if property not found
  const property = propertyData || {
    id: propertyId,
    title: "Modern Lagos Villa, Victoria Island",
    location: "Victoria Island, Lagos, Nigeria",
    price: 500000,
    size: 150,
    bedrooms: 3,
    bathrooms: 2,
    type: "residential",
    description: "Beautiful modern villa with stunning views of the Lagos skyline. This fully furnished property is located in a gated community with 24/7 security, swimming pool, gym, and is close to major business districts and amenities. Perfect for both living and investment purposes with excellent rental yield potential.",
    owner: "0.0.1234567",
    listedTime: "2024-01-15T10:30:00",
    isActive: true,
    isFractionalized: false,
    totalShares: 1000,
    availableShares: 750,
    sharePrice: 500,
    rating: 4.8,
    reviews: 24,
    yearBuilt: 2020,
    propertyTax: 12000,
    monthlyRent: 2500,
    occupancyRate: 95,
    imageHashes: ["QmSample1...", "QmSample2...", "QmSample3...", "QmSample4..."],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80", 
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80"
    ],
    amenities: [
      "Swimming Pool",
      "Gym & Fitness Center", 
      "24/7 Security",
      "Parking Space",
      "Generator Backup",
      "Water Treatment",
      "Playground",
      "Shopping Mall Nearby"
    ],
    history: [
      {
        timestamp: "2024-01-15T10:30:00",
        field: "listed",
        oldValue: "",
        newValue: "Property listed",
        changedBy: "0.0.1234567"
      },
      {
        timestamp: "2024-01-20T14:20:00",
        field: "price",
        oldValue: "400000",
        newValue: "500000",
        changedBy: "0.0.1234567"
      }
    ],
    ownershipHistory: [
      {
        timestamp: "2024-01-15T10:30:00",
        from: "0x0000...0000",
        to: "0.0.1234567",
        salePrice: 0,
        type: "initial_listing"
      }
    ]
  };

  const isOwner = address === property.owner;

  const validateOffer = () => {
    const errors: Record<string, string> = {};
    
    if (!offerData.amount || parseFloat(offerData.amount) <= 0) {
      errors.amount = "Please enter a valid offer amount";
    } else if (parseFloat(offerData.amount) < property.price * 0.5) {
      errors.amount = "Offer must be at least 50% of the listing price";
    }
    
    if (!offerData.validUntil) {
      errors.validUntil = "Please select an expiration date";
    } else {
      const selectedDate = new Date(offerData.validUntil);
      const today = new Date();
      if (selectedDate <= today) {
        errors.validUntil = "Expiration date must be in the future";
      }
    }
    
    if (offerData.message.length > 500) {
      errors.message = "Message must be less than 500 characters";
    }
    
    setOfferErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOffer()) return;
    
    setIsSubmittingOffer(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form and close modal
      setOfferData({ amount: '', message: '', validUntil: '' });
      setOfferErrors({});
      setShowOfferModal(false);
      
      // Show success message (you can implement a toast notification here)
      alert('Offer submitted successfully!');
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert('Failed to submit offer. Please try again.');
    } finally {
      setIsSubmittingOffer(false);
    }
  };

  const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOfferData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (offerErrors[name]) {
      setOfferErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation Header */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Logo variant="compact" width={120} height={32} />
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/browse" className="text-blue-400 hover:text-blue-300 px-3 py-2 text-sm font-medium">
                  Properties
                </Link>
                <Link href="/fractionalize" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Fractionalize
                </Link>
                <Link href="/portfolio" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Portfolio
                </Link>
                <Link href="/learn" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  Learn
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <Link href="/browse" className="hover:text-white flex items-center space-x-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-slate-800 rounded-lg overflow-hidden mb-6">
              <div className="relative h-96 bg-slate-700">
                {property.images && property.images.length > 0 ? (
                  <Image
                    src={property.images[currentImageIndex]}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority={currentImageIndex === 0}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Building2 className="w-24 h-24 text-gray-400" />
                  </div>
                )}
                
                {/* Navigation Arrows - Only show if there are multiple images */}
                {property.images && property.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  </>
                )}
              </div>
              
              {/* Thumbnail Strip - Only show if there are multiple images */}
              {property.images && property.images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 bg-slate-700 rounded overflow-hidden hover:bg-slate-600 transition-colors ${
                        currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          📷 {index + 1}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-white font-medium">{property.rating}</span>
                      <span className="text-gray-400 ml-1">({property.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm capitalize">
                  {property.type}
                </span>
                {property.isFractionalized && (
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center space-x-1">
                    <Gem className="w-3 h-3" />
                    <span>Fractionalized</span>
                  </span>
                )}
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                  ✓ Active
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{property.size} sqm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Built {property.yearBuilt}</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Tabs */}
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="border-b border-slate-700">
                <div className="flex">
                  {[
                    { key: 'overview', label: 'Overview' },
                    { key: 'details', label: 'Details' },
                    { key: 'history', label: 'History' },
                    { key: 'ownership', label: 'Ownership' }
                  ].map((tab) => (
                    <button
                       key={tab.key}
                       onClick={() => setActiveTab(tab.key as 'overview' | 'details' | 'history' | 'ownership')}
                       className={`px-6 py-4 font-medium transition-colors ${
                         activeTab === tab.key
                           ? 'border-b-2 border-blue-500 text-blue-400'
                           : 'text-gray-400 hover:text-white'
                       }`}
                     >
                       {tab.label}
                     </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Amenities */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Amenities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2 text-gray-300">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Investment Metrics */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Investment Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-slate-700 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm">Monthly Rent</p>
                          <p className="text-xl font-bold text-white">${property.monthlyRent}</p>
                        </div>
                        <div className="bg-slate-700 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm">Occupancy Rate</p>
                          <p className="text-xl font-bold text-green-400">{property.occupancyRate}%</p>
                        </div>
                        <div className="bg-slate-700 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm">Property Tax</p>
                          <p className="text-xl font-bold text-white">${property.propertyTax}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Property Size</p>
                      <p className="text-xl font-semibold text-white">{property.size} sqm</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Bedrooms</p>
                      <p className="text-xl font-semibold text-white">{property.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Bathrooms</p>
                      <p className="text-xl font-semibold text-white">{property.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Year Built</p>
                      <p className="text-xl font-semibold text-white">{property.yearBuilt}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Property ID</p>
                      <p className="text-sm font-mono text-white">{property.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Owner</p>
                      <p className="text-sm font-mono text-white">{property.owner}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-4">
                    {property.history.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 pb-4">
                        <p className="font-semibold text-white mb-1">
                          {item.field === 'listed' ? 'Property Listed' : `Updated ${item.field}`}
                        </p>
                        {item.field !== 'listed' && (
                          <p className="text-sm text-gray-400">
                            {item.oldValue} → {item.newValue}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {item.timestamp.split('T')[0]} by {item.changedBy.slice(0, 8)}...
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'ownership' && (
                  <div className="space-y-4">
                    {property.ownershipHistory.map((item, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 pb-4">
                        <p className="font-semibold text-white mb-1">
                          Ownership Transfer
                        </p>
                        <p className="text-sm text-gray-400">
                          From: {item.from.slice(0, 8)}... → To: {item.to.slice(0, 8)}...
                        </p>
                        {item.salePrice > 0 && (
                          <p className="text-sm text-gray-400">
                            Price: {item.salePrice} HBAR
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {item.timestamp.split('T')[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Purchase */}
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white mb-2">
                  ${property.price.toLocaleString()}
                </p>
                <p className="text-gray-400">Total Property Value</p>
              </div>

              {property.isFractionalized ? (
                <div className="space-y-4">
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Share Price</span>
                      <span className="text-white font-semibold">${property.sharePrice}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Available Shares</span>
                      <span className="text-white font-semibold">{property.availableShares}/{property.totalShares}</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${((property.totalShares - property.availableShares) / property.totalShares) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    Buy Shares
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowOfferModal(true)}
                  disabled={!isConnected || isOwner}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  {!isConnected ? 'Connect Wallet to Make Offer' : isOwner ? 'You Own This Property' : 'Make Offer'}
                </button>
              )}
            </div>

            {/* Owner Actions */}
            {isConnected && isOwner && (
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Owner Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                    <span>Edit Property</span>
                  </button>
                  {!property.isFractionalized && (
                    <button className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                      <TrendingUp className="w-4 h-4" />
                      <span>Fractionalize</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Property Stats */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Property Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Listed Date</span>
                  <span className="text-white">{property.listedTime.split('T')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Property Type</span>
                  <span className="text-white capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-blue-400">Blockchain Verified</h3>
              </div>
              <p className="text-sm text-blue-200">
                This property is permanently stored on the Hedera blockchain. All transactions and ownership changes are immutably recorded and publicly verifiable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Make Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Make an Offer</h2>
              <button
                onClick={() => setShowOfferModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleOfferSubmit} className="space-y-4">
              {/* Property Info */}
              <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-white text-sm mb-1">{property.title}</h3>
                <p className="text-gray-400 text-sm">Listed at ${property.price.toLocaleString()}</p>
              </div>

              {/* Offer Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                  Offer Amount *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={offerData.amount}
                    onChange={handleOfferChange}
                    min={property.price * 0.5}
                    step="1000"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      offerErrors.amount ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder="Enter your offer amount"
                  />
                </div>
                {offerErrors.amount && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {offerErrors.amount}
                  </p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  Minimum offer: ${(property.price * 0.5).toLocaleString()}
                </p>
              </div>

              {/* Valid Until */}
              <div>
                <label htmlFor="validUntil" className="block text-sm font-medium text-gray-300 mb-2">
                  Offer Valid Until *
                </label>
                <input
                  type="datetime-local"
                  id="validUntil"
                  name="validUntil"
                  value={offerData.validUntil}
                  onChange={handleOfferChange}
                  min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    offerErrors.validUntil ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                {offerErrors.validUntil && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {offerErrors.validUntil}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={offerData.message}
                  onChange={handleOfferChange}
                  rows={3}
                  maxLength={500}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    offerErrors.message ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Add a personal message to the seller..."
                />
                {offerErrors.message && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {offerErrors.message}
                  </p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  {offerData.message.length}/500 characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingOffer}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {isSubmittingOffer ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Offer'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

