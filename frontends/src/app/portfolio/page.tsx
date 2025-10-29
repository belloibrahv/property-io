"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import Logo from "../../components/Logo";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Calendar,
  MapPin,
  Star,
  Eye,
  Plus,
  Filter,
  Search,
  BarChart3,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Clock,
  Target,
  Award,
  Zap,
  User,
  Settings,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";

interface PortfolioProperty {
  id: number;
  title: string;
  location: string;
  type: string;
  image: string;
  totalValue: number;
  investedAmount: number;
  shares: number;
  totalShares: number;
  currentPrice: number;
  purchasePrice: number;
  roi: number;
  monthlyIncome: number;
  occupancyRate: number;
  purchaseDate: string;
  status: 'active' | 'pending' | 'sold';
  performance: 'up' | 'down' | 'stable';
}

interface PortfolioStats {
  totalInvested: number;
  currentValue: number;
  totalROI: number;
  monthlyIncome: number;
  totalProperties: number;
  totalShares: number;
  averageROI: number;
  bestPerformer: string;
  worstPerformer: string;
}

export default function PortfolioPage() {
  const { isConnected } = useAppKitAccount();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("value");

  // Mock portfolio data - in real app, this would come from API/blockchain
  const portfolioStats: PortfolioStats = {
    totalInvested: 2500000,
    currentValue: 2875000,
    totalROI: 15.2,
    monthlyIncome: 45000,
    totalProperties: 8,
    totalShares: 1250,
    averageROI: 12.8,
    bestPerformer: "Lagos Marina Towers",
    worstPerformer: "Abuja Estate Villa"
  };

  const portfolioProperties: PortfolioProperty[] = [
    {
      id: 1,
      title: "Lagos Marina Towers",
      location: "Victoria Island, Lagos",
      type: "apartment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      totalValue: 45000000,
      investedAmount: 500000,
      shares: 125,
      totalShares: 10000,
      currentPrice: 4800,
      purchasePrice: 4000,
      roi: 18.5,
      monthlyIncome: 8500,
      occupancyRate: 95,
      purchaseDate: "2024-01-15",
      status: 'active',
      performance: 'up'
    },
    {
      id: 2,
      title: "Abuja Central Plaza",
      location: "Maitama, Abuja",
      type: "commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      totalValue: 65000000,
      investedAmount: 750000,
      shares: 200,
      totalShares: 15000,
      currentPrice: 4350,
      purchasePrice: 3750,
      roi: 16.2,
      monthlyIncome: 12500,
      occupancyRate: 88,
      purchaseDate: "2024-02-20",
      status: 'active',
      performance: 'up'
    },
    {
      id: 3,
      title: "Port Harcourt Gardens",
      location: "GRA, Port Harcourt",
      type: "residential",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      totalValue: 28000000,
      investedAmount: 350000,
      shares: 100,
      totalShares: 8000,
      currentPrice: 3600,
      purchasePrice: 3500,
      roi: 8.2,
      monthlyIncome: 4200,
      occupancyRate: 92,
      purchaseDate: "2024-03-10",
      status: 'active',
      performance: 'stable'
    },
    {
      id: 4,
      title: "Kano Industrial Complex",
      location: "Kano State",
      type: "industrial",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      totalValue: 85000000,
      investedAmount: 900000,
      shares: 300,
      totalShares: 20000,
      currentPrice: 2950,
      purchasePrice: 3000,
      roi: -1.8,
      monthlyIncome: 15000,
      occupancyRate: 78,
      purchaseDate: "2024-04-05",
      status: 'active',
      performance: 'down'
    }
  ];

  const filteredProperties = portfolioProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "value":
        return b.investedAmount - a.investedAmount;
      case "roi":
        return b.roi - a.roi;
      case "income":
        return b.monthlyIncome - a.monthlyIncome;
      case "date":
        return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
      default:
        return 0;
    }
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Navigation */}
        <nav className="bg-slate-800 border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2">
                  <Logo variant="compact" width={120} height={32} />
                </Link>
                <div className="hidden md:flex space-x-6">
                  <Link href="/browse" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                    Browse
                  </Link>
                  <Link href="/fractionalize" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                    Invest
                  </Link>
                  <Link href="/portfolio" className="text-white px-3 py-2 text-sm font-medium border-b-2 border-blue-500">
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

        {/* Connect Wallet Prompt */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
              <Wallet className="w-12 h-12 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Connect your wallet to view your property portfolio, track investments, and manage your real estate assets on the blockchain.
            </p>
            <div className="bg-slate-800 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">Portfolio Features</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Track investment performance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Monitor monthly income</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>View property analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Manage your shares</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Logo variant="compact" width={120} height={32} />
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/browse" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Browse
                </Link>
                <Link href="/fractionalize" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Invest
                </Link>
                <Link href="/portfolio" className="text-white px-3 py-2 text-sm font-medium border-b-2 border-blue-500">
                  Portfolio
                </Link>
                <Link href="/learn" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Learn
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Portfolio</h1>
            <p className="text-gray-400">Track and manage your property investments</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Investment</span>
            </button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+{portfolioStats.totalROI}%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Portfolio Value</p>
            <p className="text-2xl font-bold">₦{portfolioStats.currentValue.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Invested: ₦{portfolioStats.totalInvested.toLocaleString()}</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+8.2%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Monthly Income</p>
            <p className="text-2xl font-bold">₦{portfolioStats.monthlyIncome.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Avg ROI: {portfolioStats.averageROI}%</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Properties</p>
            <p className="text-2xl font-bold">{portfolioStats.totalProperties}</p>
            <p className="text-sm text-gray-400">{portfolioStats.totalShares} total shares</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Best Performer</p>
            <p className="text-lg font-bold truncate">{portfolioStats.bestPerformer}</p>
            <p className="text-sm text-green-400">+18.5% ROI</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-800 rounded-lg p-1 mb-6">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "properties", label: "Properties", icon: Building2 },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
            { id: "transactions", label: "Transactions", icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "properties" && (
          <div>
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="value">Sort by Value</option>
                  <option value="roi">Sort by ROI</option>
                  <option value="income">Sort by Income</option>
                  <option value="date">Sort by Date</option>
                </select>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedProperties.map((property) => (
                <div key={property.id} className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-750 transition-colors">
                  <div className="flex">
                    <div className="relative w-48 h-32 flex-shrink-0">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="192px"
                      />
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.status === 'active' ? 'bg-green-600 text-white' :
                          property.status === 'pending' ? 'bg-yellow-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {property.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-white mb-1">{property.title}</h3>
                          <div className="flex items-center text-gray-400 text-sm">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{property.location}</span>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 ${
                          property.performance === 'up' ? 'text-green-400' :
                          property.performance === 'down' ? 'text-red-400' :
                          'text-gray-400'
                        }`}>
                          {property.performance === 'up' ? <ArrowUpRight className="w-4 h-4" /> :
                           property.performance === 'down' ? <ArrowDownRight className="w-4 h-4" /> :
                           <div className="w-4 h-4" />}
                          <span className="text-sm font-medium">{property.roi > 0 ? '+' : ''}{property.roi}%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Invested</p>
                          <p className="font-medium">₦{property.investedAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Monthly Income</p>
                          <p className="font-medium">₦{property.monthlyIncome.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Shares</p>
                          <p className="font-medium">{property.shares} / {property.totalShares}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Occupancy</p>
                          <p className="font-medium">{property.occupancyRate}%</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-xs text-gray-400">
                          Purchased: {new Date(property.purchaseDate).toLocaleDateString()}
                        </div>
                        <Link
                          href={`/property/${property.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Details</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Performance Chart Placeholder */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Portfolio Performance</h3>
              <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Performance chart will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { type: "income", property: "Lagos Marina Towers", amount: 8500, date: "2024-01-15" },
                  { type: "purchase", property: "Abuja Central Plaza", amount: 750000, date: "2024-01-10" },
                  { type: "income", property: "Port Harcourt Gardens", amount: 4200, date: "2024-01-05" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'income' ? 'bg-green-600' : 'bg-blue-600'
                      }`}>
                        {activity.type === 'income' ? <DollarSign className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{activity.type === 'income' ? 'Income Received' : 'Investment Made'}</p>
                        <p className="text-sm text-gray-400">{activity.property}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${activity.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                        {activity.type === 'income' ? '+' : ''}₦{activity.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Portfolio Analytics</h3>
            <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">Advanced analytics coming soon</p>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
            <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">Transaction history will be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}