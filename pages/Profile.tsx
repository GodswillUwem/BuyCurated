
import React, { useState } from 'react';
import { Listing } from '../types';
import { ListingCard } from '../components/ListingCard';

interface ProfileProps {
  listings: Listing[];
  onDeleteListing: (id: string) => Promise<boolean>;
  loading?: boolean;
  session: any;
}

type Tab = 'ads' | 'favorites' | 'settings';

export const Profile: React.FC<ProfileProps> = ({ listings, onDeleteListing, loading, session }) => {
  const [activeTab, setActiveTab] = useState<Tab>('ads');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const user = session?.user;
  const userMetadata = user?.user_metadata;
  const myAds = listings.filter(l => l.sellerId === user?.id);

  const stats = [
    { label: 'Active Ads', value: myAds.length, color: 'text-[#fb7701]' },
    { label: 'Market Level', value: 'VIP', color: 'text-blue-500' },
    { label: 'Store Points', value: '120', color: 'text-purple-500' },
    { label: 'Trust Score', value: 'High', color: 'text-green-500' },
  ];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    setDeletingId(id);
    await onDeleteListing(id);
    setDeletingId(null);
  };

  return (
    <div className="bg-[#f4f4f4] min-h-screen pb-20">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group">
              <img 
                src={userMetadata?.avatar_url || `https://picsum.photos/seed/${user?.email}/200`} 
                className="w-32 h-32 rounded-full border-4 border-orange-50 shadow-lg" 
                alt="Avatar" 
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                {userMetadata?.full_name || user?.email?.split('@')[0]}
              </h1>
              <p className="text-gray-500 font-medium mb-6">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                 <span className="bg-orange-50 text-[#fb7701] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-100">
                    Pro Seller
                 </span>
                 <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                    Phone Verified
                 </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveTab('ads')} className={`pb-4 px-6 text-sm font-black uppercase transition ${activeTab === 'ads' ? 'border-b-4 border-[#fb7701] text-[#fb7701]' : 'text-gray-400'}`}>
            My Store Items ({myAds.length})
          </button>
        </div>

        {activeTab === 'ads' && (
          <div className="space-y-6">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-white rounded-2xl animate-pulse"></div>)}
              </div>
            ) : myAds.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {myAds.map(listing => (
                  <div key={listing.id} className="relative group">
                    <div className={deletingId === listing.id ? 'opacity-50 pointer-events-none' : ''}>
                      <ListingCard listing={listing} />
                    </div>
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(listing.id)}
                        disabled={deletingId === listing.id}
                        className="bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition"
                      >
                        {deletingId === listing.id ? (
                           <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeWidth="2" strokeLinecap="round"/></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[40px] shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-gray-900">Your store is empty</h3>
                <p className="text-gray-500 mt-2">Start selling and reach millions of buyers!</p>
                <button onClick={() => window.location.href = '#/sell'} className="mt-6 bg-[#fb7701] text-white px-8 py-3 rounded-full font-black shadow-lg">Post First Item</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
