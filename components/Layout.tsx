
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../services/supabaseService';
import { SiteSettings, Category } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  session?: any;
  settings?: SiteSettings;
}

export const Layout: React.FC<LayoutProps> = ({ children, session, settings }) => {
  const navigate = useNavigate();
  const user = session?.user;
  const userMetadata = user?.user_metadata;
  const isSuperAdmin = user?.email === 'oreofezoe@gmail.com';

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f4]">
      {/* Header */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-black tracking-tighter leading-none uppercase">{settings?.siteName || 'CURATED'}<span className="text-[10px] align-top ml-0.5">®</span></span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-2">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Find something special..." 
                  className="w-full bg-white text-gray-900 rounded-full py-2.5 px-12 focus:outline-none shadow-inner text-sm font-medium"
                />
                <svg className="w-5 h-5 absolute left-4 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-5">
              {isSuperAdmin && (
                <Link to="/duk" title="Admin Dashboard" className="flex flex-col items-center space-y-0.5 group">
                   <div className="w-7 h-7 flex items-center justify-center bg-black/20 rounded-full group-hover:bg-black/40 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <span className="text-[9px] font-black uppercase">Admin</span>
                </Link>
              )}

              {session ? (
                <div className="flex items-center space-x-4">
                  <Link to="/me" className="flex flex-col items-center space-y-0.5 group">
                    <img src={userMetadata?.avatar_url || `https://picsum.photos/seed/${user?.email}/200`} className="w-7 h-7 rounded-full border-2 border-white group-hover:scale-110 transition object-cover" />
                    <span className="text-[9px] font-black uppercase">Me</span>
                  </Link>
                  <button onClick={handleLogout} className="text-[10px] font-black uppercase bg-black/10 hover:bg-black/20 px-3 py-1.5 rounded-full transition">Logout</button>
                </div>
              ) : (
                <Link to="/join" className="flex flex-col items-center space-y-0.5 group">
                  <div className="w-7 h-7 flex items-center justify-center bg-white/20 rounded-full group-hover:bg-white/40 transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="text-[9px] font-black uppercase">Join</span>
                </Link>
              )}
              
              <Link 
                to="/sell"
                className="bg-white text-primary font-black py-2 px-6 rounded-full text-xs transition shadow-lg hover:scale-105"
              >
                SELL
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link to="/" className="inline-block">
                <span className="text-4xl font-black tracking-tighter uppercase">{settings?.siteName || 'CURATED'}<span className="text-primary text-sm align-top ml-1">®</span></span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
                The leading marketplace for high-quality, small-batch handmade gifts in the US. Connecting over 50,000 independent makers with conscious shoppers.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'pinterest', 'twitter'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition group">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 group-hover:bg-white transition" style={{ maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${social}.svg)`, maskRepeat: 'no-repeat', maskPosition: 'center' }}></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Marketplace</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-400 hover:text-white transition text-sm font-bold">Shop Everything</Link></li>
                <li><Link to="/sell" className="text-gray-400 hover:text-white transition text-sm font-bold">Start Selling</Link></li>
                <li><Link to="/join" className="text-gray-400 hover:text-white transition text-sm font-bold">Create Account</Link></li>
                <li><Link to="/me" className="text-gray-400 hover:text-white transition text-sm font-bold">Your Studio</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm font-bold">Gift Cards</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Top Categories</h4>
              <ul className="space-y-3">
                {Object.values(Category).slice(0, 5).map((cat) => (
                  <li key={cat}>
                    <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition text-sm font-bold text-left">{cat}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Maker News</h4>
              <p className="text-gray-400 text-sm font-medium">Get featured artisan stories and exclusive craft drops in your inbox.</p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="artisan@studio.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-primary transition"
                />
                <button className="absolute right-1 top-1 bg-primary text-white p-2 rounded-full hover:bg-primary-hover transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </form>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Live Updates Enabled</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              © {new Date().getFullYear()} Curated Marketplace Inc. • Handcrafted in the USA
            </p>
            <div className="flex space-x-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition">Privacy</a>
              <a href="#" className="hover:text-primary transition">Terms</a>
              <a href="#" className="hover:text-primary transition">Cookies</a>
              <a href="#" className="hover:text-primary transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
