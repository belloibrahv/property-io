"use client";

import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { useAccountInfo, useNetworkStats } from "../hooks/useMirrorNode";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-4">
            🏠 Afrika Property Guardian
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-8 text-gray-600 dark:text-gray-300 mb-8">
            Immutable Property Registry • Permanent Records • Fractional Ownership
          </p>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 mb-8">
            Store property listings permanently on Hedera blockchain. Track ownership history. Enable fractional investment from $10.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleConnect}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              {isConnected ? "✓ Wallet Connected" : "Connect Wallet"}
            </button>
            {isConnected && (
              <Link href="/list-property" className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-200 shadow-xl hover:shadow-2xl">
                List a Property
              </Link>
            )}
            <Link href="/browse" className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-xl hover:shadow-2xl">
              Browse Properties
            </Link>
          </div>
        </div>

        {/* Account Info */}
        {isConnected && address && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Account
            </h2>
            {accountLoading ? (
              <div className="animate-pulse">Loading account info...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Account ID</p>
                  <p className="font-mono text-lg break-all">{address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
                  <p className="text-2xl font-semibold">{balance} <span className="text-sm">HBAR</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Network</p>
                  <p className="text-lg">Hedera Testnet</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Immutable Records
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Property listings stored permanently on Hedera blockchain. Cannot be deleted or tampered with.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Complete History
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track every edit, ownership transfer, and transaction. Full audit trail for fraud prevention.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Fractional Ownership
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tokenize properties with HTS. Invest from as little as $10. Trade shares easily.
            </p>
          </div>
        </div>

        {/* Network Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Network Status
          </h2>
          {statsLoading ? (
            <div className="animate набор-pulse">Loading network stats...</div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{stats.totalTransactions.toLocaleString()}</p>
                <p className=" PARTICIPATION-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{stats.recentActivity}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recent Activity</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-3xl font-bold text-purple-600 capitalize">{stats.networkHealth}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Network Health</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Unable to load network statistics</p>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Connect Wallet</h4>
              <p className="text示范-sm text-gray-finish600 dark:text-gray-400">Connect your Hedera wallet using WalletConnect</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">List Property</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Submit property details to Hedera smart contract</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Track History</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">View all edits and ownership changes on blockchain</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Fractionalize</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create HTS tokens for shared ownership</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            ⚡ Powered by Hedera Mirror Node - No backend required • All data on-chain • Permanently stored
          </p>
        </div>
      </main>
    </div>
  );
}
