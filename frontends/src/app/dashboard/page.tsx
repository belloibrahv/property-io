"use client";

import Link from "next/link";
import { useAppKitAccount } from "@reown/appkit/react";
import { usePropertyOperations, useTokenBalances } from "../../hooks/useMirrorNode";

export default function Dashboard() {
  const { isConnected, address } = useAppKitAccount();
  const { operations, loading: operationsLoading } = usePropertyOperations(address || null);
  const { balances, loading: balancesLoading } = useTokenBalances(address || null);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Please connect your wallet to view your properties
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your properties and track your activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 dark:text-gray-400">My Properties</p>
              <span className="text-2xl">🏠</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {operations.filter(op => op.operation === 'list').length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 dark:text-gray-400">Fractional Shares</p>
              <span className="text-2xl">💎</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {balances.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 dark:text-gray-400">Total Activity</p>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {operations.length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Properties */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Properties
              </h2>
              <Link
                href="/list-property"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + List New
              </Link>
            </div>

            {operationsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin text-blue-600 text-4xl">⟳</div>
                <p className="text-gray-500 mt-2">Loading properties...</p>
              </div>
            ) : operations.filter(op => op.operation === 'list').length > 0 ? (
              <div className="space-y-4">
                {operations.filter(op => op.operation === 'list').map((op, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                          {op.operation} Property
                        </h3>
                        {op.propertyId && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ID: {op.propertyId}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          {new Date(op.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Link
                        href={op.propertyId ? `/property/${op.propertyId}` : '#'}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No properties listed yet</p>
                <Link
                  href="/list-property"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  List Your First Property
                </Link>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>

            {operationsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin text-blue-600 text-4xl">⟳</div>
                <p className="text-gray-500 mt-2">Loading activity...</p>
              </div>
            ) : operations.length > 0 ? (
              <div className="space-y-4">
                {operations.slice(0, 5).map((op, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      op.operation === 'list' ? 'bg-green-100 dark:bg-green-900' :
                      op.operation === 'update' ? 'bg-blue-100 dark:bg-blue-900' :
                      op.operation === 'fractionalize' ? 'bg-purple-100 dark:bg-purple-900' :
                      'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <span className="text-xl">
                        {op.operation === 'list' ? '🏠' :
                         op.operation === 'update' ? '✏️' :
                         op.operation === 'fractionalize' ? '💎' : '📊'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {op.operation} Property
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(op.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No activity yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Fractional Shares */}
        {balances.length > 0 && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Fractional Shares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {balances.map((balance, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💎</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {balance.symbol}
                      </p>
                      <p className="text-sm text-gray-500 font-mono">
                        {balance.tokenId}
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-blue-600">
                    {balance.balance.toLocaleString()} shares
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

