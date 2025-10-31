import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  mainnet,
  sepolia,
  polygon,
  polygonMumbai,
  optimism,
  optimismSepolia,
  lisk,
  liskSepolia,
  bsc,
  bscTestnet,
} from "@reown/appkit/networks";
import { cookieStorage, createStorage } from "@wagmi/core";
import type { Chain } from "@reown/appkit/networks";

// Get project ID from environment variables with fallback (Billoq-style)
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "a9fbadc760baa309220363ec867b732e";

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// Environment detection (Billoq-style)
const isMainnet = process.env.NEXT_PUBLIC_ENVIRONMENT === 'mainnet';

// Hedera EVM network configs (custom)
const hederaMainnet: Chain = {
  id: 295,
  name: 'Hedera Mainnet',
  network: 'hedera-mainnet',

  nativeCurrency: { name: 'HBAR', symbol: 'HBAR', decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_HEDERA_RPC_URL || 'https://mainnet.hashio.io/api'] },
    public: { http: [process.env.NEXT_PUBLIC_HEDERA_RPC_URL || 'https://mainnet.hashio.io/api'] },
  },
  blockExplorers: {
    default: { name: 'HashScan', url: 'https://hashscan.io/mainnet' },
  },
};

const hederaTestnet: Chain = {
  id: 296,
  name: 'Hedera Testnet',
  network: 'hedera-testnet',
  nativeCurrency: { name: 'HBAR', symbol: 'HBAR', decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_HEDERA_RPC_URL || 'https://testnet.hashio.io/api'] },
    public: { http: [process.env.NEXT_PUBLIC_HEDERA_RPC_URL || 'https://testnet.hashio.io/api'] },
  },
  blockExplorers: {
    default: { name: 'HashScan', url: 'https://hashscan.io/testnet' },
  },
};

// Dynamic network configuration based on environment (Billoq-style)
const mainnetNetworks: [Chain, ...Chain[]] = [lisk as Chain, arbitrum as Chain, base as Chain, bsc as Chain, hederaMainnet];
const testnetNetworks: [Chain, ...Chain[]] = [sepolia as Chain, liskSepolia as Chain, arbitrumSepolia as Chain, bscTestnet as Chain, baseSepolia as Chain, hederaTestnet];

// Use appropriate networks based on environment (always ensure at least one network)
export const networks: Chain[] = isMainnet ? mainnetNetworks : testnetNetworks;

// Network configuration for better UX (Billoq-style environment awareness)
export const networkConfig = {
  // Default network for new users (environment-aware)
  defaultNetwork: isMainnet ? lisk : liskSepolia,

  // Networks that support the property guardian
  guardianSupportedNetworks: isMainnet
    ? [lisk, arbitrum, base]
    : [liskSepolia, arbitrumSepolia, sepolia],

  // Networks with native USDC support
  usdcSupportedNetworks: isMainnet
    ? [mainnet, arbitrum, base, lisk, bsc]
    : [sepolia, arbitrumSepolia, liskSepolia, bscTestnet],

  // Environment info
  isMainnet,
};

// Create Wagmi adapter with enhanced configuration
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

// Export the wagmi config for use in other parts of the application
export const config = wagmiAdapter.wagmiConfig;

// Utility functions for network management
export const networkUtils = {
  /**
   * Check if a network supports the property guardian
   */
  isGuardianSupported: (chainId: number): boolean => {
    return networkConfig.guardianSupportedNetworks.some(network => network.id === chainId);
  },

  /**
   * Check if a network has native USDC support
   */
  hasUsdcSupport: (chainId: number): boolean => {
    return networkConfig.usdcSupportedNetworks.some(network => network.id === chainId);
  },

  /**
   * Get network by chain ID
   */
  getNetworkById: (chainId: number) => {
    return networks.find(network => network.id === chainId);
  },

  /**
   * Get all mainnet networks
   */
  getMainnets: () => {
    return mainnetNetworks;
  },

  /**
   * Get all testnet networks
   */
  getTestnets: () => {
    return testnetNetworks;
  },

  /**
   * Get current environment
   */
  getCurrentEnvironment: () => {
    return isMainnet ? 'mainnet' : 'testnet';
  },

  /**
   * Get supported chains based on environment
   */
  getSupportedChains: () => {
    return isMainnet
      ? ["Lisk", "Arbitrum", "Base", "BSC"]
      : ["Ethereum Sepolia", "Lisk Sepolia", "Arbitrum Sepolia", "BSC Testnet", "Base Sepolia"];
  },
};

