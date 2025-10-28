"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";

export default function PropertyDetail() {
  const params = useParams();
  const propertyId = params?.id as string;
  const { isConnected, address } = useAppKitAccount();
  
  const [activeTab, setActiveTab] = useState<'details' | 'history' | 'ownership'>('details');

  // Mock data - will be replaced with real data
  const property = {
    id: propertyId,
    title: "Modern 3-Bedroom Apartment in Lagos",
    location: "Victoria Island, Lagos, Nigeria",
    price: 500000,
    size: 150,
    bedrooms: 3,
    bathrooms: 2,
    type: "residential",
    description: "Beautiful modern apartment with stunning views, fully furnished, gated community, 24/7 security, close to amenities.",
    owner: "0.0.1234567",
    listedTime: "2024-01-15T10:30:00",
    isActive: true,
    isFractionalized: false,
    imageHashes: ["QmSample1...", "QmSample2...", "QmSample3..."],
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/browse" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Browse
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="h-96 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-9xl">🏠</span>
              </div>
              <div className="p-4 grid grid-cols-3 gap-2">
                {property.imageHashes.map((hash, index) => (
                  <div key={index} className="h-24 bg-gray-200 dark:bg-gray-700 rounded">
                    <span className="flex items-center justify-center h-full text-gray-400">Image {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Title and Basic Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {property.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                📍 {property.location}
</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm capitalize">
                  {property.type}
                </span>
                {property.isFractionalized && (
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                    💎 Fractionalized
                  </span>
                )}
                {property.isActive ? (
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                    ✓ Active
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm">
                    ⊗ Inactive
                  </span>
                )}
              </div>

              <p className="text-3xl font-bold text-blue-600 mb-4">
                {property.price.toLocaleString()} HBAR
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                {property.description}
              </p>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-6 py-4 font-medium ${
                      activeTab === 'details'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Property Details
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`px-6 py-4 font-medium ${
                      activeTab === 'history'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Edit History
                  </button>
                  <button
                    onClick={() => setActiveTab('ownership')}
                    className={`px-6 py-4 font-medium ${
                      activeTab === 'ownership'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Ownership
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Size</p>
                      <p className="text-xl font-semibold">{property.size} sqm</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Bedrooms</p>
                      <p className="text-xl font-semibold">{property.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Bathrooms</p>
                      <p className="text-xl font-semibold">{property.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Listed</p>
                      <p className="text-sm">{new Date(property.listedTime).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Property ID</p>
                      <p className="text-sm font-mono">{property.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Owner</p>
                      <p className="text-sm font-mono">{property.owner}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-4">
                    {property.history.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-4 pb-4">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.field === 'listed' ? 'Property Listed' : `Updated ${item.field}`}
                        </p>
                        {item.field !== 'listed' && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.oldValue} → {item.newValue}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleString()} by {item.changedBy.slice(0, 8)}...
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'ownership' && (
                  <div className="space-y-4">
                    {property.ownershipHistory.map((item, index) => (
                      <div key={index} className="border-l-4 border-green-600 pl-4 pb-4">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">
                          Ownership Transfer
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          From: {item.from.slice(0, 8)}... → To: {item.to.slice(0, 8)}...
                        </p>
                        {item.salePrice > 0 && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Price: {item.salePrice} HBAR
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Actions */}
            {isConnected && isOwner && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Property Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    href={`/property/${propertyId}/edit`}
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit Details
                  </Link>
                  {!property.isFractionalized && (
                    <Link
                      href={`/property/${propertyId}/fractionalize`}
                      className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Fractionalize
                    </Link>
                  )}
                  <button className="block w-full text-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                    Deactivate
                  </button>
                </div>
              </div>
            )}

            {/* Buy/View Shares */}
            {property.isFractionalized && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Fractional Ownership
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  This property has been tokenized into shares
                </p>
                <Link
                  href={`/property/${propertyId}/buy`}
                  className="block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Buy Shares
                </Link>
              </div>
            )}

            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                🔒 This property is stored permanently on Hedera blockchain. All edits and transfers are tracked transparently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

