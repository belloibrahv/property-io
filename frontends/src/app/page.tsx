"use client";

import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

export default function Home() {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Afrika Property Guardian
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-gray-600 dark:text-gray-300">
            Decentralized Property Registry and Verification System
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleConnect}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              {isConnected ? "Wallet Connected" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
