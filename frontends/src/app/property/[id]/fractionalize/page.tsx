"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";

export default function FractionalizeProperty() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;
  const { isConnected } = useAppKitAccount();
  
  const [formData, setFormData] = useState({
    totalShares: "1000",
    pricePerShare: "100",
    minimumShares: "10"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Implement smart contract call
    console.log("Fractionalizing property:", propertyId, formData);
    
    setTimeout(() => {
      alert("Property fractionalized successfully!");
      setIsSubmitting(false);
      router.push(`/property/${propertyId}`);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/property/${propertyId}`} className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Property
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Fractionalize Property
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert your property into tradeable token shares
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            What is Fractional Ownership?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            By fractionalizing your property, you divide it into tokens (shares). Each share represents partial ownership.
            This allows multiple investors to own a piece of your property, making real estate investment more accessible.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Total Shares */}
            <div>
              <label htmlFor="totalShares" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Number of Shares *
              </label>
              <input
                type="number"
                id="totalShares"
                name="totalShares"
                required
                value={formData.totalShares}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="1000"
              />
              <p className="text-sm text-gray-500 mt-1">
                This divides your property into {formData.totalShares} equal shares
              </p>
            </div>

            {/* Price Per Share */}
            <div>
              <label htmlFor="pricePerShare" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Per Share (HBAR) *
              </label>
              <input
                type="number"
                id="pricePerShare"
                name="pricePerShare"
                required
                value={formData.pricePerShare}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="100"
              />
              <p className="text-sm text-gray-500 mt-1">
                Total property value: {parseInt(formData.totalShares) * parseInt(formData.pricePerShare)} HBAR
              </p>
            </div>

            {/* Minimum Shares */}
            <div>
              <label htmlFor="minimumShares" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Purchase Amount *
              </label>
              <input
                type="number"
                id="minimumShares"
                name="minimumShares"
                required
                value={formData.minimumShares}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="10"
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum shares someone can purchase
              </p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Shares:</span>
                  <span className="font-semibold">{formData.totalShares}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Price Per Share:</span>
                  <span className="font-semibold">{formData.pricePerShare} HBAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Value:</span>
                  <span className="font-semibold">{parseInt(formData.totalShares) * parseInt(formData.pricePerShare)} HBAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Minimum Investment:</span>
                  <span className="font-semibold">{parseInt(formData.minimumShares) * parseInt(formData.pricePerShare)} HBAR</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={!isConnected || isSubmitting}
                className="flexocus-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Shares..." : "Create HTS Token Shares"}
              </button>
              <Link
                href={`/property/${propertyId}`}
                className="flex items-center justify-center px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </Link>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ This action is permanent. Once fractionalized, you'll need to create a new HTS token for your property.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

