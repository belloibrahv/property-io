# Afrika Property Guardian - Frontend Requirements & Task List

Based on the smart contract analysis, this document outlines all required frontend components and flows.

## Smart Contract Summary

### Core Functions:
1. `listProperty()` - List a property (5 HBAR fee)
2. `updatePropertyPrice()` - Update price (tracked in history)
3. `deactivateProperty()` - Hide property (not delete)
4. `fractionalizeProperty()` - Convert to HTS tokens
5. `purchaseFractionalShares()` - Buy property shares
6. `transferProperty()` - Transfer full ownership

### Property Data Structure:
- id, owner, title, location, propertyType
- price, size, bedrooms, bathrooms
- description, imageHashes (IPFS)
- listedTime, isActive, isFractionalized
- fractionalTokenAddress

### Tracked History:
- PropertyEdit[] - All edits
- OwnershipRecord[] - Ownership changes
- Events for all operations

## Required Frontend Pages & Components

### ✅ COMPLETED
- [x] Home page (`/`)
- [x] Mirror Node integration
- [x] Wallet connection (AppKit)
- [x] Contract configuration
- [x] Basic UI layout

### 🔨 IN PROGRESS
- [ ] List Property page (`/list-property`)
- [ ] Browse Properties page (`/browse`)

### ❌ TODO - Core Features

#### 1. Property Management Pages
- [ ] **Browse Properties Page** (`/browse`)
  - Display all active properties
  - Filter by type, price, location
  - Search functionality
  - Property cards with key info
  
- [ ] **Property Detail Page** (`/property/[id]`)
  - Full property information
  - Image gallery (IPFS)
  - Property history timeline
  - Ownership records
  - Fractional ownership info (if applicable)
  - Actions: Edit, Deactivate, Fractionalize
  
- [ ] **List Property Page** (improve `/list-property`)
  - Form validation
  - Hedera contract interaction
  - IPFS image upload
  - 5 HBAR fee payment
  - Transaction status feedback

#### 2. Hedera Integration
- [ ] **Hedera Service** (`src/services/hedera.ts`)
  - Client initialization
  - Contract interaction
  - Transaction signing
  - Event listening
  
- [ ] **Smart Contract Functions**
  - listProperty() - with 5 HBAR payment
  - updatePropertyPrice() - track history
  - deactivateProperty() - hide listing
  - fractionalizeProperty() - tokenize
  - purchaseFractionalShares() - buy tokens
  - getProperty() - read property data
  - getPropertyEditHistory() - view edits
  - getOwnershipHistory() - ownership chain

#### 3. IPFS Integration
- [ ] **IPFS Service** (`src/services/ipfs.ts`)
  - Upload images to IPFS
  - Get IPFS links
  - Pin files
  
- [ ] **Image Upload Component**
  - Drag and drop
  - Multiple image upload
  - Preview before upload
  - Store IPFS hashes

#### 4. Fractional Ownership
- [ ] **Fractional Ownership Page** (`/property/[id]/fractionalize`)
  - Setup fractionalization
  - Configure shares and price
  - Create HTS token
  
- [ ] **Buy Shares Page** (`/property/[id]/buy`)
  - Available shares display
  - Purchase interface
  - Payment in HBAR
  - Ownership tracking

#### 5. My Properties
- [ ] **User Dashboard** (`/dashboard`)
  - My listed properties
  - My fractional shares
  - Recent activity
  - Account stats

#### 6. History & Transparency
- [ ] **Property History Component**
  - Edit timeline
  - Ownership transfers
  - Transaction log
  - Event display
  
- [ ] **Audit Trail View**
  - Complete transparency
  - Blockchain proof
  - Verification badges

#### 7. UI Components
- [ ] **Property Card** - Reusable property display
- [ ] **History Timeline** - Display edit history
- [ ] **Transaction Status** - Loading/confirmation states
- [ ] **Price Chart** - If history available
- [ ] **Image Gallery** - IPFS image display
- [ ] **Fractional Ownership Widget** - Share ownership display

## Technical Requirements

### Dependencies Needed:
```json
{
  "@hashgraph/sdk": "^2.x", // Already added
  "ipfs-http-client": "^60.x", // For IPFS uploads
  "@web3-storage/w3up-client": "^2.x", // Alternative IPFS
  "axios": "^1.x", // For API calls
  "react-hot-toast": "^2.x", // Toast notifications
  "date-fns": "^2.x" // Date formatting
}
```

### Environment Variables:
```env
NEXT_PUBLIC_HEDERA_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ID=0.0.XXXXXX
NEXT_PUBLIC_OPERATOR_ID=0.0.XXXXXX
NEXT_PUBLIC_OPERATOR_KEY=xxx
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs
NEXT_PUBLIC_PROPERTY_TOKEN_ID=0.0.XXXXXX
```

### Key Services to Create:
1. `hedera.service.ts` - Hedera SDK interactions
2. `ipfs.service.ts` - IPFS file uploads
3. `contract.service.ts` - Smart contract calls
4. `transaction.service.ts` - Transaction management

## Implementation Priority

### Phase 1: Core Property Listing (CRITICAL)
1. Complete `/list-property` with Hedera integration
2. Create `/browse` to show properties
3. Basic Hedera service for contract calls
4. IPFS image upload

### Phase 2: Property Management
1. Property detail page with full info
2. Edit/update functionality
3. History tracking display
4. Deactivate property

### Phase 3: Fractional Ownership
1. Fractionalize interface
2. Token creation
3. Buy/sell shares UI
4. Ownership tracking

### Phase 4: Advanced Features
1. Dashboard for users
2. Search and filters
3. Analytics and charts
4. Export/verification tools

## Testing Requirements

- [ ] Test property listing with real transaction
- [ ] Test price update and history tracking
- [ ] Test IPFS image upload
- [ ] Test fractional ownership flow
- [ ] Test transaction status handling
- [ ] Test Mirror Node data display

## Acceptance Criteria

The frontend is complete when:
1. ✅ Users can connect Hedera wallet
2. Users can list a property (5 HBAR fee)
3. Users can view all active properties
4. Users can see property details and history
5. Users can update property price (with history)
6. Users can deactivate properties
7. Users can fractionalize properties
8. Users can buy fractional shares
9. All data displayed from Mirror Node
10. IPFS images display correctly

## Notes

- No backend needed - direct Hedera + Mirror Node
- Use Hedera SDK for all blockchain interactions
- Mirror Node for reading data
- IPFS for decentralized image storage
- Track all interactions for transparency

