
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category, Listing } from '../types';
import { suggestCategoryAndPrice, generateSmartDescription } from '../services/geminiService';

interface SellProps {
  onAddListing: (listing: Omit<Listing, 'id' | 'createdAt'>) => Promise<boolean>;
  session: any;
}

export const Sell: React.FC<SellProps> = ({ onAddListing, session }) => {
  const navigate = useNavigate();
  const [loadingAI, setLoadingAI] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: Category.SUPPLIES,
    price: '',
    description: '',
    location: 'Portland, OR',
    imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80',
    condition: 'New'
  });

  const user = session?.user;
  const userMetadata = user?.user_metadata;

  const handleAISuggest = async () => {
    if (!formData.title) return alert("What are you making? Enter a title first!");
    setLoadingAI(true);
    try {
      const { category, suggestedPriceRange } = await suggestCategoryAndPrice(formData.title);
      const desc = await generateSmartDescription(formData.title, category, formData.condition);
      setFormData(prev => ({ 
        ...prev, 
        category, 
        description: desc 
      }));
    } catch (err) {
      console.error(err);
      alert("AI Tooling failed.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await onAddListing({
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      location: formData.location,
      images: [formData.imageUrl],
      sellerId: user?.id,
      sellerName: userMetadata?.full_name || user?.email?.split('@')[0],
      sellerAvatar: userMetadata?.avatar_url || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80`,
      verified: true
    });
    
    if (success) {
      navigate('/');
    } else {
      alert("Something went wrong saving your masterpiece.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[48px] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-primary p-12 text-white">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">Share Your Craft</h1>
          <p className="text-white/80 text-xl font-bold mt-2">Connecting from {user?.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-12 space-y-8">
          <div className="relative">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Item Title*</label>
            <input 
              type="text" 
              required
              className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:bg-white focus:border-primary outline-none transition text-lg font-bold"
              placeholder="e.g. Hand-Thrown Ceramic Pitcher"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            <button 
              type="button"
              disabled={loadingAI}
              onClick={handleAISuggest}
              className="absolute right-2 top-[34px] bg-black text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition disabled:opacity-50 flex items-center"
            >
              <svg className={`w-3 h-3 mr-1 ${loadingAI ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {loadingAI ? 'CURATING...' : 'AI ASSIST'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
              <select 
                className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:bg-white focus:border-primary outline-none transition font-bold"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Price (USD $)*</label>
              <input 
                type="number" 
                required
                className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:bg-white focus:border-primary outline-none transition text-lg font-bold"
                placeholder="0.00"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">The Story Behind the Piece</label>
            <textarea 
              required
              rows={6}
              className="w-full border-2 border-gray-50 bg-gray-50 rounded-[32px] p-6 focus:bg-white focus:border-primary outline-none transition font-medium text-gray-700"
              placeholder="Tell us about your process and the materials you used..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-white font-black py-6 rounded-full shadow-2xl transition transform active:scale-95 text-xl tracking-tighter disabled:opacity-75 flex items-center justify-center"
          >
            {isSubmitting ? 'LISTING YOUR CRAFT...' : 'LIST YOUR ITEM'}
          </button>
        </form>
      </div>
    </div>
  );
};
