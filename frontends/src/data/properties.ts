export interface Property {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  price: number;
  originalPrice: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  isActive: boolean;
  isFeatured: boolean;
  listedTime: string;
  rating: number;
  reviews: number;
  shares: number;
  availableShares: number;
  roi: number;
  occupancyRate: number;
  amenities: string[];
  imageHash: string;
  images: string[];
  verified: boolean;
  trending: boolean;
  description?: string;
  owner?: string;
  yearBuilt?: number;
  propertyTax?: number;
  monthlyRent?: number;
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Lagos Villa",
    subtitle: "Luxury Living",
    location: "Victoria Island, Lagos, Nigeria",
    price: 500000,
    originalPrice: 500000,
    size: 150,
    bedrooms: 3,
    bathrooms: 2,
    type: "residential",
    isActive: true,
    isFeatured: true,
    listedTime: "2024-01-15",
    rating: 4.8,
    reviews: 24,
    shares: 1000,
    availableShares: 750,
    roi: 12.5,
    occupancyRate: 95,
    amenities: ["Pool", "Gym", "Security", "Parking"],
    imageHash: "QmSample1...",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    verified: true,
    trending: true,
    description: "Beautiful modern villa with stunning views of the Lagos skyline. This fully furnished property is located in a gated community with 24/7 security, swimming pool, gym, and is close to major business districts and amenities.",
    owner: "0.0.1234567",
    yearBuilt: 2020,
    propertyTax: 12000,
    monthlyRent: 2500
  },
  {
    id: 6,
    title: "Premium Lekki Penthouse",
    subtitle: "Sky-High Luxury",
    location: "Lekki Phase 1, Lagos, Nigeria",
    price: 890000,
    originalPrice: 890000,
    size: 220,
    bedrooms: 3,
    bathrooms: 4,
    type: "residential",
    isActive: true,
    isFeatured: true,
    listedTime: "2024-01-10",
    rating: 4.9,
    reviews: 45,
    shares: 2000,
    availableShares: 500,
    roi: 14.7,
    occupancyRate: 98,
    amenities: ["Pool", "Gym", "Security", "Parking", "Concierge", "Spa", "Rooftop"],
    imageHash: "QmSample6...",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    verified: true,
    trending: true,
    description: "Luxurious penthouse with panoramic views of Lagos. Features premium finishes, private elevator access, rooftop terrace, and world-class amenities. Perfect for high-end living and investment.",
    owner: "0.0.2345678",
    yearBuilt: 2022,
    propertyTax: 25000,
    monthlyRent: 4500
  },
  {
    id: 7,
    title: "Kaduna Estate House",
    subtitle: "Serene Residential Area",
    location: "Barnawa, Kaduna, Nigeria",
    price: 280000,
    originalPrice: 300000,
    size: 140,
    bedrooms: 3,
    bathrooms: 2,
    type: "residential",
    isActive: true,
    isFeatured: false,
    listedTime: "2024-01-25",
    rating: 4.4,
    reviews: 16,
    shares: 700,
    availableShares: 175,
    roi: 9.2,
    occupancyRate: 90,
    amenities: ["Garden", "Security", "Parking", "Playground"],
    imageHash: "QmSample7...",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    verified: false,
    trending: false,
    description: "Comfortable family home in a quiet residential area of Kaduna. Features spacious rooms, beautiful garden, and is located in a safe neighborhood with good schools and amenities nearby.",
    owner: "0.0.3456789",
    yearBuilt: 2018,
    propertyTax: 8000,
    monthlyRent: 1200
  }
];

export const getPropertyById = (id: string | number): Property | null => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return properties.find(property => property.id === numericId) || null;
};