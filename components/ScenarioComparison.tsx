'use client'

import { useState } from 'react'
import { calculateModel } from '@/lib/model'
import { SCENARIOS, SCENARIO_LABELS, ScenarioName } from '@/lib/data/presets'
import { ModelOutputs } from '@/lib/model/types'

interface ComparisonData {
  scenario: ScenarioName
  label: string
  outputs: ModelOutputs
}

export default function ScenarioComparison() {
  const [selectedScenarios, setSelectedScenarios] = useState<ScenarioName[]>(['nyc_defaults', 'optimistic'])
  
  // Calculate outputs for each selected scenario
  const comparisonData: ComparisonData[] = selectedScenarios.map(scenario => ({
    scenario,
    label: SCENARIO_LABELS[scenario],
    outputs: calculateModel(SCENARIOS[scenario])
  }))
  
  const availableScenarios: ScenarioName[] = ['nyc_defaults', 'optimistic', 'pessimistic']
  
  const toggleScenario = (scenario: ScenarioName) => {
    if (selectedScenarios.includes(scenario)) {
      // Don't allow removing if only one selected
      if (selectedScenarios.length > 1) {
        setSelectedScenarios(selectedScenarios.filter(s => s !== scenario))
      }
    } else {
      // Don't allow more than 3
      if (selectedScenarios.length < 3) {
        setSelectedScenarios([...selectedScenarios, scenario])
      }
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">
        Scenario Comparison
      </h2>
      
      {/* Scenario Selector */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3">
          Select 2-3 scenarios to compare (click to toggle):
        </p>
        <div className="flex gap-3 flex-wrap">
          {availableScenarios.map(scenario => (
            <button
              key={scenario}
              onClick={() => toggleScenario(scenario)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedScenarios.includes(scenario)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {SCENARIO_LABELS[scenario]}
            </button>
          ))}
        </div>
      </div>
      
      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b border-r">
                Metric
              </th>
              {comparisonData.map(data => (
                <th 
                  key={data.scenario}
                  className="px-4 py-3 text-center font-semibold text-gray-700 border-b border-r last:border-r-0"
                >
                  {data.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* NPV Savings */}
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-gray-900 border-b border-r">
                NPV Savings (Fleet)
              </td>
              {comparisonData.map(data => (
                <td 
                  key={data.scenario}
                  className={`px-4 py-3 text-center border-b border-r last:border-r-0 font-semibold ${
                    data.outputs.deltaNpv < 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {data.outputs.deltaNpv < 0 ? '-' : '+'}
                  ${Math.abs(data.outputs.deltaNpv / 1_000_000).toFixed(1)}M
                </td>
              ))}
            </tr>
            
            {/* NPV per Taxi */}
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900 border-b border-r">
                NPV per Taxi
              </td>
              {comparisonData.map(data => (
                <td 
                  key={data.scenario}
                  className={`px-4 py-3 text-center border-b border-r last:border-r-0 font-semibold ${
                    data.outputs.deltaNpv < 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {data.outputs.deltaNpv < 0 ? '-' : '+'}
                  ${Math.abs(data.outputs.deltaNpv / SCENARIOS[data.scenario].fleetSize / 1000).toFixed(0)}k
                </td>
              ))}
            </tr>
            
            {/* Payback Period */}
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-gray-900 border-b border-r">
                Payback Period
              </td>
              {comparisonData.map(data => (
                <td 
                  key={data.scenario}
                  className="px-4 py-3 text-center border-b border-r last:border-r-0 text-gray-700"
                >
                  {data.outputs.paybackYear !== null ? `${data.outputs.paybackYear} years` : 'Never'}
                </td>
              ))}
            </tr>
            
            {/* Cost per Mile - ICE */}
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900 border-b border-r">
                ICE Cost per Mile
              </td>
              {comparisonData.map(data => (
                <td 
                  key={data.scenario}
                  className="px-4 py-3 text-center border-b border-r last:border-r-0 text-gray-700"
                >
                  ${data.outputs.costPerMileIce.toFixed(2)}
                </td>
              ))}
            </tr>
            
            {/* Cost per Mile - EV */}
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-gray-900 border-b border-r">
                EV Cost per Mile
              </td>
              {comparisonData.map(data => (
                <td 
                  key={data.scenario}
                  className="px-4 py-3 text-center border-b border-r last:border-r-0 text-gray-700"
                >
                  ${data.outputs.costPerMileEv.toFixed(2)}
                </td>
              ))}
            </tr>
            
            {/* Total CO2 Saved */}
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900 border-b border-r">
                Total CO₂ Saved
              </td>
              {comparisonData.map(data => (
                <td 
                  key={data.scenario}
                  className="px-4 py-3 text-center border-b border-r last:border-r-0 text-green-600 font-semibold"
                >
                  {(data.outputs.co2SavedTotal / 1000).toFixed(0)}k tonnes
                </td>
              ))}
            </tr>
            
            {/* Annual CO2 Saved */}
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-gray-900 border-r">
                Annual CO₂ Saved
              </td>
              {comparisonData.map(data => (
                <td 
                  key={data.scenario}
                  className="px-4 py-3 text-center border-r last:border-r-0 text-green-600 font-semibold"
                >
                  {(data.outputs.co2SavedPerYear / 1000).toFixed(0)}k tonnes/yr
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Key Insights */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Key Insights</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>NPV Savings:</strong> Shows total financial advantage of EV transition</li>
          <li>• <strong>Payback Period:</strong> How quickly the investment pays for itself</li>
          <li>• <strong>Cost per Mile:</strong> Operating cost efficiency comparison</li>
          <li>• <strong>CO₂ Saved:</strong> Environmental impact of electrification</li>
        </ul>
      </div>
    </div>
  )
}