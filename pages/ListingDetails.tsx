
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Listing } from '../types';

interface ListingDetailsProps {
  listings: Listing[];
}

export const ListingDetails: React.FC<ListingDetailsProps> = ({ listings }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!listing) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-3xl font-black text-gray-800">One-of-a-kind.</h2>
        <p className="text-gray-500">This piece has already found a home.</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-primary text-white px-8 py-3 rounded-full font-bold">Discover more</button>
      </div>
    );
  }

  const images = listing.images && listing.images.length > 0 ? listing.images : ['https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-100 aspect-square flex items-center justify-center p-4">
            <img src={images[activeImageIndex]} alt={listing.title} className="max-w-full max-h-full object-contain rounded-2xl transition-opacity duration-300" />
          </div>
          <div className="flex space-x-2 overflow-x-auto py-2 no-scrollbar">
            {images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImageIndex(i)}
                className={`w-20 h-20 bg-white rounded-xl border-2 flex-shrink-0 flex items-center justify-center p-1 transition overflow-hidden ${
                  activeImageIndex === i ? 'border-primary shadow-md' : 'border-gray-100 hover:border-primary-soft'
                }`}
              >
                <img src={img} className={`max-w-full max-h-full object-cover rounded-lg w-full h-full ${activeImageIndex === i ? 'opacity-100' : 'opacity-60'}`} alt={`Thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[450px] space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
            <div className="mb-6">
              <span className="text-4xl font-black text-gray-900">${listing.price.toFixed(2)}</span>
              <p className="text-xs text-green-600 font-bold mt-1 uppercase tracking-tighter">Ready to ship from {listing.location}</p>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-2">{listing.title}</h1>
            
            <div className="flex items-center space-x-3 text-xs font-bold text-gray-500 mb-6 uppercase tracking-tight">
              <span className="text-primary">Maker Direct</span>
              <span>•</span>
              <span className="flex items-center text-amber-500">
                <svg className="w-3.5 h-3.5 mr-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3-.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                5.0 Reviews
              </span>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-primary hover:bg-primary-hover text-white font-black py-4 rounded-full shadow-lg transition transform active:scale-95 flex items-center justify-center text-lg uppercase tracking-tight">
                ADD TO CART
              </button>
              <button className="w-full bg-black text-white font-black py-4 rounded-full shadow-lg transition transform active:scale-95 text-lg uppercase tracking-tight">
                BUY IT NOW
              </button>
            </div>
            
            <p className="text-[10px] text-gray-400 text-center mt-4 font-bold uppercase tracking-widest italic">Small Batch Production • Ships in 2-4 business days</p>
          </div>

          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src={listing.sellerAvatar} className="w-12 h-12 rounded-full ring-2 ring-primary-soft object-cover" alt={listing.sellerName} />
                  <div>
                    <p className="font-black text-sm text-gray-900 leading-tight">{listing.sellerName}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Verified Artisan Maker</p>
                  </div>
                </div>
                <button className="border border-primary text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary-soft transition">Visit Studio</button>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex border-b border-gray-200 mb-8 space-x-8 overflow-x-auto no-scrollbar">
          <button className="pb-4 border-b-4 border-primary text-primary font-black uppercase text-xs tracking-widest whitespace-nowrap">The Story</button>
          <button className="pb-4 text-gray-400 font-bold uppercase text-xs tracking-widest hover:text-gray-600 transition whitespace-nowrap">Materials</button>
          <button className="pb-4 text-gray-400 font-bold uppercase text-xs tracking-widest hover:text-gray-600 transition whitespace-nowrap">Shipping & Policies</button>
        </div>
        <div className="bg-white p-8 sm:p-12 rounded-[40px] shadow-sm border border-gray-100">
          <div className="prose prose-stone max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">{listing.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
