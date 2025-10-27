// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PropertyVerificationContract
 * @dev Smart contract for property verification and tokenization on Hedera
 * @author Afrika Property Guardian Team
 */
contract PropertyVerificationContract {
    
    // Events
    event PropertyRegistered(
        uint256 indexed propertyId,
        address indexed owner,
        string title,
        string location,
        uint256 price,
        string ipfsHash
    );
    
    event PropertyVerified(
        uint256 indexed propertyId,
        address indexed verifier,
        bool verified,
        string verificationHash
    );
    
    event PropertyTokenized(
        uint256 indexed propertyId,
        address indexed tokenContract,
        uint256 tokenSupply,
        uint256 tokenPrice
    );
    
    event PropertySold(
        uint256 indexed propertyId,
        address indexed buyer,
        address indexed seller,
        uint256 price,
        uint256 tokensTransferred
    );
    
    event OwnershipTransferred(
        uint256 indexed propertyId,
        address indexed previousOwner,
        address indexed newOwner
    );
    
    // Structs
    struct Property {
        uint256 id;
        address owner;
        string title;
        string description;
        string location;
        uint256 price;
        uint256 size;
        string sizeUnit;
        string[] images;
        string[] features;
        bool isVerified;
        bool isTokenized;
        bool isActive;
        string ipfsHash;
        string verificationHash;
        address tokenContract;
        uint256 tokenSupply;
        uint256 tokenPrice;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct VerificationData {
        address verifier;
        bool verified;
        string verificationHash;
        string documentHash;
        uint256 verifiedAt;
        string notes;
    }
    
    struct TokenizationData {
        address tokenContract;
        uint256 tokenSupply;
        uint256 tokenPrice;
        uint256 tokenizedAt;
        bool isActive;
    }
    
    // State variables
    address public owner;
    uint256 public propertyCounter;
    uint256 public verificationFee;
    uint256 public tokenizationFee;
    
    // Mappings
    mapping(uint256 => Property) public properties;
    mapping(uint256 => VerificationData) public verifications;
    mapping(uint256 => TokenizationData) public tokenizations;
    mapping(address => uint256[]) public userProperties;
    mapping(string => bool) public usedIpfsHashes;
    mapping(string => bool) public usedVerificationHashes;
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyPropertyOwner(uint256 _propertyId) {
        require(properties[_propertyId].owner == msg.sender, "Only property owner can call this function");
        _;
    }
    
    modifier propertyExists(uint256 _propertyId) {
        require(properties[_propertyId].id != 0, "Property does not exist");
        _;
    }
    
    modifier notUsedIpfsHash(string memory _ipfsHash) {
        require(!usedIpfsHashes[_ipfsHash], "IPFS hash already used");
        _;
    }
    
    modifier notUsedVerificationHash(string memory _verificationHash) {
        require(!usedVerificationHashes[_verificationHash], "Verification hash already used");
        _;
    }
    
    // Constructor
    constructor() {
        owner = msg.sender;
        verificationFee = 0.1 ether; // 0.1 HBAR
        tokenizationFee = 1.0 ether; // 1 HBAR
    }
    
    /**
     * @dev Register a new property
     * @param _title Property title
     * @param _description Property description
     * @param _location Property location
     * @param _price Property price in HBAR
     * @param _size Property size
     * @param _sizeUnit Size unit (sqm, sqft)
     * @param _images Array of image URLs
     * @param _features Array of property features
     * @param _ipfsHash IPFS hash of property documents
     */
    function registerProperty(
        string memory _title,
        string memory _description,
        string memory _location,
        uint256 _price,
        uint256 _size,
        string memory _sizeUnit,
        string[] memory _images,
        string[] memory _features,
        string memory _ipfsHash
    ) external notUsedIpfsHash(_ipfsHash) returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(_price > 0, "Price must be greater than 0");
        require(_size > 0, "Size must be greater than 0");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        propertyCounter++;
        
        Property storage newProperty = properties[propertyCounter];
        newProperty.id = propertyCounter;
        newProperty.owner = msg.sender;
        newProperty.title = _title;
        newProperty.description = _description;
        newProperty.location = _location;
        newProperty.price = _price;
        newProperty.size = _size;
        newProperty.sizeUnit = _sizeUnit;
        newProperty.images = _images;
        newProperty.features = _features;
        newProperty.isVerified = false;
        newProperty.isTokenized = false;
        newProperty.isActive = true;
        newProperty.ipfsHash = _ipfsHash;
        newProperty.createdAt = block.timestamp;
        newProperty.updatedAt = block.timestamp;
        
        userProperties[msg.sender].push(propertyCounter);
        usedIpfsHashes[_ipfsHash] = true;
        
        emit PropertyRegistered(
            propertyCounter,
            msg.sender,
            _title,
            _location,
            _price,
            _ipfsHash
        );
        
        return propertyCounter;
    }
    
    /**
     * @dev Verify a property
     * @param _propertyId Property ID to verify
     * @param _verificationHash Hash of verification documents
     * @param _documentHash Hash of verification documents
     * @param _notes Verification notes
     */
    function verifyProperty(
        uint256 _propertyId,
        string memory _verificationHash,
        string memory _documentHash,
        string memory _notes
    ) external 
        onlyOwner 
        propertyExists(_propertyId)
        notUsedVerificationHash(_verificationHash)
    {
        require(!properties[_propertyId].isVerified, "Property already verified");
        
        properties[_propertyId].isVerified = true;
        properties[_propertyId].verificationHash = _verificationHash;
        properties[_propertyId].updatedAt = block.timestamp;
        
        verifications[_propertyId] = VerificationData({
            verifier: msg.sender,
            verified: true,
            verificationHash: _verificationHash,
            documentHash: _documentHash,
            verifiedAt: block.timestamp,
            notes: _notes
        });
        
        usedVerificationHashes[_verificationHash] = true;
        
        emit PropertyVerified(
            _propertyId,
            msg.sender,
            true,
            _verificationHash
        );
    }
    
    /**
     * @dev Tokenize a property
     * @param _propertyId Property ID to tokenize
     * @param _tokenContract Address of the token contract
     * @param _tokenSupply Total token supply
     * @param _tokenPrice Price per token
     */
    function tokenizeProperty(
        uint256 _propertyId,
        address _tokenContract,
        uint256 _tokenSupply,
        uint256 _tokenPrice
    ) external 
        onlyPropertyOwner(_propertyId)
        propertyExists(_propertyId)
    {
        require(properties[_propertyId].isVerified, "Property must be verified before tokenization");
        require(!properties[_propertyId].isTokenized, "Property already tokenized");
        require(_tokenContract != address(0), "Invalid token contract address");
        require(_tokenSupply > 0, "Token supply must be greater than 0");
        require(_tokenPrice > 0, "Token price must be greater than 0");
        
        properties[_propertyId].isTokenized = true;
        properties[_propertyId].tokenContract = _tokenContract;
        properties[_propertyId].tokenSupply = _tokenSupply;
        properties[_propertyId].tokenPrice = _tokenPrice;
        properties[_propertyId].updatedAt = block.timestamp;
        
        tokenizations[_propertyId] = TokenizationData({
            tokenContract: _tokenContract,
            tokenSupply: _tokenSupply,
            tokenPrice: _tokenPrice,
            tokenizedAt: block.timestamp,
            isActive: true
        });
        
        emit PropertyTokenized(
            _propertyId,
            _tokenContract,
            _tokenSupply,
            _tokenPrice
        );
    }
    
    /**
     * @dev Transfer property ownership
     * @param _propertyId Property ID
     * @param _newOwner New owner address
     */
    function transferOwnership(
        uint256 _propertyId,
        address _newOwner
    ) external 
        onlyPropertyOwner(_propertyId)
        propertyExists(_propertyId)
    {
        require(_newOwner != address(0), "Invalid new owner address");
        require(_newOwner != properties[_propertyId].owner, "New owner must be different");
        
        address previousOwner = properties[_propertyId].owner;
        properties[_propertyId].owner = _newOwner;
        properties[_propertyId].updatedAt = block.timestamp;
        
        // Update user properties mapping
        userProperties[_newOwner].push(_propertyId);
        
        emit OwnershipTransferred(_propertyId, previousOwner, _newOwner);
    }
    
    /**
     * @dev Update property information
     * @param _propertyId Property ID
     * @param _title New title
     * @param _description New description
     * @param _price New price
     * @param _images New images array
     * @param _features New features array
     */
    function updateProperty(
        uint256 _propertyId,
        string memory _title,
        string memory _description,
        uint256 _price,
        string[] memory _images,
        string[] memory _features
    ) external 
        onlyPropertyOwner(_propertyId)
        propertyExists(_propertyId)
    {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_price > 0, "Price must be greater than 0");
        
        properties[_propertyId].title = _title;
        properties[_propertyId].description = _description;
        properties[_propertyId].price = _price;
        properties[_propertyId].images = _images;
        properties[_propertyId].features = _features;
        properties[_propertyId].updatedAt = block.timestamp;
    }
    
    /**
     * @dev Deactivate a property
     * @param _propertyId Property ID
     */
    function deactivateProperty(uint256 _propertyId) external 
        onlyPropertyOwner(_propertyId)
        propertyExists(_propertyId)
    {
        properties[_propertyId].isActive = false;
        properties[_propertyId].updatedAt = block.timestamp;
    }
    
    /**
     * @dev Get property details
     * @param _propertyId Property ID
     * @return Property struct
     */
    function getProperty(uint256 _propertyId) external view 
        propertyExists(_propertyId)
        returns (Property memory)
    {
        return properties[_propertyId];
    }
    
    /**
     * @dev Get user properties
     * @param _user User address
     * @return Array of property IDs
     */
    function getUserProperties(address _user) external view returns (uint256[] memory) {
        return userProperties[_user];
    }
    
    /**
     * @dev Get verification data
     * @param _propertyId Property ID
     * @return VerificationData struct
     */
    function getVerificationData(uint256 _propertyId) external view 
        propertyExists(_propertyId)
        returns (VerificationData memory)
    {
        return verifications[_propertyId];
    }
    
    /**
     * @dev Get tokenization data
     * @param _propertyId Property ID
     * @return TokenizationData struct
     */
    function getTokenizationData(uint256 _propertyId) external view 
        propertyExists(_propertyId)
        returns (TokenizationData memory)
    {
        return tokenizations[_propertyId];
    }
    
    /**
     * @dev Update verification fee
     * @param _newFee New verification fee
     */
    function updateVerificationFee(uint256 _newFee) external onlyOwner {
        verificationFee = _newFee;
    }
    
    /**
     * @dev Update tokenization fee
     * @param _newFee New tokenization fee
     */
    function updateTokenizationFee(uint256 _newFee) external onlyOwner {
        tokenizationFee = _newFee;
    }
    
    /**
     * @dev Get contract statistics
     * @return totalProperties Total number of properties
     * @return verifiedProperties Number of verified properties
     * @return tokenizedProperties Number of tokenized properties
     */
    function getContractStats() external view returns (
        uint256 totalProperties,
        uint256 verifiedProperties,
        uint256 tokenizedProperties
    ) {
        totalProperties = propertyCounter;
        
        for (uint256 i = 1; i <= propertyCounter; i++) {
            if (properties[i].isVerified) {
                verifiedProperties++;
            }
            if (properties[i].isTokenized) {
                tokenizedProperties++;
            }
        }
    }
}
