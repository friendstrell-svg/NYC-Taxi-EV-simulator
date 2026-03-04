import { ModelInputs, ModelOutputs, AnnualData } from './model/types'

/**
 * Convert data to CSV format and trigger download
 */
export function exportToCSV(
  inputs: ModelInputs,
  outputs: ModelOutputs,
  viewMode: 'fleet' | 'per_taxi'
) {
  const scaleFactor = viewMode === 'per_taxi' ? 1 / inputs.fleetSize : 1
  
  // Build CSV content
  let csv = ''
  
  // Header section
  csv += 'NYC Taxi EV Simulator - Analysis Results\n'
  csv += `Generated: ${new Date().toLocaleString()}\n`
  csv += `View Mode: ${viewMode === 'fleet' ? 'Fleet-Wide' : 'Per Taxi'}\n`
  csv += '\n'
  
  // Input Parameters
  csv += 'INPUT PARAMETERS\n'
  csv += 'Parameter,Value\n'
  csv += `Fleet Size,${inputs.fleetSize}\n`
  csv += `Annual Miles per Taxi,${inputs.milesPerYearPerTaxi}\n`
  csv += `Analysis Period (years),${inputs.years}\n`
  csv += `Discount Rate,${(inputs.discountRate * 100).toFixed(1)}%\n`
  csv += `ICE Fuel Economy (MPG),${inputs.mpgIce}\n`
  csv += `Fuel Price ($/gallon),${inputs.fuelPricePerGallon.toFixed(2)}\n`
  csv += `ICE Maintenance ($/mile),${inputs.maintPerMileIce.toFixed(2)}\n`
  csv += `EV Efficiency (kWh/mile),${inputs.kWhPerMileEv.toFixed(2)}\n`
  csv += `Electricity Price ($/kWh),${inputs.elecPricePerKWh.toFixed(2)}\n`
  csv += `EV Maintenance ($/mile),${inputs.maintPerMileEv.toFixed(2)}\n`
  csv += `EV Purchase Price ($),${inputs.capexEv}\n`
  csv += `EV Incentive ($/vehicle),${inputs.incentivePerVehicle}\n`
  csv += `Grid Intensity (gCO2/kWh),${inputs.gridIntensity_g_per_kWh}\n`
  csv += '\n'
  
  // Summary Metrics
  csv += 'SUMMARY METRICS\n'
  csv += 'Metric,Value\n'
  csv += `NPV Savings (EV vs ICE),${(outputs.deltaNpv * scaleFactor).toFixed(0)}\n`
  csv += `Payback Period (years),${outputs.paybackYear !== null ? outputs.paybackYear : 'Never'}\n`
  csv += `ICE Cost per Mile,${outputs.costPerMileIce.toFixed(2)}\n`
  csv += `EV Cost per Mile,${outputs.costPerMileEv.toFixed(2)}\n`
  csv += `Total CO2 Saved (tonnes),${(outputs.co2SavedTotal * scaleFactor).toFixed(1)}\n`
  csv += `Annual CO2 Saved (tonnes/year),${(outputs.co2SavedPerYear * scaleFactor).toFixed(1)}\n`
  csv += '\n'
  
  // Annual Breakdown
  csv += 'ANNUAL BREAKDOWN\n'
  csv += 'Year,ICE Cashflow,EV Cashflow,Difference,ICE Cumulative,EV Cumulative,ICE CO2,EV CO2,CO2 Saved\n'
  
  outputs.annualSeries.forEach(row => {
    const diff = (row.cashflowEv - row.cashflowIce) * scaleFactor
    const co2Saved = (row.co2Ice - row.co2Ev) * scaleFactor
    
    csv += `${row.year},`
    csv += `${(row.cashflowIce * scaleFactor).toFixed(0)},`
    csv += `${(row.cashflowEv * scaleFactor).toFixed(0)},`
    csv += `${diff.toFixed(0)},`
    csv += `${(row.cumCostIce * scaleFactor).toFixed(0)},`
    csv += `${(row.cumCostEv * scaleFactor).toFixed(0)},`
    csv += `${(row.co2Ice * scaleFactor).toFixed(2)},`
    csv += `${(row.co2Ev * scaleFactor).toFixed(2)},`
    csv += `${co2Saved.toFixed(2)}\n`
  })
  
  // Create blob and trigger download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `nyc-taxi-ev-analysis-${viewMode}-${Date.now()}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}