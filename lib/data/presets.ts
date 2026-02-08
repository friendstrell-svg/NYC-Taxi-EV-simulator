import { ModelInputs } from '../model/types'

/**
 * Scenario presets for different analysis cases
 */

export const NYC_DEFAULTS: ModelInputs = {
  // Fleet configuration
  fleetSize: 13587,
  milesPerYearPerTaxi: 70000,
  
  // ICE vehicle parameters
  mpgIce: 25,
  fuelPricePerGallon: 3.50,
  maintPerMileIce: 0.10,
  capexIce: 30000,
  
  // EV vehicle parameters
  kWhPerMileEv: 0.30,
  elecPricePerKWh: 0.20,
  maintPerMileEv: 0.06,
  capexEv: 45000,
  
  // Charging infrastructure
  chargerCapexPerVehicle: 3000,
  
  // Incentives
  incentivePerVehicle: 7500,
  
  // Financial parameters
  discountRate: 0.05,
  years: 10,
  
  // Emissions parameters
  gridIntensity_g_per_kWh: 350,
  ice_kgCO2_per_gal: 8.887,
  
  // Battery replacement
  batteryReplacementEnabled: false,
  batteryReplacementYear: 8,
  batteryReplacementCost: 12000,
}

export const OPTIMISTIC_SCENARIO: ModelInputs = {
  ...NYC_DEFAULTS,
  // Favorable for EVs
  fuelPricePerGallon: 5.00,        // High fuel prices
  elecPricePerKWh: 0.12,           // Low electricity prices
  maintPerMileEv: 0.04,            // Lower EV maintenance
  capexEv: 40000,                  // Lower EV cost (subsidies, competition)
  incentivePerVehicle: 10000,      // Higher incentives
  gridIntensity_g_per_kWh: 250,    // Cleaner grid
  batteryReplacementEnabled: false, // No battery replacement needed
}

export const PESSIMISTIC_SCENARIO: ModelInputs = {
  ...NYC_DEFAULTS,
  // Unfavorable for EVs
  fuelPricePerGallon: 2.50,        // Low fuel prices
  elecPricePerKWh: 0.28,           // High electricity prices
  maintPerMileEv: 0.08,            // Higher EV maintenance
  capexEv: 50000,                  // Higher EV cost
  incentivePerVehicle: 5000,       // Lower incentives
  gridIntensity_g_per_kWh: 450,    // Dirtier grid
  batteryReplacementEnabled: true, // Battery needs replacement
  batteryReplacementYear: 6,
  batteryReplacementCost: 15000,
}

export type ScenarioName = 'nyc_defaults' | 'optimistic' | 'pessimistic' | 'custom'

export const SCENARIOS: Record<ScenarioName, ModelInputs> = {
  nyc_defaults: NYC_DEFAULTS,
  optimistic: OPTIMISTIC_SCENARIO,
  pessimistic: PESSIMISTIC_SCENARIO,
  custom: NYC_DEFAULTS, // Custom starts from NYC defaults
}

export const SCENARIO_LABELS: Record<ScenarioName, string> = {
  nyc_defaults: 'NYC Defaults',
  optimistic: 'Optimistic',
  pessimistic: 'Pessimistic',
  custom: 'Custom',
}