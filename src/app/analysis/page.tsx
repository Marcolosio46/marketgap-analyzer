export default function AnalysisPage() {
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
          <h1 className="text-4xl font-bold text-white mb-2">Brand Gap Analysis</h1>
          <p className="text-slate-400">Identify brands present in Western markets but missing from UAE</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">3,847</div>
            <div className="text-sm text-slate-400">Total Brands</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">1,245</div>
            <div className="text-sm text-slate-400">Market Gaps</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">2,602</div>
            <div className="text-sm text-slate-400">Present in UAE</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">1,245</div>
            <div className="text-sm text-slate-400">Filtered Results</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Search by brand name..."
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:border-blue-500 transition-colors">
            Gaps Only
          </button>
          <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
            Export CSV
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/50">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Brand</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Market</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Revenue</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Avg Price</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Rating</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Seller Model</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">UAE Data</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { brand: 'Samsung', market: 'ES', revenue: '$245,000', price: '$459', rating: '4.5', seller: 'Vendor', uae: '✓' },
                  { brand: 'Samsung', market: 'FR', revenue: '$312,000', price: '$489', rating: '4.6', seller: 'Vendor', uae: '✓' },
                  { brand: 'Sony', market: 'DE', revenue: '$189,000', price: '$399', rating: '4.3', seller: 'Seller', uae: '✕' },
                  { brand: 'LG', market: 'UK', revenue: '$267,000', price: '$429', rating: '4.4', seller: 'Vendor', uae: '✓' },
                  { brand: 'Apple', market: 'COM', revenue: '$523,000', price: '$799', rating: '4.8', seller: 'Vendor', uae: '✓' },
                  { brand: 'Dell', market: 'IT', revenue: '$156,000', price: '$649', rating: '4.2', seller: 'Seller', uae: '✕' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{row.brand}</td>
                    <td className="py-3 px-4 text-slate-300">{row.market}</td>
                    <td className="py-3 px-4 text-slate-300">{row.revenue}</td>
                    <td className="py-3 px-4 text-slate-300">{row.price}</td>
                    <td className="py-3 px-4 text-slate-300">⭐ {row.rating}</td>
                    <td className="py-3 px-4 text-slate-300">{row.seller}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        row.uae === '✓' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {row.uae === '✓' ? '✓ Yes' : '✕ No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:border-blue-500 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">1</button>
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:border-blue-500 transition-colors">2</button>
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:border-blue-500 transition-colors">Next</button>
        </div>
      </section>
    </div>
  );
}
