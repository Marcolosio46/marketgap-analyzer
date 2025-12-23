export default function UploadPage() {
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
          <h1 className="text-4xl font-bold text-white mb-2">Upload Helium10 Data</h1>
          <p className="text-slate-400">Upload your UAE brand data to start analyzing market gaps</p>
        </div>

        {/* Upload Zone */}
        <div className="bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-lg p-12 text-center mb-8 hover:border-blue-500 transition-colors cursor-pointer">
          <div className="text-4xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-white mb-2">Drag and drop your file here</h3>
          <p className="text-slate-400 mb-4">or click to select a file</p>
          <p className="text-sm text-slate-500">Supported formats: CSV, XLSX</p>
        </div>

        {/* File Format Info */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Expected File Format</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-4 text-slate-300">Column Name</th>
                  <th className="text-left py-2 px-4 text-slate-300">Description</th>
                  <th className="text-left py-2 px-4 text-slate-300">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="py-2 px-4 text-white">Brand</td>
                  <td className="py-2 px-4 text-slate-400">Brand name</td>
                  <td className="py-2 px-4 text-slate-500">Samsung</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 px-4 text-white">Revenue</td>
                  <td className="py-2 px-4 text-slate-400">Estimated monthly revenue</td>
                  <td className="py-2 px-4 text-slate-500">$125,000</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 px-4 text-white">Sales</td>
                  <td className="py-2 px-4 text-slate-400">Monthly sales volume</td>
                  <td className="py-2 px-4 text-slate-500">1,250</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 px-4 text-white">ASIN</td>
                  <td className="py-2 px-4 text-slate-400">Amazon product ID</td>
                  <td className="py-2 px-4 text-slate-500">B08N5WRWNW</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-white">Price AED</td>
                  <td className="py-2 px-4 text-slate-400">Price in AED</td>
                  <td className="py-2 px-4 text-slate-500">459.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">0</div>
            <div className="text-sm text-slate-400">Total Brands</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">$0</div>
            <div className="text-sm text-slate-400">Total Revenue</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">$0</div>
            <div className="text-sm text-slate-400">Avg Price</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">0</div>
            <div className="text-sm text-slate-400">Duplicates</div>
          </div>
        </div>
      </section>
    </div>
  );
}
