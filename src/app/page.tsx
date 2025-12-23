'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Simple auth service inline to avoid import issues
const authService = {
  login: (email: string, password: string) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }
    if (!email.includes('@')) {
      return { success: false, error: 'Invalid email format' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }
    const user = { id: `user_${Date.now()}`, email, name: email.split('@')[0] };
    const token = btoa(`${email}:${Date.now()}`);
    if (typeof window !== 'undefined') {
      localStorage.setItem('marketgap_user', JSON.stringify(user));
      localStorage.setItem('marketgap_token', token);
    }
    return { success: true, user };
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('marketgap_user');
      localStorage.removeItem('marketgap_token');
    }
  },
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('marketgap_user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default function Home() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = authService.login(email, password);
    if (result.success) {
      setIsLoggedIn(true);
      setCurrentUser(result.user);
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
      setTimeout(() => router.push('/upload'), 500);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            MarketGap
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn && currentUser ? (
              <>
                <span className="text-slate-300 text-sm">{currentUser.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Identify Market Gaps
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Compare your UAE brand presence against 6 Western markets. Find untapped opportunities and scale faster.
          </p>
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all text-lg"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={() => router.push('/upload')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all text-lg"
            >
              Go to Dashboard
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center hover:border-slate-700 transition-colors">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              1,247
            </div>
            <div className="text-slate-400">Amazon Categories</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center hover:border-slate-700 transition-colors">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              6
            </div>
            <div className="text-slate-400">Western Markets</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center hover:border-slate-700 transition-colors">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              3,847
            </div>
            <div className="text-slate-400">Brands Analyzed</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 hover:border-slate-700 transition-colors">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-3">Real-time Analysis</h3>
            <p className="text-slate-400">
              Automatically sync categories and analyze top brands daily. Stay updated with market trends.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 hover:border-slate-700 transition-colors">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-3">Gap Identification</h3>
            <p className="text-slate-400">
              Instantly identify brands present in Western markets but missing from UAE. Find your next opportunity.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 hover:border-slate-700 transition-colors">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-3">Smart Insights</h3>
            <p className="text-slate-400">
              Get revenue estimates, ratings, and seller models. Make data-driven decisions with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Login
              </button>
            </form>

            <button
              onClick={() => {
                setShowLoginModal(false);
                setError('');
              }}
              className="w-full mt-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <p className="text-xs text-slate-500 mt-4 text-center">
              Demo: Use any email and password (min 6 chars)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}