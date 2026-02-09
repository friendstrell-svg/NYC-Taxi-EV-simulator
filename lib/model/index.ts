/**
 * NYC Taxi EV TCO Model
 * Clean exports for all model functions and types
 */

// Export types
export type { ModelInputs, ModelOutputs, AnnualData } from './types'

// Export calculation functions
export {
  calculateIceFuelCost,
  calculateEvElectricityCost,
  calculateIceCO2,
  calculateEvCO2,
  calculateNPV,
  findPaybackYear,
  calculateModel,
} from './calculations'

// Export sensitivity analysis
export type { SensitivityResult } from './sensitivity'
export { calculateSensitivity } from './sensitivity'