
export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  imageUrl: string;
  rating: number;
  isSuperhost?: boolean;
  amenities: string[];
  description: string;
}

export const FEATURED_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Golden Hour Penthouse",
    price: 850000,
    address: "101 Luxury Ln, Downtown",
    beds: 2,
    baths: 2,
    sqft: 1450,
    type: "Penthouse",
    imageUrl: "/images/we-properties/penthouse.jpg",
    rating: 4.9,
    isSuperhost: true,
    amenities: ["Pool", "Gym", "Concierge", "View"],
    description: "Experience luxury living at its finest in this stunning downtown penthouse features panoramic views and high-end finishes throughout."
  },
  {
    id: "2",
    title: "Minimalist Loft",
    price: 450000,
    address: "45 Artist Way, Arts District",
    beds: 1,
    baths: 1.5,
    sqft: 980,
    type: "Modern Apartment",
    imageUrl: "/images/we-properties/loft.jpg",
    rating: 4.8,
    amenities: ["High Ceilings", "Natural Light", "Open Plan"],
    description: "A beautifully designing minimalist space perfect for creatives. Features 15ft ceilings and floor-to-ceiling windows."
  },
  {
    id: "3",
    title: "Suburban Oasis",
    price: 1200000,
    address: "789 Oak Drive, Beverly Hills",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "Modern House",
    imageUrl: "/images/we-properties/suburban.jpg",
    rating: 4.95,
    isSuperhost: true,
    amenities: ["Garden", "Garage", "Swimming Pool", "Fireplace"],
    description: "A perfect family home with a spacious garden and modern amenities. Located in a quiet, prestigious neighborhood."
  },
  {
    id: "4",
    title: "Modern Glass Villa",
    price: 3500000,
    address: "88 Oceanview Blvd, Malibu",
    beds: 5,
    baths: 4.5,
    sqft: 4200,
    type: "Modern Villa",
    imageUrl: "/images/we-properties/villa.jpg",
    rating: 5.0,
    isSuperhost: true,
    amenities: ["Ocean View", "Infinity Pool", "Smart Home", "Theater"],
    description: "Breathtaking modern villa with unobstructed ocean views. Features state-of-the-art smart home technology."
  },
  {
    id: "5",
    title: "Azure Horizon",
    price: 2100000,
    address: "220 Shoreline Dr, Miami",
    beds: 3,
    baths: 3,
    sqft: 2100,
    type: "Beachfront Apartment",
    imageUrl: "/images/we-properties/azure.jpg",
    rating: 4.85,
    amenities: ["Private Beach", "Valet", "Spa"],
    description: "Wake up to the sound of waves in this exclusive beachfront condo. Features floor-to-ceiling glass walls."
  },
  {
    id: "6",
    title: "The Glass Cube",
    price: 1800000,
    address: "55 Future Lane, Seattle",
    beds: 3,
    baths: 2.5,
    sqft: 1800,
    type: "Modern House",
    imageUrl: "/images/we-properties/glass-cube.jpg",
    rating: 4.7,
    amenities: ["Smart Home", "Minimalist Design", "Rooftop"],
    description: "A masterpiece of modern architecture. This home features sharp lines, concrete finishes, and integrated smart tech."
  },
  {
    id: "7",
    title: "Malibu Beach House",
    price: 4200000,
    address: "10 Pacific Coast Hwy, Malibu",
    beds: 4,
    baths: 4,
    sqft: 3200,
    type: "Beach Villa",
    imageUrl: "/images/we-properties/malibu.jpg",
    rating: 4.98,
    isSuperhost: true,
    amenities: ["Private Deck", "Ocean Access", "Fire Pit"],
    description: "The ultimate California dream. Direct sand access and expansive decks for entertaining."
  },
  {
    id: "8",
    title: "Nordic Minimalist",
    price: 950000,
    address: "88 Scandi St, Portland",
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Modern House",
    imageUrl: "/images/we-properties/nordic.jpg",
    rating: 4.6,
    amenities: ["Wood Stove", "Forest View", "Sustainability"],
    description: "Eco-friendly modern living. Sustainable materials meets luxury design in this cozy yet sharp home."
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Homes", icon: "🏠" },
  { id: "luxury", label: "Luxury", icon: "💎" },
  { id: "beach", label: "Beachfront", icon: "🏖️" },
  { id: "modern", label: "Modern", icon: "🏢" }
];
