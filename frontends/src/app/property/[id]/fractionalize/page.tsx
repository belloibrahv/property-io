"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useAppKitAccount } from "@reown/appkit/react";
import Logo from "@/components/Logo";
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  TrendingUp, 
  Shield, 
  Calculator, 
  DollarSign, 
  PieChart, 
  Clock, 
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Globe,
  Lock,
  Sparkles,
  User,
  Calendar,
  Percent,
  Award,
  BarChart3,
  Coins,
  FileText,
  Eye,
  Download,
  Share2,
  Heart,
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  Star
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
  description: string;
  amenities: string[];
  roi: number;
  occupancyRate: number;
  yearBuilt: number;
  listedTime: string;
}

export default function FractionalizePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { isConnected } = useAppKitAccount();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    totalShares: "",
    pricePerShare: "",
    minimumShares: "",
    lockupPeriod: "",
    dividendFrequency: "monthly",
    managementFee: "2",
    expectedROI: "",
    investmentGoal: "",
    offeringType: "public"
  });

  // Mock property data - in real app, fetch based on resolvedParams.id
  const property: Property = {
    id: resolvedParams.id,
    title: "Luxury Apartment Complex - Victoria Island",
    location: "Victoria Island, Lagos, Nigeria",
    price: 450000000,
    currency: "NGN",
    type: "Apartment Complex",
    size: 5000,
    bedrooms: 24,
    bathrooms: 36,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    owner: "0x1234...5678",
    description: "Premium luxury apartment complex in the heart of Victoria Island featuring modern amenities, 24/7 security, and stunning ocean views.",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Generator", "Elevator", "Garden", "Playground"],
    roi: 12.5,
    occupancyRate: 95,
    yearBuilt: 2020,
    listedTime: "2024-01-15T10:30:00Z"
  };

  const steps = [
    { id: 1, title: "Property Details", description: "Review property information" },
    { id: 2, title: "Share Configuration", description: "Set up fractional shares" },
    { id: 3, title: "Investment Terms", description: "Define investment parameters" },
    { id: 4, title: "Legal & Compliance", description: "Complete documentation" },
    { id: 5, title: "Launch", description: "Deploy fractionalization" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fractionalization data:", formData);
    // Handle form submission
  };

  const calculateTotalValue = () => {
    return Number(formData.totalShares) * Number(formData.pricePerShare);
  };

  const calculateMinInvestment = () => {
    return Number(formData.minimumShares) * Number(formData.pricePerShare);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={`/property/${resolvedParams.id}`} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Property</span>
            </Link>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Logo variant="compact" width={120} height={32} />
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <PieChart className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Fractionalize Property</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create Fractional
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Ownership Shares
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Transform your property into tradeable shares and unlock liquidity while maintaining ownership control
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  activeStep >= step.id ? "text-purple-400" : "text-gray-400"
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    activeStep >= step.id 
                      ? "bg-purple-500/20 border-purple-500" 
                      : "bg-slate-800 border-slate-600"
                  }`}>
                    {activeStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    activeStep > step.id ? "bg-purple-500" : "bg-slate-600"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Property Details */}
            {activeStep === 1 && (
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Building2 className="w-6 h-6 text-blue-400" />
                  <span>Property Overview</span>
                </h2>

                <div className="space-y-6">
                  <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                        Ready to Fractionalize
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-2">{property.title}</h3>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-700 rounded-lg p-4 text-center">
                      <Home className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">{property.type}</div>
                      <div className="text-gray-400 text-sm">Property Type</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4 text-center">
                      <Square className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">{property.size.toLocaleString()} sqft</div>
                      <div className="text-gray-400 text-sm">Total Area</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4 text-center">
                      <Bed className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">{property.bedrooms}</div>
                      <div className="text-gray-400 text-sm">Bedrooms</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4 text-center">
                      <Bath className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">{property.bathrooms}</div>
                      <div className="text-gray-400 text-sm">Bathrooms</div>
                    </div>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4">Property Valuation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-purple-400">₦{property.price.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">Current Market Value</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400">{property.roi}%</div>
                        <div className="text-gray-400 text-sm">Expected Annual ROI</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{property.occupancyRate}%</div>
                        <div className="text-gray-400 text-sm">Occupancy Rate</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStep(2)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                  >
                    Continue to Share Configuration
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Share Configuration */}
            {activeStep === 2 && (
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <PieChart className="w-6 h-6 text-purple-400" />
                  <span>Share Configuration</span>
                </h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Total Shares</label>
                      <input
                        type="number"
                        name="totalShares"
                        value={formData.totalShares}
                        onChange={handleInputChange}
                        placeholder="e.g., 4500"
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        required
                      />
                      <p className="text-gray-400 text-sm mt-1">Total number of shares to create</p>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Price per Share (₦)</label>
                      <input
                        type="number"
                        name="pricePerShare"
                        value={formData.pricePerShare}
                        onChange={handleInputChange}
                        placeholder="e.g., 100000"
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        required
                      />
                      <p className="text-gray-400 text-sm mt-1">Individual share price</p>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Minimum Shares per Investor</label>
                      <input
                        type="number"
                        name="minimumShares"
                        value={formData.minimumShares}
                        onChange={handleInputChange}
                        placeholder="e.g., 10"
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        required
                      />
                      <p className="text-gray-400 text-sm mt-1">Minimum investment threshold</p>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Investment Goal (₦)</label>
                      <input
                        type="number"
                        name="investmentGoal"
                        value={formData.investmentGoal}
                        onChange={handleInputChange}
                        placeholder="e.g., 300000000"
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        required
                      />
                      <p className="text-gray-400 text-sm mt-1">Target funding amount</p>
                    </div>
                  </div>

                  {formData.totalShares && formData.pricePerShare && (
                    <div className="bg-slate-700 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-4">Share Structure Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-purple-400">
                            ₦{calculateTotalValue().toLocaleString()}
                          </div>
                          <div className="text-gray-400 text-sm">Total Value</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-400">
                            {formData.totalShares}
                          </div>
                          <div className="text-gray-400 text-sm">Total Shares</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-400">
                            ₦{Number(formData.pricePerShare).toLocaleString()}
                          </div>
                          <div className="text-gray-400 text-sm">Per Share</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-pink-400">
                            ₦{calculateMinInvestment().toLocaleString()}
                          </div>
                          <div className="text-gray-400 text-sm">Min Investment</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="flex-1 border border-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    >
                      Continue to Terms
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Investment Terms */}
            {activeStep === 3 && (
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <span>Investment Terms</span>
                </h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Lock-up Period (months)</label>
                      <input
                        type="number"
                        name="lockupPeriod"
                        value={formData.lockupPeriod}
                        onChange={handleInputChange}
                        placeholder="e.g., 12"
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        required
                      />
                      <p className="text-gray-400 text-sm mt-1">Minimum holding period</p>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Expected ROI (%)</label>
                      <input
                        type="number"
                        name="expectedROI"
                        value={formData.expectedROI}
                        onChange={handleInputChange}
                        placeholder="e.g., 12.5"
                        step="0.1"
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        required
                      />
                      <p className="text-gray-400 text-sm mt-1">Annual return on investment</p>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Dividend Frequency</label>
                      <select
                        name="dividendFrequency"
                        value={formData.dividendFrequency}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="semi-annually">Semi-Annually</option>
                        <option value="annually">Annually</option>
                      </select>
                      <p className="text-gray-400 text-sm mt-1">How often dividends are distributed</p>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Management Fee (%)</label>
                      <input
                        type="number"
                        name="managementFee"
                        value={formData.managementFee}
                        onChange={handleInputChange}
                        placeholder="e.g., 2"
                        step="0.1"
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        required
                      />
                      <p className="text-gray-400 text-sm mt-1">Annual management fee</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Offering Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 bg-slate-700 p-4 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
                        <input
                          type="radio"
                          name="offeringType"
                          value="public"
                          checked={formData.offeringType === "public"}
                          onChange={handleInputChange}
                          className="text-purple-500"
                        />
                        <div>
                          <div className="text-white font-medium">Public Offering</div>
                          <div className="text-gray-400 text-sm">Open to all investors</div>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 bg-slate-700 p-4 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
                        <input
                          type="radio"
                          name="offeringType"
                          value="private"
                          checked={formData.offeringType === "private"}
                          onChange={handleInputChange}
                          className="text-purple-500"
                        />
                        <div>
                          <div className="text-white font-medium">Private Offering</div>
                          <div className="text-gray-400 text-sm">Invitation only</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="flex-1 border border-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(4)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    >
                      Continue to Legal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Legal & Compliance */}
            {activeStep === 4 && (
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <span>Legal & Compliance</span>
                </h2>

                <div className="space-y-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <div className="text-blue-400 font-medium">Legal Requirements</div>
                        <div className="text-gray-300 text-sm mt-1">
                          Ensure all legal documentation is complete before launching your fractionalized property offering.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">Property Title Deed</div>
                          <div className="text-gray-400 text-sm">Verified ownership documentation</div>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>

                    <div className="flex items-center justify-between bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">Property Valuation Report</div>
                          <div className="text-gray-400 text-sm">Professional assessment completed</div>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>

                    <div className="flex items-center justify-between bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">Regulatory Compliance</div>
                          <div className="text-gray-400 text-sm">SEC registration pending</div>
                        </div>
                      </div>
                      <Clock className="w-5 h-5 text-yellow-400" />
                    </div>

                    <div className="flex items-center justify-between bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">Smart Contract Audit</div>
                          <div className="text-gray-400 text-sm">Security verification required</div>
                        </div>
                      </div>
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <div className="text-yellow-400 font-medium">Action Required</div>
                        <div className="text-gray-300 text-sm mt-1">
                          Complete smart contract audit and regulatory compliance before proceeding to launch.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="flex-1 border border-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(5)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    >
                      Continue to Launch
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Launch */}
            {activeStep === 5 && (
              <div className="bg-slate-800 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">Ready to Launch!</h2>
                <p className="text-gray-300 mb-8">
                  Your property fractionalization is configured and ready to deploy. 
                  Review all details before launching to investors.
                </p>

                <div className="bg-slate-700 rounded-lg p-6 mb-8">
                  <h3 className="text-white font-semibold mb-4">Launch Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <div className="text-gray-400">Total Shares</div>
                      <div className="text-white font-medium">{formData.totalShares || "N/A"}</div>
                    </div>
                    <div className="text-left">
                      <div className="text-gray-400">Price per Share</div>
                      <div className="text-white font-medium">₦{Number(formData.pricePerShare).toLocaleString() || "N/A"}</div>
                    </div>
                    <div className="text-left">
                      <div className="text-gray-400">Expected ROI</div>
                      <div className="text-white font-medium">{formData.expectedROI || "N/A"}%</div>
                    </div>
                    <div className="text-left">
                      <div className="text-gray-400">Lock-up Period</div>
                      <div className="text-white font-medium">{formData.lockupPeriod || "N/A"} months</div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className="flex-1 border border-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isConnected}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!isConnected ? "Connect Wallet to Launch" : "Launch Fractionalization"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Card */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Property Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current Value</span>
                  <span className="text-white font-medium">₦{property.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Expected ROI</span>
                  <span className="text-green-400 font-medium">{property.roi}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Occupancy Rate</span>
                  <span className="text-blue-400 font-medium">{property.occupancyRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Year Built</span>
                  <span className="text-white font-medium">{property.yearBuilt}</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Fractionalization Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <div className="text-sm">
                    <div className="text-white font-medium">Increased Liquidity</div>
                    <div className="text-gray-400">Enable easier trading of property shares</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <div className="text-sm">
                    <div className="text-white font-medium">Wider Investor Base</div>
                    <div className="text-gray-400">Attract more investors with lower barriers</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <div className="text-sm">
                    <div className="text-white font-medium">Passive Income</div>
                    <div className="text-gray-400">Regular dividend distributions</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <div className="text-sm">
                    <div className="text-white font-medium">Blockchain Security</div>
                    <div className="text-gray-400">Transparent ownership records</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Our team is here to guide you through the fractionalization process.
              </p>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

