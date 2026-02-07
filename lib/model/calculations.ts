import { ModelInputs, ModelOutputs, AnnualData } from './types'

/**
 * Calculate annual fuel cost for ICE vehicle
 */
export function calculateIceFuelCost(
  annualMiles: number,
  mpg: number,
  fuelPrice: number
): number {
  const gallons = annualMiles / mpg
  return gallons * fuelPrice
}

/**
 * Calculate annual electricity cost for EV
 */
export function calculateEvElectricityCost(
  annualMiles: number,
  kWhPerMile: number,
  elecPrice: number
): number {
  const kWh = annualMiles * kWhPerMile
  return kWh * elecPrice
}

/**
 * Calculate annual CO₂ emissions for ICE (tonnes)
 */
export function calculateIceCO2(
  annualMiles: number,
  mpg: number,
  kgCO2PerGal: number
): number {
  const gallons = annualMiles / mpg
  const kgCO2 = gallons * kgCO2PerGal
  return kgCO2 / 1000 // Convert to tonnes
}

/**
 * Calculate annual CO₂ emissions for EV (tonnes)
 */
export function calculateEvCO2(
  annualMiles: number,
  kWhPerMile: number,
  gridIntensity_g_per_kWh: number
): number {
  const kWh = annualMiles * kWhPerMile
  const gCO2 = kWh * gridIntensity_g_per_kWh
  return gCO2 / 1_000_000 // Convert grams to tonnes
}

/**
 * Calculate Net Present Value (NPV) from array of cashflows
 */
export function calculateNPV(
  cashflows: number[],
  discountRate: number
): number {
  return cashflows.reduce((npv, cashflow, year) => {
    return npv + cashflow / Math.pow(1 + discountRate, year)
  }, 0)
}

/**
 * Find the payback year (first year cumulative savings > 0)
 */
export function findPaybackYear(
  cumCostIce: number[],
  cumCostEv: number[]
): number | null {
  for (let i = 0; i < cumCostIce.length; i++) {
    if (cumCostIce[i] > cumCostEv[i]) {
      return i
    }
  }
  return null // Never pays back within analysis period
}

/**
 * Main model calculation function
 */
export function calculateModel(inputs: ModelInputs): ModelOutputs {
  const annualSeries: AnnualData[] = []
  
  // Arrays to track cumulative costs
  const cashflowsIce: number[] = []
  const cashflowsEv: number[] = []
  const cumCostIce: number[] = []
  const cumCostEv: number[] = []
  
  // Year 0: Initial capital expenditure
  const year0CashflowIce = inputs.capexIce * inputs.fleetSize
  const year0CashflowEv = 
    (inputs.capexEv + inputs.chargerCapexPerVehicle) * inputs.fleetSize -
    (inputs.incentivePerVehicle * inputs.fleetSize)
  
  cashflowsIce.push(year0CashflowIce)
  cashflowsEv.push(year0CashflowEv)
  cumCostIce.push(year0CashflowIce)
  cumCostEv.push(year0CashflowEv)
  
  annualSeries.push({
    year: 0,
    cashflowIce: year0CashflowIce,
    cashflowEv: year0CashflowEv,
    cumCostIce: year0CashflowIce,
    cumCostEv: year0CashflowEv,
    co2Ice: 0,
    co2Ev: 0,
  })
  
  // Years 1 to N: Operating expenses
  for (let year = 1; year <= inputs.years; year++) {
    // ICE annual costs
    const iceFuel = calculateIceFuelCost(
      inputs.milesPerYearPerTaxi,
      inputs.mpgIce,
      inputs.fuelPricePerGallon
    )
    const iceMaint = inputs.milesPerYearPerTaxi * inputs.maintPerMileIce
    const iceOpex = (iceFuel + iceMaint) * inputs.fleetSize
    
    // EV annual costs
    const evElec = calculateEvElectricityCost(
      inputs.milesPerYearPerTaxi,
      inputs.kWhPerMileEv,
      inputs.elecPricePerKWh
    )
    const evMaint = inputs.milesPerYearPerTaxi * inputs.maintPerMileEv
    let evOpex = (evElec + evMaint) * inputs.fleetSize
    
    // Battery replacement (if enabled and at the right year)
    if (
      inputs.batteryReplacementEnabled &&
      inputs.batteryReplacementYear === year &&
      inputs.batteryReplacementCost
    ) {
      evOpex += inputs.batteryReplacementCost * inputs.fleetSize
    }
    
    cashflowsIce.push(iceOpex)
    cashflowsEv.push(evOpex)
    
    const newCumIce = cumCostIce[cumCostIce.length - 1] + iceOpex
    const newCumEv = cumCostEv[cumCostEv.length - 1] + evOpex
    cumCostIce.push(newCumIce)
    cumCostEv.push(newCumEv)
    
    // Emissions (per taxi, then multiply by fleet)
    const co2IcePerTaxi = calculateIceCO2(
      inputs.milesPerYearPerTaxi,
      inputs.mpgIce,
      inputs.ice_kgCO2_per_gal
    )
    const co2EvPerTaxi = calculateEvCO2(
      inputs.milesPerYearPerTaxi,
      inputs.kWhPerMileEv,
      inputs.gridIntensity_g_per_kWh
    )
    
    annualSeries.push({
      year,
      cashflowIce: iceOpex,
      cashflowEv: evOpex,
      cumCostIce: newCumIce,
      cumCostEv: newCumEv,
      co2Ice: co2IcePerTaxi * inputs.fleetSize,
      co2Ev: co2EvPerTaxi * inputs.fleetSize,
    })
  }
  
  // Calculate NPVs
  const npvIce = calculateNPV(cashflowsIce, inputs.discountRate)
  const npvEv = calculateNPV(cashflowsEv, inputs.discountRate)
  
  // Find payback year
  const paybackYear = findPaybackYear(cumCostIce, cumCostEv)
  
  // Cost per mile (total cost / total miles)
  const totalMiles = inputs.milesPerYearPerTaxi * inputs.years * inputs.fleetSize
  const costPerMileIce = cumCostIce[cumCostIce.length - 1] / totalMiles
  const costPerMileEv = cumCostEv[cumCostEv.length - 1] / totalMiles
  
  // CO₂ savings
  const totalCO2Ice = annualSeries
    .slice(1) // Skip year 0
    .reduce((sum, data) => sum + data.co2Ice, 0)
  const totalCO2Ev = annualSeries
    .slice(1)
    .reduce((sum, data) => sum + data.co2Ev, 0)
  
  return {
    annualSeries,
    npvIce,
    npvEv,
    deltaNpv: npvEv - npvIce,
    paybackYear,
    costPerMileIce,
    costPerMileEv,
    co2SavedPerYear: (totalCO2Ice - totalCO2Ev) / inputs.years,
    co2SavedTotal: totalCO2Ice - totalCO2Ev,
  }
}
