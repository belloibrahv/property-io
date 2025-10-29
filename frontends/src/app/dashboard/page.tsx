"use client";

import Link from "next/link";
import { useAppKitAccount } from "@reown/appkit/react";
import { usePropertyOperations, useTokenBalances, useNetworkStats } from "../../hooks/useMirrorNode";
import { useState, useEffect } from "react";
import Logo from "../../components/Logo";
import { 
  Home, 
  Plus, 
  TrendingUp, 
  Activity, 
  Wallet, 
  Eye, 
  Edit, 
  Share2, 
  Calendar,
  DollarSign,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  MapPin,
  Star,
  Shield,
  User,
  Bell,
  Settings,
  Search,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Target,
  Award,
  Clock,
  Globe,
  ChevronRight,
  TrendingDown
} from "lucide-react";

export default function Dashboard() {
  const { isConnected, address } = useAppKitAccount();
  const { operations, loading: operationsLoading } = usePropertyOperations(address || null);
  const { balances, loading: balancesLoading } = useTokenBalances(address || null);
  const { stats: networkStats, loading: networkLoading } = useNetworkStats();
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  // Enhanced portfolio stats with real-time calculations
  const portfolioStats = {
    totalValue: balances.reduce((sum, balance) => sum + (balance.balance * 1000), 0) || 1250000,
    monthlyChange: 8.5,
    totalProperties: operations.filter(op => op.operation === 'list').length,
    totalShares: balances.reduce((sum, balance) => sum + balance.balance, 0),
    monthlyIncome: 12500,
    occupancyRate: 94,
    roi: 12.8,
    activeInvestments: operations.filter(op => op.operation === 'fractionalize').length
  };

  // Enhanced recent transactions with more details
  const recentTransactions = [
    { 
      id: 1,
      type: 'purchase', 
      amount: 50000, 
      property: 'Lagos Luxury Apartment', 
      date: '2024-01-20', 
      status: 'completed',
      shares: 25,
      location: 'Victoria Island, Lagos'
    },
    { 
      id: 2,
      type: 'sale', 
      amount: 25000, 
      property: 'Abuja Modern Villa', 
      date: '2024-01-18', 
      status: 'pending',
      shares: 12,
      location: 'Maitama, Abuja'
    },
    { 
      id: 3,
      type: 'dividend', 
      amount: 2500, 
      property: 'Victoria Island Complex', 
      date: '2024-01-15', 
      status: 'completed',
      shares: 50,
      location: 'Victoria Island, Lagos'
    }
  ];

  // Market insights data
  const marketInsights = [
    { title: 'Lagos Market Growth', value: '+15.2%', trend: 'up', description: 'Year over year' },
    { title: 'Average Yield', value: '8.5%', trend: 'up', description: 'Across all properties' },
    { title: 'Occupancy Rate', value: '94%', trend: 'stable', description: 'Portfolio average' },
    { title: 'New Listings', value: '23', trend: 'up', description: 'This month' }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 2000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Enhanced Navigation Header */}
        <nav className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50">
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
                  <Link href="/fractionalize" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                    Fractionalize
                  </Link>
                  <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors">
                    Dashboard
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Wallet className="w-16 h-16 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome to Your Dashboard
            </h1>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Connect your wallet to access your property portfolio, track investments, and manage your real estate assets on the blockchain with advanced analytics and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <Home className="w-5 h-5" />
                <span>Go to Home</span>
              </Link>
              <Link
                href="/browse"
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 border border-slate-600"
              >
                <Search className="w-5 h-5" />
                <span>Browse Properties</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <Link href="/browse" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Properties
                </Link>
                <Link href="/fractionalize" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Fractionalize
                </Link>
                <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                <Link href="/learn" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Learn
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleRefresh}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 text-gray-400 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
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
        {/* Enhanced Header with Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Portfolio Dashboard
              </h1>
              <p className="text-gray-400 mb-4">
                Track your real estate investments and manage your properties with advanced analytics
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>Network: {networkStats?.network_health || 'Healthy'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
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
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Portfolio Overview with Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+{portfolioStats.monthlyChange}%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Portfolio Value</p>
            <p className="text-3xl font-bold text-white mb-2">
              ${portfolioStats.totalValue.toLocaleString()}
            </p>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600/20 to-green-400/20 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex items-center space-x-1 text-blue-400">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Properties Owned</p>
            <p className="text-3xl font-bold text-white mb-2">
              {portfolioStats.totalProperties}
            </p>
            <p className="text-sm text-gray-400">
              {portfolioStats.activeInvestments} active investments
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-purple-400/20 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex items-center space-x-1 text-purple-400">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Fractional Shares</p>
            <p className="text-3xl font-bold text-white mb-2">
              {portfolioStats.totalShares.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              Across {portfolioStats.totalProperties} properties
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600/20 to-yellow-400/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+{portfolioStats.roi}%</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Monthly Income</p>
            <p className="text-3xl font-bold text-white mb-2">
              ${portfolioStats.monthlyIncome.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              ROI: {portfolioStats.roi}% annually
            </p>
          </div>
        </div>

        {/* Market Insights Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 mb-8 border border-slate-600/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-400" />
              Market Insights
            </h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">{insight.title}</p>
                  {insight.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : insight.trend === 'down' ? (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  ) : (
                    <Activity className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <p className="text-xl font-bold text-white mb-1">{insight.value}</p>
                <p className="text-xs text-gray-500">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced My Properties Section */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 mb-6 border border-slate-600/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Home className="w-6 h-6 mr-2 text-blue-400" />
                  My Properties
                </h2>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Filter className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Search className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <Link
                    href="/list-property"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1 bg-blue-600/10 hover:bg-blue-600/20 px-3 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New</span>
                  </Link>
                </div>
              </div>

              {operationsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading properties...</p>
                </div>
              ) : operations.filter(op => op.operation === 'list').length > 0 ? (
                <div className="space-y-4">
                  {operations.filter(op => op.operation === 'list').map((op, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-all duration-300 border border-slate-600/30 hover:border-blue-500/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                            <Building className="w-8 h-8 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white mb-1">
                              Property #{op.propertyId || 'Unknown'}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(op.timestamp).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Shield className="w-4 h-4 text-green-400" />
                                <span className="text-green-400">Verified</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span>4.8</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors group">
                            <Edit className="w-4 h-4 text-gray-400 group-hover:text-white" />
                          </button>
                          <button className="p-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors group">
                            <Share2 className="w-4 h-4 text-gray-400 group-hover:text-white" />
                          </button>
                          <Link
                            href={op.propertyId ? `/property/${op.propertyId}` : '#'}
                            className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Properties Yet</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Start building your real estate portfolio by listing your first property on the blockchain.
                  </p>
                  <Link
                    href="/list-property"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    <span>List Your First Property</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Recent Activity Sidebar */}
          <div className="space-y-6">
            {/* Recent Transactions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-400" />
                  Recent Activity
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          tx.type === 'purchase' ? 'bg-green-600/20' :
                          tx.type === 'sale' ? 'bg-blue-600/20' : 'bg-yellow-600/20'
                        }`}>
                          {tx.type === 'purchase' ? (
                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                          ) : tx.type === 'sale' ? (
                            <ArrowDownRight className="w-4 h-4 text-blue-400" />
                          ) : (
                            <DollarSign className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{tx.property}</p>
                          <p className="text-gray-400 text-xs flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{tx.location}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold text-sm">
                          ${tx.amount.toLocaleString()}
                        </p>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'completed' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                        }`}>
                          {tx.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{tx.shares} shares</span>
                      <span>{new Date(tx.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600/50">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/list-property"
                  className="w-full flex items-center space-x-3 bg-slate-700/50 hover:bg-slate-700 p-3 rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-white group-hover:text-blue-400 transition-colors">List New Property</span>
                </Link>
                <Link
                  href="/browse"
                  className="w-full flex items-center space-x-3 bg-slate-700/50 hover:bg-slate-700 p-3 rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-white group-hover:text-green-400 transition-colors">Browse Properties</span>
                </Link>
                <button className="w-full flex items-center space-x-3 bg-slate-700/50 hover:bg-slate-700 p-3 rounded-lg transition-colors group">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-white group-hover:text-purple-400 transition-colors">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

