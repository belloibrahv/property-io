"use client";

import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { useAccountInfo, useNetworkStats } from "../hooks/useMirrorNode";
import Link from "next/link";
import { 
  Home as HomeIcon, 
  Shield, 
  Coins, 
  Zap, 
  TrendingUp, 
  Users, 
  Globe, 
  CheckCircle,
  ArrowRight,
  BarChart3,
  Wallet,
  Building2,
  Star,
  Play
} from "lucide-react";
import Logo from "../components/Logo";

export default function Home() {
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();

  // Mirror Node hooks
  const { accountInfo, balance, loading: accountLoading } = useAccountInfo(address || null);
  const { stats, loading: statsLoading } = useNetworkStats();

  const handleConnect = async () => {
    if (!isConnected) {
      try {
        await open();
      } catch (error) {
        console.error("Connection error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <Logo variant="compact" width={120} height={32} />
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/browse" className="text-gray-300 hover:text-white transition-colors font-medium">Browse</Link>
          <Link href="/list-property" className="text-gray-300 hover:text-white transition-colors font-medium">List Property</Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors font-medium">Dashboard</Link>
          <Link href="/learn" className="text-gray-300 hover:text-white transition-colors font-medium">Learn</Link>
        </div>
        
        <button
          onClick={handleConnect}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          {isConnected ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Connected</span>
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        </div>
        
        <div className="relative z-10 px-6 py-32 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Africa's Leading Property Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
               Own a piece of 
               <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Africa&apos;s future</span>
             </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Invest in tokenized real estate with transparent, immutable records. Buy, sell, and manage fractional ownership 
              of properties across the continent with institutional-grade security.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={handleConnect}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center space-x-2 group"
              >
                {isConnected ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Wallet Connected</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Start Investing</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">$2.5M+</div>
              <div className="text-gray-400 font-medium">Total Value Locked</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">150+</div>
              <div className="text-gray-400 font-medium">Properties Listed</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">1,200+</div>
              <div className="text-gray-400 font-medium">Active Investors</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">25+</div>
              <div className="text-gray-400 font-medium">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Afrika Property Guardian?
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Experience the future of real estate investment with institutional-grade blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl text-center hover:from-slate-600 hover:to-slate-700 transition-all duration-300 border border-slate-600 group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Immutable Records</h3>
              <p className="text-gray-300 leading-relaxed">
                Every property transaction is permanently recorded on Hedera blockchain with complete transparency and institutional-grade security.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl text-center hover:from-slate-600 hover:to-slate-700 transition-all duration-300 border border-slate-600 group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Fractional Ownership</h3>
              <p className="text-gray-300 leading-relaxed">
                Own fractions of high-value properties starting from $10. Trade your shares anytime on our liquid marketplace with instant settlement.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-2xl text-center hover:from-slate-600 hover:to-slate-700 transition-all duration-300 border border-slate-600 group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Transfers</h3>
              <p className="text-gray-300 leading-relaxed">
                Transfer property ownership instantly with smart contracts. No paperwork, no delays, just secure and transparent transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">$2.5M+</div>
              <div className="text-gray-300">Total Value Locked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">150+</div>
              <div className="text-gray-300">Properties Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">1,200+</div>
              <div className="text-gray-300">Active Investors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-gray-300">Countries</div>
            </div>
          </div>
        </div>
      </div>

      <main className="px-6 py-12 max-w-7xl mx-auto">
        {/* Account Info */}
        {isConnected && address && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-12 border border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <Wallet className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Account Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Wallet Address</span>
                </h3>
                <p className="text-sm text-gray-300 font-mono break-all bg-slate-800 p-3 rounded-lg">{address}</p>
              </div>
              {accountLoading ? (
                <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-green-400" />
                    <span>Balance</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                    <p className="text-sm text-gray-300">Loading...</p>
                  </div>
                </div>
              ) : balance ? (
                <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-green-400" />
                    <span>Balance</span>
                  </h3>
                  <p className="text-2xl font-bold text-green-400">{balance} HBAR</p>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* Network Stats */}
        {statsLoading ? (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-12 border border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Network Status</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
              <p className="text-gray-300">Loading network statistics...</p>
            </div>
          </div>
        ) : stats ? (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-12 border border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Network Status</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-slate-700/50 p-6 rounded-xl text-center border border-slate-600">
                 <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                 <h3 className="text-lg font-semibold text-white mb-2">Total Transactions</h3>
                 <p className="text-3xl font-bold text-blue-400">{stats.totalTransactions?.toLocaleString() || 'N/A'}</p>
               </div>
               <div className="bg-slate-700/50 p-6 rounded-xl text-center border border-slate-600">
                 <Zap className="w-8 h-8 text-green-400 mx-auto mb-3" />
                 <h3 className="text-lg font-semibold text-white mb-2">Recent Activity</h3>
                 <p className="text-3xl font-bold text-green-400">{stats.recentActivity || 'N/A'}</p>
               </div>
               <div className="bg-slate-700/50 p-6 rounded-xl text-center border border-slate-600">
                 <Globe className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                 <h3 className="text-lg font-semibold text-white mb-2">Network Health</h3>
                 <p className="text-3xl font-bold text-purple-400 capitalize">{stats.networkHealth || 'Active'}</p>
               </div>
             </div>
          </div>
        ) : null}

        {/* How It Works */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-12 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Connect Your Wallet</h3>
              <p className="text-gray-300 leading-relaxed">Connect your Hedera-compatible wallet to start investing in tokenized properties with institutional-grade security.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Browse Properties</h3>
              <p className="text-gray-300 leading-relaxed">Explore verified properties across Africa with detailed information, professional photography, and transparent investment opportunities.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Invest & Trade</h3>
              <p className="text-gray-300 leading-relaxed">Buy fractional shares starting from $10 and trade them on our secure, liquid marketplace with instant settlement.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Investing?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of investors building wealth through tokenized real estate across Africa.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {!isConnected ? (
              <button
                onClick={handleConnect}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Connect Wallet to Start
              </button>
            ) : (
              <>
                <Link href="/browse" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                  Browse Properties
                </Link>
                <Link href="/list-property" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                  List Your Property
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Logo variant="compact" width={120} height={32} />
              </div>
              <p className="text-gray-300 text-sm">
                Revolutionizing real estate investment across Africa with blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/browse" className="hover:text-white transition-colors">Browse Properties</Link></li>
                <li><Link href="/list-property" className="hover:text-white transition-colors">List Property</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Afrika Property Guardian. Powered by Hedera Mirror Node.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
