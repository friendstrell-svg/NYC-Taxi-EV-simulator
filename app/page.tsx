export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            NYC Taxi EV Simulator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive decision-support tool for modeling the total cost of ownership 
            and carbon impact of electrifying New York City's yellow taxi fleet
          </p>
        </header>

        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              NPV per Taxi
            </div>
            <div className="text-3xl font-bold text-gray-900">
              Coming Soon
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Payback Period
            </div>
            <div className="text-3xl font-bold text-gray-900">
              Coming Soon
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-emerald-500">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              CO₂e Saved (t/yr)
            </div>
            <div className="text-3xl font-bold text-gray-900">
              Coming Soon
            </div>
          </div>
        </div>

        {/* NYC Defaults Badge */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-12 max-w-3xl mx-auto">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong className="font-semibold">NYC Defaults:</strong> The model comes 
                pre-configured with baseline assumptions for NYC yellow taxis including fleet 
                size, utilization rates, and local grid intensity.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a 
            href="/dashboard" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors text-center"
          >
            Run the Model
          </a>
          <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-lg shadow-md border border-gray-300 transition-colors">
            View Methodology
          </button>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Built for Portfolio & Production
          </h2>
          <p className="text-gray-600 mb-4">
            Built with <strong>Next.js + TypeScript</strong>. Fully reproducible model 
            with unit tests and continuous integration.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              Next.js 16
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              TypeScript
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              Tailwind CSS
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              Recharts
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              Vitest
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              Zod
            </span>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>Version 1.0 | Model under active development</p>
        </footer>
      </div>
    </main>
  )
}