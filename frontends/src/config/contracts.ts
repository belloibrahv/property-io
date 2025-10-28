// config/contracts.ts

/**
 * Hedera Contract Configuration for Afrika Property Guardian
 * 
 * This file manages contract addresses for Hedera testnet and mainnet.
 * Hedera uses contract IDs (e.g., 0.0.1234567) instead of 0x addresses.
 */

// Hedera Mainnet Contract Addresses
export const HederaMainnetContractAddresses = {
  PROPERTY_REGISTRY: '0.0.XXXXXX' as string,  // Replace with actual mainnet contract ID
} as const;

// Hedera Testnet Contract Addresses
export const HederaTestnetContractAddresses = {
  PROPERTY_REGISTRY: '0.0.XXXXXX' as string,  // Replace with actual testnet contract ID
} as const;

// Helper function to get contract addresses based on environment
export const getContractAddresses = () => {
  const isMainnet = process.env.NEXT_PUBLIC_ENVIRONMENT === 'mainnet';
  
  if (isMainnet) {
    return {
      PROPERTY_REGISTRY: HederaMainnetContractAddresses.PROPERTY_REGISTRY,
    };
  }
  
  // Default to testnet
  return {
    PROPERTY_REGISTRY: HederaTestnetContractAddresses.PROPERTY_REGISTRY,
  };
};

// Get contract address from environment variable (preferred method)
export const getContractId = (): string => {
  // First, try environment variable
  const envContractId = process.env.NEXT_PUBLIC_CONTRACT_ID;
  if (envContractId && envContractId !== '0.0.XXXXXX') {
    return envContractId;
  }
  
  // Fallback to hardcoded addresses
  const contractAddresses = getContractAddresses();
  return contractAddresses.PROPERTY_REGISTRY;
};

// Contract types
export type ContractName = keyof typeof HederaTestnetContractAddresses;
export type ContractAddress = typeof HederaTestnetContractAddresses[ContractName];

// Contract metadata
export const CONTRACT_METADATA = {
  PROPERTY_REGISTRY: {
    name: 'Property Registry',
    description: 'Immutable property listing registry with fractional ownership on Hedera',
    address: getContractId(),
    network: process.env.NEXT_PUBLIC_HEDERA_NETWORK || 'testnet',
    explorerUrl: process.env.NEXT_PUBLIC_HEDERA_NETWORK === 'mainnet'
      ? `https://hashscan.io/mainnet/contract/${getContractId()}`
      : `https://hashscan.io/testnet/contract/${getContractId()}`,
  },
} as const;

/**
 * Validate Hedera contract ID format
 * Hedera contract IDs follow the pattern: 0.0.XXXXXXXXX (where X are digits)
 */
export const isValidHederaContractId = (contractId: string): boolean => {
  const contractIdPattern = /^0\.0\.\d+$/;
  return contractIdPattern.test(contractId);
};

/**
 * Get network configuration
 */
export const getNetworkConfig = () => {
  const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK || 'testnet';
  const isMainnet = network === 'mainnet';
  
  return {
    network,
    isMainnet,
    explorerUrl: isMainnet 
      ? 'https://hashscan.io/mainnet'
      : 'https://hashscan.io/testnet',
    mirrorNodeUrl: isMainnet
      ? 'https://mainnet-public.mirrornode.hedera.com'
      : 'https://testnet.mirrornode.hedera.com',
  };
};

/**
 * Get contract info for display
 */
export const getContractInfo = () => {
  const contractId = getContractId();
  const networkConfig = getNetworkConfig();
  
  return {
    contractId,
    name: CONTRACT_METADATA.PROPERTY_REGISTRY.name,
    description: CONTRACT_METADATA.PROPERTY_REGISTRY.description,
    network: networkConfig.network,
    explorerUrl: CONTRACT_METADATA.PROPERTY_REGISTRY.explorerUrl,
    isValid: isValidHederaContractId(contractId),
  };
};

