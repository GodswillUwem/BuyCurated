
export enum Category {
  JEWELRY = 'Jewelry & Accessories',
  HOME_LIVING = 'Home & Living',
  ART_COLLECTIBLES = 'Art & Collectibles',
  WELLNESS_BATH = 'Wellness & Bath',
  PERSONALIZED = 'Personalized Gifts',
  CLOTHING = 'Clothing',
  TOYS_GAMES = 'Toys & Games',
  SUPPLIES = 'Craft Supplies'
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  location: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  createdAt: string;
  verified: boolean;
  discount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  role: 'user' | 'admin' | 'manager';
}

export interface PageBlock {
  id: string;
  type: 'hero' | 'categories' | 'deals' | 'trending' | 'feed' | 'custom_text' | 'banner' | 'collections';
  content: any;
  isVisible: boolean;
  order: number;
}

export interface SiteSettings {
  primaryColor: string;
  siteName: string;
  homeBlocks: PageBlock[];
  customPages: { title: string; path: string; blocks: PageBlock[] }[];
}

export interface Message {
  id: string;
  listingId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}
