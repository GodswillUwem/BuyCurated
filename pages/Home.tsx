
import React, { useState, useEffect, useMemo } from 'react';
import { CategoryBar } from '../components/CategoryBar';
import { ListingCard } from '../components/ListingCard';
import { Category, Listing, SiteSettings } from '../types';

interface HomeProps {
  listings: Listing[];
  loading?: boolean;
  settings: SiteSettings;
  session?: any;
}

export const Home: React.FC<HomeProps> = ({ listings, loading, settings, session }) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });
  const [searchQuery, setSearchQuery] = useState('');

  const userName = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || 'Maker';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredListings = useMemo(() => {
    let result = listings;
    if (activeCategory) {
      result = result.filter(l => l.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(l => 
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        l.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [listings, activeCategory, searchQuery]);

  const dealsForMe = useMemo(() => {
    return [...listings].sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [listings]);

  const isBrowsing = !!activeCategory || !!searchQuery;

  if (isBrowsing) {
    return (
      <div className="bg-[#f4f4f4] pb-12">
        <CategoryBar activeCategory={activeCategory} onSelect={(cat) => { setActiveCategory(cat); setSearchQuery(''); }} />
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-gray-900 flex items-center">
               <div className="w-1.5 h-6 bg-primary rounded-full mr-3"></div>
              {activeCategory ? activeCategory : `Results for "${searchQuery}"`}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredListings.map(listing => <ListingCard key={listing.id} listing={listing} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f4f4] pb-12">
      {settings.homeBlocks
        .filter(b => b.isVisible)
        .sort((a, b) => a.order - b.order)
        .map(block => {
          switch (block.type) {
            case 'hero':
              return (
                <div key={block.id} className="bg-white overflow-hidden relative border-b border-gray-100">
                  <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="z-10 text-center lg:text-left">
                      <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-gray-900 leading-[1.05] mb-6">
                        {block.content.title}
                      </h1>
                      <p className="text-xl text-gray-500 font-medium mb-10 max-w-lg mx-auto lg:mx-0">
                        {block.content.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <div className="relative w-full max-w-md">
                          <input 
                            type="text" 
                            placeholder="Find something unique..." 
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl py-4 px-14 outline-none transition font-bold text-gray-800 shadow-sm"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') setSearchQuery((e.target as HTMLInputElement).value);
                            }}
                          />
                          <svg className="w-6 h-6 absolute left-5 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <button 
                          onClick={() => window.location.hash = '#/sell'}
                          className="bg-primary hover:bg-primary-hover text-white font-black px-10 py-4 rounded-2xl transition shadow-xl hover:shadow-primary/30 active:scale-95 text-lg"
                        >
                          START SELLING
                        </button>
                      </div>
                      <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
                        <div className="flex -space-x-2">
                          {['1507003211169-0a1dd7228f2d','1438761681033-6461ffad8d80','1500648767791-00dcc994a43e','1494790108377-be9c29b29330'].map((id, i) => (
                            <img key={i} className="w-8 h-8 rounded-full border-2 border-white object-cover" src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=100&h=100&q=80`} alt="Artisan" />
                          ))}
                        </div>
                        <p className="text-sm font-bold text-gray-400">Join +50k American artisans</p>
                      </div>
                    </div>

                    <div className="relative hidden lg:block">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="rounded-[40px] overflow-hidden h-[300px] shadow-2xl transform hover:scale-[1.02] transition">
                            <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Artisan Pottery" />
                          </div>
                          <div className="rounded-[40px] overflow-hidden h-[200px] shadow-2xl transform translate-x-12 hover:scale-[1.02] transition">
                            <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Workshop" />
                          </div>
                        </div>
                        <div className="space-y-4 pt-12">
                          <div className="rounded-[40px] overflow-hidden h-[200px] shadow-2xl transform -translate-x-6 hover:scale-[1.02] transition">
                            <img src="https://images.unsplash.com/photo-1590736704728-f4730bb3c3af?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Jewelry Making" />
                          </div>
                          <div className="rounded-[40px] overflow-hidden h-[300px] shadow-2xl hover:scale-[1.02] transition">
                            <img src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Leather Craft" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
                      <div className="absolute -bottom-10 left-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                    </div>
                  </div>
                </div>
              );
            case 'collections':
              return (
                <div key={block.id} className="max-w-7xl mx-auto px-4 py-12">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                      Happy browsing, <span className="text-primary">{userName}!</span>
                    </h2>
                    <p className="text-gray-500 font-medium">Explore curated collections from US workshops.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {[
                      { title: 'Boho Chic', img: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=300&q=80', color: 'bg-orange-50' },
                      { title: 'Modern Pottery', img: 'https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&w=300&q=80', color: 'bg-stone-50' },
                      { title: 'Slow Living', img: 'https://images.unsplash.com/photo-1505944270255-bd2b896e7546?auto=format&fit=crop&w=300&q=80', color: 'bg-green-50' },
                      { title: 'Artisan Jewelry', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80', color: 'bg-blue-50' },
                      { title: 'Leather Goods', img: 'https://images.unsplash.com/photo-1517315003714-a071486bd9ea?auto=format&fit=crop&w=300&q=80', color: 'bg-amber-50' },
                      { title: 'Small Batch', img: 'https://images.unsplash.com/photo-1474635332397-f735e7316682?auto=format&fit=crop&w=300&q=80', color: 'bg-rose-50' }
                    ].map((col, i) => (
                      <button 
                        key={i} 
                        onClick={() => setSearchQuery(col.title.split(' ')[0])}
                        className="group flex flex-col items-center space-y-3"
                      >
                        <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-sm border-2 border-white transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 relative ${col.color}`}>
                          <img src={col.img} className="w-full h-full object-cover" alt={col.title} />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition"></div>
                        </div>
                        <span className="text-xs sm:text-sm font-black text-gray-800 uppercase tracking-tighter group-hover:text-primary transition">{col.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            case 'categories':
              return (
                <CategoryBar key={block.id} activeCategory={activeCategory} onSelect={(cat) => { setActiveCategory(cat); setSearchQuery(''); }} />
              );
            case 'deals':
              return (
                <div key={block.id} className="max-w-7xl mx-auto px-4 mt-10">
                   <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-gray-900 flex items-center">
                      <span className="bg-gradient-to-r from-stone-600 to-amber-600 text-white p-1 rounded-md mr-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </span>
                      {block.content.title}
                      <span className="ml-3 text-[10px] font-black bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">Staff Pick</span>
                    </h2>
                  </div>
                  <div className="flex space-x-4 overflow-x-auto pb-6 pt-2 no-scrollbar -mx-4 px-4">
                    {dealsForMe.map((listing) => (
                      <div key={`deal-${listing.id}`} className="min-w-[200px] sm:min-w-[240px] transform hover:-translate-y-1 transition-transform">
                        <ListingCard listing={listing} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'trending':
              return (
                <div key={block.id} className="max-w-7xl mx-auto px-4 mt-6">
                  <div className="flex items-center space-x-3 mb-6 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
                    <span className="text-sm font-bold text-gray-400">Trending:</span>
                    {['Pottery', 'Leather', 'Candles', 'Knits', 'Jewelry', 'Art'].map(tag => (
                      <button key={tag} onClick={() => setSearchQuery(tag)} className="bg-white border-gray-200 text-xs font-bold px-4 py-1.5 rounded-full hover:border-primary hover:text-primary transition">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              );
            case 'feed':
              return (
                <div key={block.id} className="max-w-7xl mx-auto px-4 mt-6">
                   <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-gray-900 flex items-center">
                       <div className="w-1.5 h-6 bg-primary rounded-full mr-3"></div>
                      {block.content.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                    {filteredListings.map(listing => <ListingCard key={listing.id} listing={listing} />)}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
    </div>
  );
};
