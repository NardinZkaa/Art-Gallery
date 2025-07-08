import { Artwork } from '../types';
import { useArtworks } from '../hooks/useArtworks';

// Fallback data for when Supabase is not available
export const fallbackArtworks: Artwork[] = [
  {
    id: 1,
    title: "Desert Convergence",
    medium: "Acrylic on Canvas",
    size: "120 x 90 cm",
    year: "2024",
    price: "$2,500",
    category: "painting",
    image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: "A powerful exploration of Egyptian heritage through contemporary abstraction.",
    available: true
  },
  {
    id: 2,
    title: "Eternal Forms",
    medium: "Clay & Resin",
    size: "45 x 30 x 25 cm",
    year: "2023",
    price: "$1,800",
    category: "sculpture",
    image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: "Modern interpretation of classical Egyptian sculptural traditions.",
    available: true
  },
  {
    id: 3,
    title: "Pharaoh's Dream",
    medium: "Stage Design",
    size: "Full Stage Production",
    year: "2024",
    price: "Commission",
    category: "scenography",
    image: "https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: "Immersive set design blending ancient motifs with contemporary staging.",
    available: false
  },
  {
    id: 4,
    title: "Urban Mythology",
    medium: "Mixed Media",
    size: "100 x 80 cm",
    year: "2023",
    price: "$2,200",
    category: "painting",
    image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: "Contemporary narrative painting exploring modern Egyptian identity.",
    available: true
  },
  {
    id: 5,
    title: "Royal Regalia",
    medium: "Costume Design",
    size: "Full Costume Set",
    year: "2024",
    price: "Commission",
    category: "costume",
    image: "https://images.pexels.com/photos/1068881/pexels-photo-1068881.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: "Elaborate costume design for theatrical production.",
    available: false
  },
  {
    id: 6,
    title: "Metamorphosis",
    medium: "Stone-like Finish",
    size: "60 x 40 x 35 cm",
    year: "2023",
    price: "$2,800",
    category: "sculpture",
    image: "https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: "Sculptural exploration of transformation and renewal.",
    available: true
  },
  {
    id: 7,
    title: "Nile Reflections",
    medium: "Acrylic on Canvas",
    size: "150 x 100 cm",
    year: "2024",
    price: "$3,200",
    category: "painting",
    image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: "Large-scale painting capturing the essence of the Nile at sunset.",
    available: true
  },
  {
    id: 8,
    title: "Ancient Echoes",
    medium: "Bronze & Marble",
    size: "80 x 50 x 40 cm",
    year: "2023",
    price: "$4,500",
    category: "sculpture",
    image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: "Monumental sculpture inspired by ancient Egyptian architecture.",
    available: true
  }
];

// Export artworks - this will be replaced by database calls in components
export const artworks = fallbackArtworks;