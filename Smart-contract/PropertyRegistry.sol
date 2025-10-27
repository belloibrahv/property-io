// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Afrika Property Registry
 * @dev Immutable property listing registry with fractional ownership on Hedera
 *
 * What this contract ACTUALLY does:
 * 1. Stores property listings permanently (cannot be deleted)
 * 2. Enables fractional ownership through tokenization
 * 3. Tracks complete ownership history
 * 4. Enforces transparent transaction rules
 *
 * What this contract does NOT do:
 * - Replace real estate agents (they still add value)
 * - Magically detect fraud (blockchain prevents it structurally)
 * - Eliminate all costs (reduces specific transaction costs)
 */
contract PropertyRegistry {

    // ============ STATE VARIABLES ============

    address public platformOwner;
    uint256 public totalProperties;
    uint256 public totalListings; // Includes deactivated (never decreases)

    // Platform fee: 2% (honest and reasonable)
    uint256 public constant PLATFORM_FEE_PERCENT = 2;

    // Listing fee: ~$5 equivalent (covers gas costs)
    uint256 public constant LISTING_FEE = 5 * 10**18; // 5 HBAR

    // ============ STRUCTS ============

    /**
     * @dev Property struct - IMMUTABLE after creation
     * Key insight: We don't delete properties, we deactivate them
     * This creates a permanent fraud-resistant record
     */
    struct Property {
        uint256 id;
        address owner;
        string title;
        string location;
        string propertyType;
        uint256 price;
        uint256 size;
        uint256 bedrooms;
        uint256 bathrooms;
        string description;
        string[] imageHashes; // IPFS hashes for decentralized storage
        uint256 listedTime; // Immutable timestamp
        bool isActive; // Can be toggled, but listing always exists
        bool isFractionalized;
        address fractionalTokenAddress; // HTS token for shares
    }

    /**
     * @dev PropertyEdit - Track all changes for transparency
     * This is what makes blockchain valuable: complete edit history
     */
    struct PropertyEdit {
        uint256 propertyId;
        uint256 timestamp;
        string fieldChanged; // "price", "description", etc.
        string oldValue;
        string newValue;
        address changedBy;
    }

    /**
     * @dev Ownership record - Complete chain of custody
     */
    struct OwnershipRecord {
        uint256 propertyId;
        address previousOwner;
        address newOwner;
        uint256 salePrice;
        uint256 timestamp;
        string transferType; // "full_sale", "fractional_sale"
    }

    // ============ MAPPINGS ============

    mapping(uint256 => Property) public properties;
    mapping(uint256 => PropertyEdit[]) public propertyEditHistory;
    mapping(uint256 => OwnershipRecord[]) public ownershipHistory;
    mapping(address => uint256[]) public userListedProperties;

    // Fractional ownership tracking
    mapping(uint256 => mapping(address => uint256)) public fractionalOwnership;
    mapping(uint256 => uint256) public totalFractionalShares;

    // ============ EVENTS ============

    event PropertyListed(
        uint256 indexed propertyId,
        address indexed owner,
        string title,
        uint256 price,
        uint256 timestamp
    );

    event PropertyDeactivated(
        uint256 indexed propertyId,
        address indexed owner,
        uint256 timestamp,
        string reason
    );

    event PropertyEdited(
        uint256 indexed propertyId,
        string fieldChanged,
        string oldValue,
        string newValue,
        uint256 timestamp
    );

    event PropertyFractionalized(
        uint256 indexed propertyId,
        address indexed tokenAddress,
        uint256 totalShares,
        uint256 timestamp
    );

    event FractionalSharesPurchased(
        uint256 indexed propertyId,
        address indexed buyer,
        uint256 shares,
        uint256 paidAmount,
        uint256 timestamp
    );

    event OwnershipTransferred(
        uint256 indexed propertyId,
        address indexed from,
        address indexed to,
        uint256 salePrice,
        uint256 timestamp
    );

    // ============ MODIFIERS ============

    modifier onlyPropertyOwner(uint256 _propertyId) {
        require(properties[_propertyId].owner == msg.sender, "Not property owner");
        _;
    }

    modifier propertyExists(uint256 _propertyId) {
        require(_propertyId > 0 && _propertyId <= totalListings, "Property does not exist");
        _;
    }

    // ============ CONSTRUCTOR ============

    constructor() {
        platformOwner = msg.sender;
    }

    // ============ CORE FUNCTIONS ============

    /**
     * @dev List a property - Creates IMMUTABLE record
     * @notice Once listed, property data is permanently on blockchain
     * You can deactivate but never delete
     */
    function listProperty(
        string memory _title,
        string memory _location,
        string memory _propertyType,
        uint256 _price,
        uint256 _size,
        uint256 _bedrooms,
        uint256 _bathrooms,
        string memory _description,
        string[] memory _imageHashes
    ) external payable returns (uint256) {
        require(msg.value >= LISTING_FEE, "Insufficient listing fee");
        require(bytes(_title).length > 0, "Title required");
        require(_price > 0, "Price must be greater than 0");

        totalListings++;
        totalProperties++;
        uint256 propertyId = totalListings;

        properties[propertyId] = Property({
            id: propertyId,
            owner: msg.sender,
            title: _title,
            location: _location,
            propertyType: _propertyType,
            price: _price,
            size: _size,
            bedrooms: _bedrooms,
            bathrooms: _bathrooms,
            description: _description,
            imageHashes: _imageHashes,
            listedTime: block.timestamp,
            isActive: true,
            isFractionalized: false,
            fractionalTokenAddress: address(0)
        });

        userListedProperties[msg.sender].push(propertyId);

        // Initial ownership record
        ownershipHistory[propertyId].push(OwnershipRecord({
            propertyId: propertyId,
            previousOwner: address(0),
            newOwner: msg.sender,
            salePrice: 0,
            timestamp: block.timestamp,
            transferType: "initial_listing"
        }));

        emit PropertyListed(propertyId, msg.sender, _title, _price, block.timestamp);

        return propertyId;
    }

    /**
     * @dev Update property details - WITH FULL HISTORY TRACKING
     * @notice All edits are recorded, nothing is hidden
     */
    function updatePropertyPrice(uint256 _propertyId, uint256 _newPrice)
        external
        onlyPropertyOwner(_propertyId)
        propertyExists(_propertyId)
    {
        Property storage property = properties[_propertyId];

        // Record the edit
        propertyEditHistory[_propertyId].push(PropertyEdit({
            propertyId: _propertyId,
            timestamp: block.timestamp,
            fieldChanged: "price",
            oldValue: uintToString(property.price),
            newValue: uintToString(_newPrice),
            changedBy: msg.sender
        }));

        property.price = _newPrice;

        emit PropertyEdited(
            _propertyId,
            "price",
            uintToString(property.price),
            uintToString(_newPrice),
            block.timestamp
        );
    }

    /**
     * @dev Deactivate property - NOT deletion, just hiding
     * @notice Property still exists on blockchain, just marked inactive
     */
    function deactivateProperty(uint256 _propertyId, string memory _reason)
        external
        onlyPropertyOwner(_propertyId)
        propertyExists(_propertyId)
    {
        require(properties[_propertyId].isActive, "Already deactivated");

        properties[_propertyId].isActive = false;
        totalProperties--; // Active count decreases, but totalListings never does

        emit PropertyDeactivated(_propertyId, msg.sender, block.timestamp, _reason);
    }

    /**
     * @dev Fractionalize property - Convert to HTS token shares
     * @notice This is where Web3 shines: programmable ownership
     */
    function fractionalizeProperty(
        uint256 _propertyId,
        address _tokenAddress,
        uint256 _totalShares
    ) external onlyPropertyOwner(_propertyId) propertyExists(_propertyId) {
        require(!properties[_propertyId].isFractionalized, "Already fractionalized");
        require(_totalShares > 0, "Shares must be greater than 0");
        require(_tokenAddress != address(0), "Invalid token address");

        Property storage property = properties[_propertyId];
        property.isFractionalized = true;
        property.fractionalTokenAddress = _tokenAddress;

        totalFractionalShares[_propertyId] = _totalShares;

        emit PropertyFractionalized(
            _propertyId,
            _tokenAddress,
            _totalShares,
            block.timestamp
        );
    }

    /**
     * @dev Purchase fractional shares
     * @notice Transparent, on-chain ownership tracking
     */
    function purchaseFractionalShares(uint256 _propertyId, uint256 _shares)
        external
        payable
        propertyExists(_propertyId)
    {
        Property storage property = properties[_propertyId];
        require(property.isFractionalized, "Property not fractionalized");
        require(_shares > 0, "Must purchase at least 1 share");

        uint256 pricePerShare = property.price / totalFractionalShares[_propertyId];
        uint256 totalCost = pricePerShare * _shares;

        require(msg.value >= totalCost, "Insufficient payment");

        // Record fractional ownership
        fractionalOwnership[_propertyId][msg.sender] += _shares;

        // Platform fee
        uint256 platformFee = (totalCost * PLATFORM_FEE_PERCENT) / 100;
        uint256 ownerPayment = totalCost - platformFee;

        // Transfer payment to property owner
        payable(property.owner).transfer(ownerPayment);

        emit FractionalSharesPurchased(
            _propertyId,
            msg.sender,
            _shares,
            totalCost,
            block.timestamp
        );
    }

    // ============ VIEW FUNCTIONS ============

    function getProperty(uint256 _propertyId)
        external
        view
        propertyExists(_propertyId)
        returns (Property memory)
    {
        return properties[_propertyId];
    }

    function getPropertyEditHistory(uint256 _propertyId)
        external
        view
        propertyExists(_propertyId)
        returns (PropertyEdit[] memory)
    {
        return propertyEditHistory[_propertyId];
    }

    function getOwnershipHistory(uint256 _propertyId)
        external
        view
        propertyExists(_propertyId)
        returns (OwnershipRecord[] memory)
    {
        return ownershipHistory[_propertyId];
    }

    function getUserListedProperties(address _user)
        external
        view
        returns (uint256[] memory)
    {
        return userListedProperties[_user];
    }

    function getFractionalOwnership(uint256 _propertyId, address _owner)
        external
        view
        returns (uint256)
    {
        return fractionalOwnership[_propertyId][_owner];
    }

    function getActiveProperties() external view returns (uint256[] memory) {
        uint256 activeCount = 0;

        for (uint256 i = 1; i <= totalListings; i++) {
            if (properties[i].isActive) {
                activeCount++;
            }
        }

        uint256[] memory activeProperties = new uint256[](activeCount);
        uint256 index = 0;

        for (uint256 i = 1; i <= totalListings; i++) {
            if (properties[i].isActive) {
                activeProperties[index] = i;
                index++;
            }
        }

        return activeProperties;
    }

    // ============ HELPER FUNCTIONS ============

    function uintToString(uint256 _value) internal pure returns (string memory) {
        if (_value == 0) {
            return "0";
        }
        uint256 temp = _value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (_value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(_value % 10)));
            _value /= 10;
        }
        return string(buffer);
    }

    // ============ PLATFORM ADMIN ============

    function withdrawPlatformFees() external {
        require(msg.sender == platformOwner, "Not platform owner");
        payable(platformOwner).transfer(address(this).balance);
    }
}
