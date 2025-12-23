export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            MarketGap
          </a>
          <div className="flex items-center gap-4">
            <a href="/upload" className="text-slate-300 hover:text-white transition-colors">Upload</a>
            <a href="/categories" className="text-slate-300 hover:text-white transition-colors">Categories</a>
            <a href="/analysis" className="text-slate-300 hover:text-white transition-colors">Analysis</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Amazon Categories</h1>
          <p className="text-slate-400">Select a market and sync categories from Jungle Scout</p>
        </div>

        {/* Market Selector */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-4">Select Market</label>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {['ES', 'FR', 'DE', 'UK', 'COM', 'IT'].map((market) => (
              <button
                key={market}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:border-blue-500 hover:bg-slate-700 transition-all"
              >
                {market}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">1,247</div>
            <div className="text-sm text-slate-400">Total Categories</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">847</div>
            <div className="text-sm text-slate-400">Completed</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">200</div>
            <div className="text-sm text-slate-400">Processing</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">200</div>
            <div className="text-sm text-slate-400">Pending</div>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {[
            { name: 'Electronics', sub: 'Smartphones', subsub: 'iPhone', status: 'Completed' },
            { name: 'Electronics', sub: 'Smartphones', subsub: 'Samsung', status: 'Completed' },
            { name: 'Electronics', sub: 'Laptops', subsub: 'MacBook', status: 'Processing' },
            { name: 'Home & Kitchen', sub: 'Cookware', subsub: 'Pots & Pans', status: 'Pending' },
            { name: 'Sports', sub: 'Fitness', subsub: 'Yoga Mats', status: 'Completed' },
          ].map((cat, idx) => (
            <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-medium">{cat.name}</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-slate-300">{cat.sub}</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-slate-400">{cat.subsub}</span>
                  </div>
                  <div className="flex gap-2">
                    {['ES', 'FR', 'DE', 'UK', 'COM', 'IT'].map((market) => (
                      <span key={market} className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded">
                        {market}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    cat.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    cat.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {cat.status}
                  </span>
                  <button className="px-4 py-2 text-sm bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
