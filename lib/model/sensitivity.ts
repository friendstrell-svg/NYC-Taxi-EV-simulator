import { ModelInputs } from './types'
import { calculateModel } from './calculations'

export interface SensitivityResult {
  parameter: string
  displayName: string
  baseNpv: number
  npvUp: number      // NPV when parameter increases by 10%
  npvDown: number    // NPV when parameter decreases by 10%
  impactUp: number   // Change from base (positive = better for EV)
  impactDown: number // Change from base (negative = worse for EV)
  totalImpact: number // Absolute total swing
}

/**
 * Run sensitivity analysis on key parameters
 * Varies each parameter by ±10% and measures NPV impact
 */
export function calculateSensitivity(baseInputs: ModelInputs): SensitivityResult[] {
  const baseOutputs = calculateModel(baseInputs)
  const baseNpv = baseOutputs.deltaNpv
  
  const results: SensitivityResult[] = []
  
  // Define parameters to test
  const parametersToTest: Array<{
    key: keyof ModelInputs
    displayName: string
    numericOnly: boolean
  }> = [
    { key: 'fuelPricePerGallon', displayName: 'Fuel Price', numericOnly: true },
    { key: 'elecPricePerKWh', displayName: 'Electricity Price', numericOnly: true },
    { key: 'fleetSize', displayName: 'Fleet Size', numericOnly: true },
    { key: 'milesPerYearPerTaxi', displayName: 'Annual Mileage', numericOnly: true },
    { key: 'capexEv', displayName: 'EV Purchase Price', numericOnly: true },
    { key: 'maintPerMileEv', displayName: 'EV Maintenance Cost', numericOnly: true },
    { key: 'discountRate', displayName: 'Discount Rate', numericOnly: true },
    { key: 'gridIntensity_g_per_kWh', displayName: 'Grid Carbon Intensity', numericOnly: true },
  ]
  
  for (const param of parametersToTest) {
    const baseValue = baseInputs[param.key]
    
    // Skip if not a number
    if (typeof baseValue !== 'number') continue
    
    // Calculate NPV with +10% change
    const inputsUp = { ...baseInputs, [param.key]: baseValue * 1.10 }
    const outputsUp = calculateModel(inputsUp)
    const npvUp = outputsUp.deltaNpv
    
    // Calculate NPV with -10% change
    const inputsDown = { ...baseInputs, [param.key]: baseValue * 0.90 }
    const outputsDown = calculateModel(inputsDown)
    const npvDown = outputsDown.deltaNpv
    
    // Calculate impacts
    const impactUp = npvUp - baseNpv
    const impactDown = npvDown - baseNpv
    const totalImpact = Math.abs(impactUp) + Math.abs(impactDown)
    
    results.push({
      parameter: param.key,
      displayName: param.displayName,
      baseNpv,
      npvUp,
      npvDown,
      impactUp,
      impactDown,
      totalImpact,
    })
  }
  
  // Sort by total impact (highest risk drivers first)
  return results.sort((a, b) => b.totalImpact - a.totalImpact)
}