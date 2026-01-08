
import React from 'react';
import { Category, User, Listing } from './types';

export const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  [Category.JEWELRY]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  [Category.HOME_LIVING]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  [Category.ART_COLLECTIBLES]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  [Category.WELLNESS_BATH]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  [Category.PERSONALIZED]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  [Category.CLOTHING]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  [Category.TOYS_GAMES]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  [Category.SUPPLIES]: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17l.354-.354" />
    </svg>
  ),
};

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Liam Craft',
  email: 'liam@curated.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
  phone: '+1 503 555 0123',
  role: 'user',
};

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Hand-Poured Sandalwood & Bourbon Soy Candle',
    description: 'Elevate your space with our signature slow-burning soy candle. Poured in small batches in Portland, OR. Featuring a crackling wood wick and premium phthalate-free oils.\n\nCrafted for those who appreciate the finer details of home ambiance, this sandalwood and bourbon blend brings a warm, smoky depth to any room. Each candle is hand-poured into a recycled glass jar and finished with a minimalist label.',
    price: 32.00,
    category: Category.HOME_LIVING,
    location: 'Portland, Oregon',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602872030219-cbf917468c84?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572726710307-99cc29accbbd?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'u2',
    sellerName: 'Wildwood Botanicals',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
    createdAt: new Date().toISOString(),
    verified: true
  },
  {
    id: 'l2',
    title: 'Personalized Horween Leather Slim Wallet',
    description: 'Classic American craftsmanship. Made from world-famous Horween leather. Each piece is hand-stitched with waxed linen thread. Monogram included.\n\nThis wallet is designed to age beautifully, developing a unique patina that tells the story of your journeys. It holds 4-6 cards and folded cash comfortably without adding bulk to your pocket.',
    price: 75.00,
    category: Category.PERSONALIZED,
    location: 'Austin, Texas',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550520299-59895ad01acc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614352238028-85cc2ad7a851?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598532213005-52257b52d0c5?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'u6',
    sellerName: 'Lone Star Leather',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    createdAt: new Date().toISOString(),
    verified: true
  },
  {
    id: 'l3',
    title: 'Minimalist Hand-Thrown Ceramic Mug in Speckled Oat',
    description: 'Start your morning with art you can hold. Ergonomically designed for the perfect grip. Microwave and dishwasher safe. Lead-free glazes.\n\nEvery mug is thrown on the wheel in my Asheville studio, resulting in slight variations that make your piece truly one of a kind. The speckled oat glaze has a beautiful tactile quality that feels grounding in your hands.',
    price: 42.00,
    category: Category.HOME_LIVING,
    location: 'Asheville, NC',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fbed50?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577937932623-30ee68201530?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'u3',
    sellerName: 'Earth & Ember',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    createdAt: new Date().toISOString(),
    verified: true
  },
  {
    id: 'l4',
    title: 'Hand-Woven Merino Wool Wall Hanging',
    description: 'A statement piece for your modern nursery or living room. Intricately woven using sustainable merino wool and driftwood foraged from the California coast.\n\nThis textile art adds warmth and texture to any wall. The organic flow of the weave reflects the natural landscapes of the Pacific Northwest, bringing a touch of the outdoors inside.',
    price: 185.00,
    category: Category.ART_COLLECTIBLES,
    location: 'Brooklyn, NY',
    images: [
      'https://images.unsplash.com/photo-1528459105426-b924fd83359d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576016773322-79344449836e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'u4',
    sellerName: 'Thread & Fiber',
    sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
    createdAt: new Date().toISOString(),
    verified: true
  },
  {
    id: 'l5',
    title: 'Raw Emerald 14k Gold Filled Branch Ring',
    description: 'Inspired by the organic forms of nature. This unique stacking ring features a natural, uncut Colombian emerald. Nickel-free and hypoallergenic.\n\nThe branch-like texture of the band is hand-sculpted in wax before being cast in 14k gold fill. It celebrates the perfectly imperfect beauty of raw gemstones.',
    price: 128.00,
    category: Category.JEWELRY,
    location: 'Seattle, WA',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'u5',
    sellerName: 'Solstice Jewelry',
    sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80',
    createdAt: new Date().toISOString(),
    verified: true
  },
  {
    id: 'l6',
    title: 'Organic Lavender & Sea Salt Bath Soak',
    description: 'Transform your bathroom into a spa. Made with French Grey Sea Salt and therapeutic-grade lavender essential oils. Vegan and cruelty-free.\n\nSprinkle a handful into your evening bath to soothe tired muscles and quiet the mind. The blend includes dried botanicals from my own organic garden for a truly sensory experience.',
    price: 24.00,
    category: Category.WELLNESS_BATH,
    location: 'Savannah, GA',
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584305650150-1845474c3d82?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'u7',
    sellerName: 'Botanical Soul',
    sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80',
    createdAt: new Date().toISOString(),
    verified: false
  }
];
