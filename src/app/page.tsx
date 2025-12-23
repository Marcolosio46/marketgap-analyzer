export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            MarketGap
          </div>
          <div className="flex items-center gap-4">
            <a href="/upload" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
              Get Started
            </a>
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
          <a href="/upload" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all text-lg">
            Get Started
          </a>
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
    </div>
  );
}
