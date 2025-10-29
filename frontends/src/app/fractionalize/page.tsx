"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import Logo from "../../components/Logo";
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  Coins,
  PieChart,
  Calculator,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  DollarSign,
  Info,
  Zap,
  Globe,
  Lock,
  Sparkles,
  User,
  Search,
  Filter,
  ChevronRight,
  Plus,
  Percent,
  Calendar,
  Target,
  Award,
  Lightbulb,
  TrendingDown,
  BarChart3,
  Wallet,
  AlertCircle
} from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  type: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  owner: string;
  roi: number;
  occupancyRate: number;
  isEligible: boolean;
  minInvestment: number;
  totalShares: number;
  availableShares: number;
}

interface FractionalizationStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function FractionalizePage() {
  const { isConnected } = useAppKitAccount();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);
  const [investmentSuccess, setInvestmentSuccess] = useState(false);
  const [investmentError, setInvestmentError] = useState("");

  // Handle investment process
  const handleInvestment = async () => {
    if (!selectedProperty || !investmentAmount || !isConnected) return;
    
    setIsInvesting(true);
    setInvestmentError("");
    
    try {
      // Simulate investment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would interact with smart contracts
      console.log(`Investing ₦${investmentAmount} in ${selectedProperty.title}`);
      
      setInvestmentSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSelectedProperty(null);
        setInvestmentAmount("");
        setInvestmentSuccess(false);
      }, 3000);
      
    } catch (error) {
      setInvestmentError("Investment failed. Please try again.");
      console.error("Investment error:", error);
    } finally {
      setIsInvesting(false);
    }
  };

  const properties: Property[] = [
    {
      id: "1",
      title: "Luxury Apartment Complex - Victoria Island",
      location: "Victoria Island, Lagos",
      price: 450000000,
      currency: "NGN",
      type: "Apartment Complex",
      size: 5000,
      bedrooms: 24,
      bathrooms: 36,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      owner: "0x1234...5678",
      roi: 12.5,
      occupancyRate: 95,
      isEligible: true,
      minInvestment: 1000000,
      totalShares: 4500,
      availableShares: 2800
    },
    {
      id: "2",
      title: "Commercial Office Building - Ikoyi",
      location: "Ikoyi, Lagos",
      price: 850000000,
      currency: "NGN",
      type: "Commercial",
      size: 8000,
      bedrooms: 0,
      bathrooms: 20,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      owner: "0x9876...5432",
      roi: 15.2,
      occupancyRate: 88,
      isEligible: true,
      minInvestment: 2000000,
      totalShares: 8500,
      availableShares: 5200
    },
    {
      id: "3",
      title: "Residential Estate - Lekki Phase 1",
      location: "Lekki Phase 1, Lagos",
      price: 320000000,
      currency: "NGN",
      type: "Residential Estate",
      size: 3200,
      bedrooms: 16,
      bathrooms: 20,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      owner: "0x5555...7777",
      roi: 10.8,
      occupancyRate: 92,
      isEligible: true,
      minInvestment: 500000,
      totalShares: 3200,
      availableShares: 1800
    }
  ];

  const steps: FractionalizationStep[] = [
    {
      id: 1,
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to get started",
      icon: <Wallet className="w-6 h-6" />,
      completed: isConnected
    },
    {
      id: 2,
      title: "Select Property",
      description: "Choose a property to fractionalize or invest in",
      icon: <Building2 className="w-6 h-6" />,
      completed: selectedProperty !== null
    },
    {
      id: 3,
      title: "Configure Investment",
      description: "Set your investment amount and terms",
      icon: <Calculator className="w-6 h-6" />,
      completed: investmentAmount !== ""
    },
    {
      id: 4,
      title: "Complete Transaction",
      description: "Finalize your fractional ownership",
      icon: <CheckCircle className="w-6 h-6" />,
      completed: false
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || property.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType && property.isEligible;
  });

  const calculateShares = (amount: number, property: Property) => {
    const pricePerShare = property.price / property.totalShares;
    return Math.floor(amount / pricePerShare);
  };

  const calculateROI = (amount: number, property: Property) => {
    return (amount * property.roi) / 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Logo variant="compact" width={120} height={32} />
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/browse" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Properties
                </Link>
                <Link href="/fractionalize" className="text-blue-400 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors">
                  Fractionalize
                </Link>
                <Link href="/portfolio" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Portfolio
                </Link>
                <Link href="/learn" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
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

      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <PieChart className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Fractional Ownership</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Own a Piece of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Premium Real Estate
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Invest in high-value properties with fractional ownership. Start with as little as ₦500,000 
              and earn passive income from premium real estate across Africa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Low Entry Barrier</h3>
                <p className="text-gray-400 text-sm">Start investing with minimal capital requirements</p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Passive Income</h3>
                <p className="text-gray-400 text-sm">Earn regular dividends from rental income</p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Blockchain Security</h3>
                <p className="text-gray-400 text-sm">Transparent and secure ownership records</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  step.completed ? "text-green-400" : "text-gray-400"
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step.completed 
                      ? "bg-green-500/20 border-green-500" 
                      : "bg-slate-800 border-slate-600"
                  }`}>
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : step.icon}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    step.completed ? "bg-green-500" : "bg-slate-600"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg mb-8 max-w-md">
            <button
              onClick={() => setActiveTab("browse")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "browse"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Browse Properties
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "calculator"
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              ROI Calculator
            </button>
          </div>

          {/* Browse Properties Tab */}
          {activeTab === "browse" && (
            <div>
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="pl-10 pr-8 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 appearance-none"
                  >
                    <option value="all">All Types</option>
                    <option value="apartment">Apartments</option>
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                  </select>
                </div>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-750 transition-colors group">
                    <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
                      {property.image ? (
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                      )}
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                          Available
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                          <div className="flex items-center space-x-1 text-white text-sm">
                            <TrendingUp className="w-3 h-3 text-green-400" />
                            <span>{property.roi}% ROI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-400 text-sm font-medium">{property.type}</span>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-white text-sm">{property.occupancyRate}%</span>
                        </div>
                      </div>
                      
                      <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {property.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4">
                        {property.location}
                      </p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total Value</span>
                          <span className="text-white font-medium">
                            ₦{property.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Min Investment</span>
                          <span className="text-white font-medium">
                            ₦{property.minInvestment.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Available Shares</span>
                          <span className="text-white font-medium">
                            {property.availableShares}/{property.totalShares}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ 
                            width: `${((property.totalShares - property.availableShares) / property.totalShares) * 100}%` 
                          }}
                        />
                      </div>
                      
                      <button 
                        onClick={() => setSelectedProperty(property)}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Coins className="w-4 h-4" />
                        <span>Invest Now</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROI Calculator Tab */}
          {activeTab === "calculator" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Investment Calculator</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Select Property</label>
                      <select
                        value={selectedProperty?.id || ""}
                        onChange={(e) => {
                          const property = properties.find(p => p.id === e.target.value);
                          setSelectedProperty(property || null);
                        }}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="">Choose a property</option>
                        {properties.map(property => (
                          <option key={property.id} value={property.id}>
                            {property.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Investment Amount (₦)</label>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    
                    {selectedProperty && investmentAmount && (
                      <div className="bg-slate-700 rounded-lg p-6 space-y-4">
                        <h3 className="text-white font-semibold">Investment Summary</h3>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Shares Acquired</span>
                            <span className="text-white">
                              {calculateShares(Number(investmentAmount), selectedProperty)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Ownership %</span>
                            <span className="text-white">
                              {((calculateShares(Number(investmentAmount), selectedProperty) / selectedProperty.totalShares) * 100).toFixed(2)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Annual ROI</span>
                            <span className="text-green-400 font-medium">
                              ₦{calculateROI(Number(investmentAmount), selectedProperty).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Monthly Income</span>
                            <span className="text-green-400 font-medium">
                              ₦{(calculateROI(Number(investmentAmount), selectedProperty) / 12).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Investment Benefits</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <div className="text-white font-medium">Passive Income</div>
                          <div className="text-gray-400 text-sm">Earn monthly rental income</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <div className="text-white font-medium">Capital Appreciation</div>
                          <div className="text-gray-400 text-sm">Benefit from property value growth</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <div className="text-white font-medium">Liquidity</div>
                          <div className="text-gray-400 text-sm">Trade shares on secondary market</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <div className="text-white font-medium">Transparency</div>
                          <div className="text-gray-400 text-sm">Blockchain-verified ownership</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Investment Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Invest in {selectedProperty.title}</h2>
                <button 
                  onClick={() => setSelectedProperty(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="text-gray-400 text-sm">Total Value</div>
                  <div className="text-white font-semibold">₦{selectedProperty.price.toLocaleString()}</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="text-gray-400 text-sm">Expected ROI</div>
                  <div className="text-green-400 font-semibold">{selectedProperty.roi}%</div>
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Investment Amount (₦)</label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min={selectedProperty.minInvestment}
                  placeholder={`Minimum ₦${selectedProperty.minInvestment.toLocaleString()}`}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              
              {investmentAmount && Number(investmentAmount) >= selectedProperty.minInvestment && (
                <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shares</span>
                    <span className="text-white">{calculateShares(Number(investmentAmount), selectedProperty)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ownership</span>
                    <span className="text-white">
                      {((calculateShares(Number(investmentAmount), selectedProperty) / selectedProperty.totalShares) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Annual Income</span>
                    <span className="text-green-400">₦{calculateROI(Number(investmentAmount), selectedProperty).toLocaleString()}</span>
                  </div>
                </div>
              )}
              
              {investmentError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{investmentError}</span>
                  </div>
                </div>
              )}
              
              {investmentSuccess && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Investment successful! Welcome to property ownership.</span>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    setInvestmentAmount("");
                    setInvestmentError("");
                    setInvestmentSuccess(false);
                  }}
                  disabled={isInvesting}
                  className="flex-1 border border-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvestment}
                  disabled={!isConnected || !investmentAmount || Number(investmentAmount) < selectedProperty.minInvestment || isInvesting || investmentSuccess}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isInvesting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : investmentSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Invested!</span>
                    </>
                  ) : (
                    <span>{!isConnected ? "Connect Wallet" : "Invest Now"}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of investors who are building wealth through fractional real estate ownership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/learn" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>Learn More</span>
            </Link>
            <Link href="/browse" className="border border-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Browse Properties</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}