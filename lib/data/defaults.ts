import { ModelInputs } from '../model/types'

/**
 * NYC Yellow Taxi default assumptions
 * Sources: TLC data, EPA standards, industry averages
 */
export const NYC_DEFAULTS: ModelInputs = {
  // Fleet configuration
  fleetSize: 13587, // NYC TLC licensed yellow cabs (2023)
  milesPerYearPerTaxi: 70000, // Typical taxi utilisation
  
  // ICE vehicle parameters
  mpgIce: 25, // Average fuel economy for taxi hybrids
  fuelPricePerGallon: 3.50, // NYC average petrol price (USD)
  maintPerMileIce: 0.10, // Maintenance cost per mile
  capexIce: 30000, // Purchase price ICE taxi
  
  // EV vehicle parameters
  kWhPerMileEv: 0.30, // EV efficiency (e.g., Tesla Model 3)
  elecPricePerKWh: 0.20, // NYC commercial electricity rate
  maintPerMileEv: 0.06, // Lower maintenance for EVs
  capexEv: 45000, // Purchase price EV taxi
  
  // Charging infrastructure
  chargerCapexPerVehicle: 3000, // Shared charging infrastructure allocation
  
  // Incentives
  incentivePerVehicle: 7500, // Federal EV tax credit
  
  // Financial parameters
  discountRate: 0.05, // 5% discount rate
  years: 10, // 10-year analysis period
  
  // Emissions parameters
  gridIntensity_g_per_kWh: 350, // NYC grid carbon intensity (gCO2/kWh)
  ice_kgCO2_per_gal: 8.887, // EPA standard for petrol combustion
  
  // Battery replacement
  batteryReplacementEnabled: false,
  batteryReplacementYear: 8,
  batteryReplacementCost: 12000,
}