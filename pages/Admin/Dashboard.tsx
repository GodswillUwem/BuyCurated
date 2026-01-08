
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { SiteSettings, Listing, PageBlock } from '../../types';

interface AdminDashboardProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  onDeleteListing: (id: string) => Promise<boolean>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ settings, setSettings, listings, setListings, onDeleteListing }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const updateBlocks = (newBlocks: PageBlock[]) => {
    setSettings(prev => ({ ...prev, homeBlocks: newBlocks }));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...settings.homeBlocks];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newBlocks.length) return;
    [newBlocks[index], newBlocks[target]] = [newBlocks[target], newBlocks[index]];
    updateBlocks(newBlocks.map((b, i) => ({ ...b, order: i })));
  };

  const toggleBlockVisibility = (id: string) => {
    updateBlocks(settings.homeBlocks.map(b => b.id === id ? { ...b, isVisible: !b.isVisible } : b));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mt-[-16px]">
      {/* Sidebar */}
      <div className={`bg-white border-r w-64 flex-shrink-0 transition-all ${isMenuOpen ? 'translate-x-0' : '-translate-x-full absolute'}`}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-black italic tracking-tighter text-primary">ADMIN PANEL</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Store Management</p>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { label: 'Overview', path: '/duk', icon: 'M4 6h16M4 12h16M4 18h16' },
            { label: 'Design', path: '/duk/design', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
            { label: 'Theme', path: '/duk/theme', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17l.354-.354' },
            { label: 'Inventory', path: '/duk/items', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { label: 'Team', path: '/duk/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
          ].map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center space-x-3 p-3 rounded-xl text-sm font-bold transition ${location.pathname === item.path ? 'bg-primary-soft text-primary' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-10">
        <Routes>
          <Route path="/" element={
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Total Listings</p>
                  <p className="text-4xl font-black text-gray-900">{listings.length}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Verified Makers</p>
                  <p className="text-4xl font-black text-green-500">28</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Platform Fees</p>
                  <p className="text-4xl font-black text-primary">$1,240</p>
                </div>
              </div>
            </div>
          } />

          <Route path="/theme" element={
            <div className="max-w-xl bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
              <h3 className="text-2xl font-black mb-6">Visual Identity</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Brand Color</label>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="color" 
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="w-16 h-16 rounded-2xl cursor-pointer border-none"
                    />
                    <input 
                      type="text" 
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 font-black uppercase text-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Site Name</label>
                  <input 
                    type="text" 
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 font-black text-gray-700"
                  />
                </div>
              </div>
            </div>
          } />

          <Route path="/design" element={
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black">Layout Designer</h3>
                <span className="text-xs font-black text-primary bg-primary-soft px-4 py-1.5 rounded-full uppercase tracking-widest">Active Draft</span>
              </div>
              
              <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 divide-y">
                {settings.homeBlocks.map((block, index) => (
                  <div key={block.id} className={`p-6 flex items-center justify-between group transition ${!block.isVisible ? 'bg-gray-50 opacity-60' : ''}`}>
                    <div className="flex items-center space-x-6">
                      <div className="flex flex-col space-y-1">
                        <button onClick={() => moveBlock(index, 'up')} className="text-gray-300 hover:text-primary transition">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                        </button>
                        <button onClick={() => moveBlock(index, 'down')} className="text-gray-300 hover:text-primary transition">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                      <div>
                        <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Section</p>
                        <h4 className="font-black text-lg text-gray-900 capitalize">{block.type.replace('_', ' ')}</h4>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                       <button 
                        onClick={() => toggleBlockVisibility(block.id)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${block.isVisible ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}
                      >
                        {block.isVisible ? 'VISIBLE' : 'HIDDEN'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          } />

          <Route path="/items" element={
            <div className="space-y-6">
              <h3 className="text-2xl font-black">Product Inventory</h3>
              <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
                      <th className="px-6 py-4">Item</th>
                      <th className="px-6 py-4">Maker</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {listings.map(listing => (
                      <tr key={listing.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img src={listing.images[0]} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-bold text-sm truncate max-w-[200px]">{listing.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{listing.sellerName}</td>
                        <td className="px-6 py-4 font-black text-primary">${listing.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                           <button onClick={() => onDeleteListing(listing.id)} className="text-red-500 hover:text-red-700 p-2">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};
