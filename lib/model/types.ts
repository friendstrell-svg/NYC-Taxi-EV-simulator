/**
 * Input parameters for the TCO model
 */
export interface ModelInputs {
  // Fleet configuration
  fleetSize: number
  milesPerYearPerTaxi: number
  
  // ICE vehicle parameters
  mpgIce: number
  fuelPricePerGallon: number
  maintPerMileIce: number
  capexIce: number
  
  // EV vehicle parameters
  kWhPerMileEv: number
  elecPricePerKWh: number
  maintPerMileEv: number
  capexEv: number
  
  // Charging infrastructure
  chargerCapexPerVehicle: number
  
  // Incentives
  incentivePerVehicle: number
  
  // Financial parameters
  discountRate: number
  years: number
  
  // Emissions parameters
  gridIntensity_g_per_kWh: number
  ice_kgCO2_per_gal: number
  
  // Battery replacement (optional)
  batteryReplacementEnabled: boolean
  batteryReplacementYear?: number
  batteryReplacementCost?: number
}

/**
 * Annual data point in the time series
 */
export interface AnnualData {
  year: number
  
  // Cashflows
  cashflowIce: number
  cashflowEv: number
  
  // Cumulative costs
  cumCostIce: number
  cumCostEv: number
  
  // Emissions
  co2Ice: number  // tonnes per year
  co2Ev: number   // tonnes per year
}

/**
 * Complete model outputs
 */
export interface ModelOutputs {
  // Time series data
  annualSeries: AnnualData[]
  
  // Financial metrics
  npvIce: number
  npvEv: number
  deltaNpv: number  // EV - ICE (positive means EV saves money)
  
  // Payback
  paybackYear: number | null  // null if never pays back
  
  // Cost per mile
  costPerMileIce: number
  costPerMileEv: number
  
  // Emissions savings
  co2SavedPerYear: number  // Average annual savings (tonnes)
  co2SavedTotal: number    // Total over analysis period (tonnes)
}
