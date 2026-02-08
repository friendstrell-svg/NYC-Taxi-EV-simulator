'use client'

import { useState } from 'react'
import { calculateModel } from '@/lib/model'
import { SCENARIOS, SCENARIO_LABELS, ScenarioName } from '@/lib/data/presets'
import CostChart from '@/components/CostChart'

export default function Dashboard() {
  // State for selected scenario and inputs
  const [selectedScenario, setSelectedScenario] = useState<ScenarioName>('nyc_defaults')
  const [inputs, setInputs] = useState(SCENARIOS.nyc_defaults)
  const [viewMode, setViewMode] = useState<'per_taxi' | 'fleet'>('fleet')
  
  // Calculate outputs whenever inputs change
  const outputs = calculateModel(inputs)
  
  // Scale outputs based on view mode
  const displayOutputs = viewMode === 'per_taxi' 
    ? {
        ...outputs,
        deltaNpv: outputs.deltaNpv / inputs.fleetSize,
        co2SavedTotal: outputs.co2SavedTotal / inputs.fleetSize,
        co2SavedPerYear: outputs.co2SavedPerYear / inputs.fleetSize,
        annualSeries: outputs.annualSeries.map(d => ({
          ...d,
          cumCostIce: d.cumCostIce / inputs.fleetSize,
          cumCostEv: d.cumCostEv / inputs.fleetSize,
          cashflowIce: d.cashflowIce / inputs.fleetSize,
          cashflowEv: d.cashflowEv / inputs.fleetSize,
          co2Ice: d.co2Ice / inputs.fleetSize,
          co2Ev: d.co2Ev / inputs.fleetSize,
        }))
      }
    : outputs
  
  // Handle scenario change
  const handleScenarioChange = (scenario: ScenarioName) => {
    setSelectedScenario(scenario)
    setInputs(SCENARIOS[scenario])
  }
  
  // When user manually changes an input, switch to custom
  const updateInputAndSetCustom = (key: keyof typeof inputs, value: number | boolean) => {
    setSelectedScenario('custom')
    setInputs(prev => ({ ...prev, [key]: value }))
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              NYC Taxi EV Simulator - Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Adjust parameters to see real-time TCO analysis
            </p>
          </div>
          <a 
            href="/methodology" 
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            View Methodology
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </header>
      
      {/* Scenario Selector & View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 px-6 pt-6">
        {/* Scenario Dropdown */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Scenario
          </label>
          <select
            value={selectedScenario}
            onChange={(e) => handleScenarioChange(e.target.value as ScenarioName)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
          >
            {(Object.keys(SCENARIO_LABELS) as ScenarioName[]).map(key => (
              <option key={key} value={key}>
                {SCENARIO_LABELS[key]}
              </option>
            ))}
          </select>
          {selectedScenario === 'custom' && (
            <p className="text-xs text-gray-500 mt-1">
              Custom values - modify any input below
            </p>
          )}
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            View Mode
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('fleet')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'fleet'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Fleet ({inputs.fleetSize.toLocaleString()} taxis)
            </button>
            <button
              onClick={() => setViewMode('per_taxi')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'per_taxi'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Per Taxi
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* LEFT PANEL - Inputs */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Input Parameters
            </h2>
            
            {/* Fleet Configuration */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Fleet Configuration</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fleet Size: {inputs.fleetSize.toLocaleString()} vehicles
                </label>
                <input
                  type="range"
                  min="1"
                  max="20000"
                  step="100"
                  value={inputs.fleetSize}
                  onChange={(e) => updateInputAndSetCustom('fleetSize', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Miles per Taxi: {inputs.milesPerYearPerTaxi.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="30000"
                  max="100000"
                  step="5000"
                  value={inputs.milesPerYearPerTaxi}
                  onChange={(e) => updateInputAndSetCustom('milesPerYearPerTaxi', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* ICE Parameters */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">ICE Vehicle</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Economy: {inputs.mpgIce} MPG
                </label>
                <input
                  type="range"
                  min="15"
                  max="50"
                  step="1"
                  value={inputs.mpgIce}
                  onChange={(e) => updateInputAndSetCustom('mpgIce', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Price: ${inputs.fuelPricePerGallon.toFixed(2)}/gallon
                </label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  step="0.1"
                  value={inputs.fuelPricePerGallon}
                  onChange={(e) => updateInputAndSetCustom('fuelPricePerGallon', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* EV Parameters */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">EV Vehicle</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Efficiency: {inputs.kWhPerMileEv.toFixed(2)} kWh/mile
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="0.5"
                  step="0.01"
                  value={inputs.kWhPerMileEv}
                  onChange={(e) => updateInputAndSetCustom('kWhPerMileEv', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Electricity Price: ${inputs.elecPricePerKWh.toFixed(2)}/kWh
                </label>
                <input
                  type="range"
                  min="0.08"
                  max="0.30"
                  step="0.01"
                  value={inputs.elecPricePerKWh}
                  onChange={(e) => updateInputAndSetCustom('elecPricePerKWh', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Financial Parameters */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Financial</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Analysis Period: {inputs.years} years
                </label>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="1"
                  value={inputs.years}
                  onChange={(e) => updateInputAndSetCustom('years', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Rate: {(inputs.discountRate * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.10"
                  step="0.005"
                  value={inputs.discountRate}
                  onChange={(e) => updateInputAndSetCustom('discountRate', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            <button
              onClick={() => handleScenarioChange('nyc_defaults')}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Reset to NYC Defaults
            </button>
          </div>
        </div>
        
        {/* RIGHT PANEL - Outputs */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Results
            </h2>

            {/* Business Summary - Front & Center */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 mb-6 text-white">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                Business Case Summary
                {viewMode === 'per_taxi' && <span className="ml-2 text-sm font-normal opacity-90">(Per Taxi)</span>}
                {viewMode === 'fleet' && <span className="ml-2 text-sm font-normal opacity-90">(Fleet-Wide)</span>}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-blue-100 text-xs font-semibold uppercase tracking-wide mb-1">
                    NPV Advantage
                  </div>
                  <div className="text-2xl font-bold">
                    {displayOutputs.deltaNpv < 0 
                      ? `$${Math.abs(displayOutputs.deltaNpv / 1000).toFixed(0)}k savings`
                      : `$${(displayOutputs.deltaNpv / 1000).toFixed(0)}k loss`
                    }
                  </div>
                </div>
                
                <div>
                  <div className="text-blue-100 text-xs font-semibold uppercase tracking-wide mb-1">
                    Payback Period
                  </div>
                  <div className="text-2xl font-bold">
                    {displayOutputs.paybackYear !== null 
                      ? `${displayOutputs.paybackYear} years`
                      : 'Never'
                    }
                  </div>
                </div>
                
                <div>
                  <div className="text-blue-100 text-xs font-semibold uppercase tracking-wide mb-1">
                    CO₂ Reduction
                  </div>
                  <div className="text-2xl font-bold">
                    {((displayOutputs.co2SavedTotal / (displayOutputs.co2SavedTotal + (displayOutputs.annualSeries[inputs.years]?.co2Ev || 1))) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <div className="border-t border-blue-500 pt-3 mt-3">
                <p className="text-sm text-blue-50">
                  {displayOutputs.deltaNpv < 0 
                    ? `✓ EV transition shows positive NPV. Break-even occurs in year ${displayOutputs.paybackYear || 'N/A'}.`
                    : `⚠ Current assumptions show ICE as more cost-effective. Adjust scenarios to explore conditions favoring EVs.`
                  }
                </p>
              </div>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-1">
                  NPV Savings (EV vs ICE)
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  ${(displayOutputs.deltaNpv / 1000).toFixed(0)}k
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  {displayOutputs.deltaNpv < 0 ? 'EV saves money' : 'ICE is cheaper'}
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <div className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-1">
                  Payback Period
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {displayOutputs.paybackYear !== null ? `${displayOutputs.paybackYear} years` : 'Never'}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  When cumulative EV cost &lt; ICE
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <div className="text-sm font-semibold text-purple-700 uppercase tracking-wide mb-1">
                  Cost per Mile
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  ${displayOutputs.costPerMileEv.toFixed(2)}
                </div>
                <div className="text-xs text-purple-600 mt-1">
                  EV vs ${displayOutputs.costPerMileIce.toFixed(2)} ICE
                </div>
              </div>
              
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
                <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-1">
                  CO₂ Saved (Total)
                </div>
                <div className="text-2xl font-bold text-emerald-900">
                  {(displayOutputs.co2SavedTotal / 1000).toFixed(1)}k tonnes
                </div>
                <div className="text-xs text-emerald-600 mt-1">
                  Over {inputs.years} years
                </div>
              </div>
            </div>
            
            {/* Cost Chart */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-3">
                Cumulative Cost Over Time
              </h3>
              <CostChart data={displayOutputs.annualSeries} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}