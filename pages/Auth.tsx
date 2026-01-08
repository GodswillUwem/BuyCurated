
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../services/supabaseService';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) throw error;
        alert("Registration successful! Check your email for verification if required.");
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col items-center justify-center px-4 py-12">
      {/* Temu Style Banner */}
      <div className="max-w-md w-full bg-[#fb7701] text-white p-6 rounded-t-[32px] text-center shadow-lg">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none mb-2">NEW USER GIFT</h2>
        <p className="text-orange-100 text-sm font-bold">Register today for exclusive marketplace deals!</p>
      </div>

      <div className="max-w-md w-full bg-white p-10 rounded-b-[32px] shadow-2xl">
        <div className="flex justify-center mb-8 bg-gray-50 p-1 rounded-full">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-full text-sm font-black transition ${isLogin ? 'bg-white text-[#fb7701] shadow-sm' : 'text-gray-400'}`}
          >
            SIGN IN
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-full text-sm font-black transition ${!isLogin ? 'bg-white text-[#fb7701] shadow-sm' : 'text-gray-400'}`}
          >
            REGISTER
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold border border-red-100">
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#fb7701] focus:bg-white p-4 rounded-2xl outline-none transition font-bold"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#fb7701] focus:bg-white p-4 rounded-2xl outline-none transition font-bold"
              placeholder="name@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#fb7701] focus:bg-white p-4 rounded-2xl outline-none transition font-bold"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#fb7701] hover:bg-[#e66c01] text-white font-black py-5 rounded-full shadow-lg transition transform active:scale-95 disabled:opacity-75"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mx-auto border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
            ) : isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 font-medium px-4 leading-relaxed">
            By signing in, you agree to our <span className="text-gray-900 font-bold underline">Terms of Service</span> and <span className="text-gray-900 font-bold underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
