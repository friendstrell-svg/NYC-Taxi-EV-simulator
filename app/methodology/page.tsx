import Link from 'next/link'

export default function Methodology() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Row */}
          <div className="flex justify-between items-center mb-3">
            <Link 
              href="/" 
              className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              Dashboard
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">
            Methodology & Assumptions
          </h1>
          <p className="text-gray-600 mt-2">
            Model boundaries, data sources, and analytical decisions
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* System Boundary */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Boundary</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              What's Included
            </h3>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700">
                <strong>Capital Expenditure:</strong> Vehicle purchase cost (ICE vs EV), charging infrastructure allocation
              </li>
              <li className="text-gray-700">
                <strong>Operating Costs:</strong> Fuel/electricity, routine maintenance, battery replacement (optional)
              </li>
              <li className="text-gray-700">
                <strong>Incentives:</strong> Federal/state EV tax credits and subsidies
              </li>
              <li className="text-gray-700">
                <strong>Financial Analysis:</strong> NPV with discounting, payback period, cost per mile
              </li>
              <li className="text-gray-700">
                <strong>Emissions:</strong> Tailpipe emissions (ICE), grid-based emissions (EV), total CO₂ saved
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="text-red-600 mr-2">✗</span>
              What's Excluded & Why
            </h3>
            <div className="space-y-3 ml-6">
              <div className="border-l-2 border-gray-300 pl-4">
                <strong className="text-gray-800">Insurance Costs</strong>
                <p className="text-gray-600 text-sm mt-1">
                  <em>Why excluded:</em> Highly variable by operator and region. Early data suggests minimal difference between ICE and EV taxi insurance rates. Excluding maintains model simplicity without materially affecting decision.
                </p>
              </div>
              
              <div className="border-l-2 border-gray-300 pl-4">
                <strong className="text-gray-800">Resale/Residual Value</strong>
                <p className="text-gray-600 text-sm mt-1">
                  <em>Why excluded:</em> EV depreciation curves remain uncertain, especially for high-mileage commercial use. Conservative approach assumes vehicles reach end-of-life with minimal residual value. This slightly penalises EVs but avoids speculative assumptions.
                </p>
              </div>
              
              <div className="border-l-2 border-gray-300 pl-4">
                <strong className="text-gray-800">Driver Wages & Benefits</strong>
                <p className="text-gray-600 text-sm mt-1">
                  <em>Why excluded:</em> Identical for ICE and EV operations. Labor costs cancel out in comparative analysis. Including would increase absolute figures without changing the delta.
                </p>
              </div>
              
              <div className="border-l-2 border-gray-300 pl-4">
                <strong className="text-gray-800">Charging Downtime Costs</strong>
                <p className="text-gray-600 text-sm mt-1">
                  <em>Why excluded:</em> Highly dependent on charging infrastructure deployment and operational strategy (opportunity charging, overnight charging, battery swaps). Insufficient real-world taxi data. Could be added as a toggle in future iterations.
                </p>
              </div>
              
              <div className="border-l-2 border-gray-300 pl-4">
                <strong className="text-gray-800">Toll/Congestion Charge Benefits</strong>
                <p className="text-gray-600 text-sm mt-1">
                  <em>Why excluded:</em> Policy-dependent and varies by city. NYC does not currently offer universal EV toll discounts. Including would require city-specific policy assumptions beyond core TCO analysis.
                </p>
              </div>
              
              <div className="border-l-2 border-gray-300 pl-4">
                <strong className="text-gray-800">Range Anxiety / Route Limitations</strong>
                <p className="text-gray-600 text-sm mt-1">
                  <em>Why excluded:</em> Qualitative factor difficult to monetise. Modern EVs (300+ mile range) meet typical taxi duty cycles. Operational planning (shift scheduling, charging strategy) can mitigate. Not a direct cost but a fleet management consideration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sources & Assumptions</h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800">NYC Fleet Size (13,587 vehicles)</h4>
              <p className="text-gray-600 text-sm">Source: NYC Taxi & Limousine Commission (TLC) public data, 2023</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800">Annual Mileage (70,000 miles/year)</h4>
              <p className="text-gray-600 text-sm">Source: Industry averages for high-utilisation urban taxis</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800">Fuel Economy (25 MPG ICE)</h4>
              <p className="text-gray-600 text-sm">Source: EPA combined ratings for hybrid taxis (e.g., Toyota Camry Hybrid)</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800">EV Efficiency (0.30 kWh/mile)</h4>
              <p className="text-gray-600 text-sm">Source: EPA ratings for midsize EVs (e.g., Tesla Model 3, Nissan Ariya)</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800">Grid Intensity (350 gCO₂/kWh)</h4>
              <p className="text-gray-600 text-sm">Source: EPA eGRID data for New York State grid mix</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800">ICE Emissions (8.887 kgCO₂/gallon)</h4>
              <p className="text-gray-600 text-sm">Source: EPA standard for gasoline combustion</p>
            </div>
          </div>
        </section>

        {/* Model Equations */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Calculations</h2>
          
          <div className="space-y-4 font-mono text-sm">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="font-semibold text-gray-800 mb-2">Annual Fuel Cost (ICE):</div>
              <code className="text-gray-700">
                cost = (annual_miles / mpg) × fuel_price_per_gallon
              </code>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="font-semibold text-gray-800 mb-2">Annual Electricity Cost (EV):</div>
              <code className="text-gray-700">
                cost = annual_miles × kWh_per_mile × electricity_price_per_kWh
              </code>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="font-semibold text-gray-800 mb-2">Net Present Value (NPV):</div>
              <code className="text-gray-700">
                NPV = Σ(cashflow_year_t / (1 + discount_rate)^t)
              </code>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="font-semibold text-gray-800 mb-2">CO₂ Emissions (ICE):</div>
              <code className="text-gray-700">
                emissions = (annual_miles / mpg) × kg_CO2_per_gallon / 1000
              </code>
            </div>
            
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="font-semibold text-gray-800 mb-2">CO₂ Emissions (EV):</div>
              <code className="text-gray-700">
                emissions = annual_miles × kWh_per_mile × grid_g_CO2_per_kWh / 1_000_000
              </code>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Known Limitations</h2>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2 mt-1">⚠</span>
              <span><strong>Deterministic Model:</strong> Does not account for stochastic demand variations, weather impacts, or seasonal utilisation changes</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2 mt-1">⚠</span>
              <span><strong>Static Grid Intensity:</strong> Assumes constant grid emissions; does not model grid decarbonisation trajectories over analysis period</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2 mt-1">⚠</span>
              <span><strong>Technology Improvements:</strong> Does not project future EV efficiency gains or battery cost reductions</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2 mt-1">⚠</span>
              <span><strong>Infrastructure Constraints:</strong> Assumes charging infrastructure availability; does not model grid capacity or queuing at chargers</span>
            </li>
          </ul>
        </section>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            Dashboard
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}