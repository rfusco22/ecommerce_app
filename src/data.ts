export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  isFavorite?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Aura Pods Pro",
    price: 249,
    image: "/assets/pods.jpg", // We'll generate these
    category: "Audio",
    description: "Immersive sound with active noise cancellation and spatial audio."
  },
  {
    id: 2,
    name: "Vantage Watch S8",
    price: 399,
    image: "/assets/watch.jpg",
    category: "Wearables",
    description: "Advanced health tracking meets titanium elegance."
  },
  {
    id: 3,
    name: "Lumina Desk Lamp",
    price: 129,
    image: "/assets/lamp.jpg",
    category: "Home",
    description: "Adaptive lighting for the modern creative workspace."
  },
  {
    id: 4,
    name: "Nebula Phone Case",
    price: 45,
    image: "/assets/case.jpg",
    category: "Accessories",
    description: "Military-grade protection wraped in soft-touch silicone."
  }
];

export const CATEGORIES = ["All", "Audio", "Wearables", "Home", "Accessories"];
