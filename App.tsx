
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ListingDetails } from './pages/ListingDetails';
import { Sell } from './pages/Sell';
import { Profile } from './pages/Profile';
import { Auth } from './pages/Auth';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { fetchListings, deleteListing, insertListing, supabase } from './services/supabaseService';
import { Listing, SiteSettings, PageBlock } from './types';
import { INITIAL_LISTINGS } from './constants';

const DEFAULT_BLOCKS: PageBlock[] = [
  { id: 'b0', type: 'hero', content: { title: 'Gifts with a Soul. Directly from the Maker.', subtitle: 'Join a community of 50k+ independent US artisans selling their crafts to the world.' }, isVisible: true, order: 0 },
  { id: 'b6', type: 'collections', content: { title: 'Curated Collections' }, isVisible: true, order: 1 },
  { id: 'b2', type: 'categories', content: {}, isVisible: true, order: 2 },
  { id: 'b3', type: 'deals', content: { title: 'Handpicked for You' }, isVisible: true, order: 3 },
  { id: 'b4', type: 'trending', content: {}, isVisible: true, order: 4 },
  { id: 'b5', type: 'feed', content: { title: 'Discover Recent Arrivals' }, isVisible: true, order: 5 },
];

const App: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [settings, setSettings] = useState<SiteSettings>({
    primaryColor: '#C2714F', // Earthy Terracotta
    siteName: 'CURATED',
    homeBlocks: DEFAULT_BLOCKS,
    customPages: []
  });

  const isSuperAdmin = session?.user?.email === 'oreofezoe@gmail.com';

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchListings();
      
      // Merge and strictly filter out anything without images
      const combined = [...(data || []), ...INITIAL_LISTINGS]
        .filter((listing, index, self) => 
          // Unique IDs only
          self.findIndex(l => l.id === listing.id) === index
        )
        .filter(l => 
          // Ensure images array exists and has at least one valid image
          l.images && l.images.length > 0 && typeof l.images[0] === 'string' && l.images[0].startsWith('http')
        );

      setListings(combined);
    } catch (error) {
      console.error("Failed to load listings:", error);
      // Fallback to initial listings if Supabase fails
      setListings(INITIAL_LISTINGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
  }, [settings.primaryColor]);

  const handleAddListing = async (newListing: Omit<Listing, 'id' | 'createdAt'>) => {
    const savedListing = await insertListing(newListing);
    if (savedListing) {
      setListings(prev => [savedListing, ...prev]);
      return true;
    }
    return false;
  };

  const handleDeleteListing = async (id: string) => {
    const success = await deleteListing(id);
    if (success) {
      setListings(prev => prev.filter(l => l.id !== id));
      return true;
    }
    return false;
  };

  return (
    <HashRouter>
      <Layout session={session} settings={settings}>
        <Routes>
          <Route path="/" element={<Home listings={listings} loading={loading} settings={settings} session={session} />} />
          <Route path="/p/:id" element={<ListingDetails listings={listings} />} />
          <Route path="/join" element={session ? <Navigate to="/" /> : <Auth />} />
          
          <Route 
            path="/sell" 
            element={session ? <Sell onAddListing={handleAddListing} session={session} /> : <Navigate to="/join" />} 
          />
          
          <Route 
            path="/me" 
            element={session ? <Profile listings={listings} onDeleteListing={handleDeleteListing} loading={loading} session={session} /> : <Navigate to="/join" />} 
          />

          <Route 
            path="/duk/*" 
            element={isSuperAdmin ? <AdminDashboard settings={settings} setSettings={setSettings} listings={listings} setListings={setListings} onDeleteListing={handleDeleteListing} /> : <Navigate to="/" />} 
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
