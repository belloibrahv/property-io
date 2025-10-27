"use client";

import Link from "next/link";
import { useState } from "react";

export default function BrowseProperties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Mock data - will be replaced with real Mirror Node data
  const properties = [
    {
      id: 1,
      title: "Modern 3-Bedroom Apartment in Lagos",
      location: "Victoria Island, Lagos, Nigeria",
      price: 500000,
      size: 150,
      bedrooms: 3,
      bathrooms: 2,
      type: "residential",
      isActive: true,
      listedTime: "2024-01-15",
      imageHash: "QmSample..."
    },
    {
      id: 2,
      title: "Commercial Space in Abuja",
      location: "Wuse 2, Abuja, Nigeria",
      price: 1200000,
      size: 300,
      bedrooms: 0,
      bathrooms: 4,
      type: "commercial",
      isActive: true,
      listedTime: "2024-01-10",
      imageHash: "QmSample2..."
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || property.type === filter;
    return matchesSearch && matchesFilter && property.isActive;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Browse Properties
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover properties on the immutable Hedera blockchain
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Properties
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or location..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Link key={property.id} href={`/property/${property.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-200 cursor-pointer">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                    <span className="text-white text-6xl">🏠</span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      📍 {property.location}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Size</p>
                        <p className="font-semibold">{property.size} sqm</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Bedrooms</p>
                        <p className="font-semibold">{property.bedrooms}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Bathrooms</p>
                        <p className="font-semibold">{property.bathrooms}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-2xl font-bold text-blue-600">
                        {property.price.toLocaleString()} HBAR
                      </p>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm capitalize">
                        {property.type}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No properties found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            All property data verified on Hedera blockchain
          </p>
        </div>
      </div>
    </div>
  );
}

