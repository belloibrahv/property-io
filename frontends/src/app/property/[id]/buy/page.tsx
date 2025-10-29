"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { Gem } from "lucide-react";

export default function BuyShares() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;
  const { isConnected } = useAppKitAccount();
  
  const [shares, setShares] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const propertyData = {
    title: "Modern 3-Bedroom Apartment in Lagos",
    totalShares: 1000,
    availableShares: 750,
    pricePerShare: 100,
    minimumShares: 10,
    totalValue: 100000
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Implement smart contract call
    console.log("Buying shares:", { propertyId, shares });
    
    setTimeout(() => {
      alert(`Successfully purchased ${shares} shares!`);
      setIsSubmitting(false);
      router.push(`/property/${propertyId}`);
    }, 2000);
  };

  const totalCost = parseInt(shares) * propertyData.pricePerShare;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/property/${propertyId}`} className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Property
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Buy Property Shares
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Invest in this property by purchasing shares
          </p>
        </div>

        {/* Property Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {propertyData.title}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Shares</p>
              <p className="text-xl font-semibold">{propertyData.totalShares}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
              <p className="text-xl font-semibold text-green-600">{propertyData.availableShares}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Price Per Share</p>
              <p className="text-xl font-semibold">{propertyData.pricePerShare} HBAR</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Property Value</p>
              <p className="text-xl font-semibold">{propertyData.totalValue.toLocaleString()} HBAR</p>
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <form onSubmit={handleBuy} className="space-y-6">
            {/* Shares Input */}
            <div>
              <label htmlFor="shares" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Shares to Purchase *
              </label>
              <input
                type="number"
                id="shares"
                name="shares"
                required
                min={propertyData.minimumShares}
                max={propertyData.availableShares}
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                className="w-full px-4 py-3 text-xl text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Minimum: {propertyData.minimumShares} shares ({propertyData.minimumShares * propertyData.pricePerShare} HBAR)
              </p>
            </div>

            {/* Cost Calculation */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700 dark:text-gray-300">Shares:</span>
                  <span className="font-semibold">{shares}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700 dark:text-gray-300">Price Per Share:</span>
                  <span className="font-semibold">{propertyData.pricePerShare} HBAR</span>
                </div>
                <div className="border-t border-blue-200 dark:border-blue-800 pt-2 mt-2">
                  <div className="flex justify-between text-xl">
                    <span className="font-semibold text-gray-900 dark:text-white">Total Cost:</span>
                    <span className="font-bold text-blue-600">{totalCost} HBAR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center space-x-2">
                <Gem className="w-4 h-4" />
                <span>What You Get:</span>
              </h4>
              <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                <li>• Partial ownership of this property</li>
                <li>• Tradeable HTS tokens</li>
                <li>• Verifiable on Hedera blockchain</li>
                <li>• Transparent ownership records</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isConnected || isSubmitting || parseInt(shares) < propertyData.minimumShares || parseInt(shares) > propertyData.availableShares}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing Purchase..." : `Purchase ${shares} Shares for ${totalCost} HBAR`}
            </button>

            {/* Info */}
            <div className="text-center text-sm text-gray-500">
              <p>
                Transaction will be processed on Hedera blockchain. You'll receive HTS tokens representing ownership.
              </p>
            </div>
          </form>
        </div>

        {/* Ownership Info */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            How Fractional Ownership Works
          </h3>
          <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">1.</span>
              <span>Purchase shares using this interface (paid in HBAR)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">2.</span>
              <span>Receive HTS tokens to your wallet representing ownership</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">3.</span>
              <span>Trade shares on secondary markets (coming soon)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">4.</span>
              <span>All transactions recorded permanently on Hedera blockchain</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

