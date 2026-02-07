import { describe, it, expect } from 'vitest'
import {
  calculateIceFuelCost,
  calculateEvElectricityCost,
  calculateIceCO2,
  calculateEvCO2,
  calculateNPV,
  findPaybackYear,
  calculateModel,
  type ModelInputs,
} from '@/lib/model'

describe('TCO Calculation Engine', () => {
  
  describe('calculateIceFuelCost', () => {
    it('calculates fuel cost correctly', () => {
      // 100 miles ÷ 25 MPG = 4 gallons × £3.50 = £14
      const cost = calculateIceFuelCost(100, 25, 3.50)
      expect(cost).toBe(14)
    })
    
    it('handles high mileage', () => {
      // 70,000 miles ÷ 25 MPG = 2,800 gallons × £4.00 = £11,200
      const cost = calculateIceFuelCost(70000, 25, 4.00)
      expect(cost).toBe(11200)
    })
  })
  
  describe('calculateEvElectricityCost', () => {
    it('calculates electricity cost correctly', () => {
      // 100 miles × 0.3 kWh/mile = 30 kWh × £0.15 = £4.50
      const cost = calculateEvElectricityCost(100, 0.3, 0.15)
      expect(cost).toBe(4.5)
    })
    
    it('handles annual mileage', () => {
      // 70,000 miles × 0.3 kWh/mile = 21,000 kWh × £0.12 = £2,520
      const cost = calculateEvElectricityCost(70000, 0.3, 0.12)
      expect(cost).toBe(2520)
    })
  })
  
  describe('calculateIceCO2', () => {
    it('calculates ICE emissions in tonnes', () => {
      // 100 miles ÷ 25 MPG = 4 gallons × 8.887 kgCO2/gal = 35.548 kg = 0.035548 tonnes
      const co2 = calculateIceCO2(100, 25, 8.887)
      expect(co2).toBeCloseTo(0.035548, 5)
    })
    
    it('handles annual emissions', () => {
      // 70,000 miles ÷ 25 MPG = 2,800 gallons × 8.887 kgCO2/gal = 24,883.6 kg ≈ 24.88 tonnes
      const co2 = calculateIceCO2(70000, 25, 8.887)
      expect(co2).toBeCloseTo(24.88, 2)
    })
  })
  
  describe('calculateEvCO2', () => {
    it('calculates EV emissions in tonnes', () => {
      // 100 miles × 0.3 kWh/mile = 30 kWh × 400 gCO2/kWh = 12,000 g = 0.012 tonnes
      const co2 = calculateEvCO2(100, 0.3, 400)
      expect(co2).toBe(0.012)
    })
    
    it('handles annual emissions', () => {
      // 70,000 miles × 0.3 kWh/mile = 21,000 kWh × 400 g/kWh = 8,400,000 g = 8.4 tonnes
      const co2 = calculateEvCO2(70000, 0.3, 400)
      expect(co2).toBe(8.4)
    })
  })
  
  describe('calculateNPV', () => {
    it('calculates NPV with zero discount rate', () => {
      const cashflows = [100, 100, 100]
      const npv = calculateNPV(cashflows, 0)
      expect(npv).toBe(300) // No discounting
    })
    
    it('calculates NPV with 5% discount rate', () => {
      const cashflows = [100, 100, 100]
      // Year 0: 100/1.00 = 100
      // Year 1: 100/1.05 = 95.238
      // Year 2: 100/1.1025 = 90.703
      // Total ≈ 285.94
      const npv = calculateNPV(cashflows, 0.05)
      expect(npv).toBeCloseTo(285.94, 1)
    })
    
    it('handles negative cashflows (investments)', () => {
      const cashflows = [-10000, 3000, 3000, 3000, 3000]
      const npv = calculateNPV(cashflows, 0.05)
      // Year 0: -10000/1.00 = -10000
      // Year 1:   3000/1.05 =   2857.14
      // Year 2:   3000/1.1025 = 2721.09
      // Year 3:   3000/1.1576 =  2591.51
      // Year 4:   3000/1.2155 =  2468.11
      // Total NPV ≈ 637.85
      expect(npv).toBeCloseTo(637.85, 2)
    })
  })
  
  describe('findPaybackYear', () => {
    it('finds payback year when EV becomes cheaper', () => {
      const cumCostIce = [50000, 60000, 70000, 80000, 90000]
      const cumCostEv = [60000, 65000, 69000, 72000, 74000]
      // EV becomes cheaper at year 2 (70k vs 69k)
      const payback = findPaybackYear(cumCostIce, cumCostEv)
      expect(payback).toBe(2)
    })
    
    it('returns null if never pays back', () => {
      const cumCostIce = [50000, 60000, 70000]
      const cumCostEv = [80000, 90000, 100000]
      // EV never becomes cheaper
      const payback = findPaybackYear(cumCostIce, cumCostEv)
      expect(payback).toBeNull()
    })
    
    it('handles immediate payback (year 0)', () => {
      const cumCostIce = [50000, 60000, 70000]
      const cumCostEv = [40000, 45000, 50000]
      // EV cheaper from the start
      const payback = findPaybackYear(cumCostIce, cumCostEv)
      expect(payback).toBe(0)
    })
  })
  
  describe('calculateModel - Integration Test', () => {
    it('produces valid outputs with realistic inputs', () => {
      const inputs: ModelInputs = {
        fleetSize: 100,
        milesPerYearPerTaxi: 70000,
        mpgIce: 25,
        fuelPricePerGallon: 4.0,
        maintPerMileIce: 0.10,
        capexIce: 30000,
        kWhPerMileEv: 0.3,
        elecPricePerKWh: 0.12,
        maintPerMileEv: 0.05,
        capexEv: 50000,
        chargerCapexPerVehicle: 5000,
        incentivePerVehicle: 7500,
        discountRate: 0.05,
        years: 10,
        gridIntensity_g_per_kWh: 400,
        ice_kgCO2_per_gal: 8.887,
        batteryReplacementEnabled: false,
      }
      
      const outputs = calculateModel(inputs)
      
      // Check structure
      expect(outputs.annualSeries).toHaveLength(11) // Years 0-10
      expect(outputs.annualSeries[0].year).toBe(0)
      expect(outputs.annualSeries[10].year).toBe(10)
      
      // Check NPV calculations exist
      expect(typeof outputs.npvIce).toBe('number')
      expect(typeof outputs.npvEv).toBe('number')
      expect(typeof outputs.deltaNpv).toBe('number')
      
      // Check cost per mile
      expect(outputs.costPerMileIce).toBeGreaterThan(0)
      expect(outputs.costPerMileEv).toBeGreaterThan(0)
      
      // Check emissions savings
      expect(outputs.co2SavedTotal).toBeGreaterThan(0) // EV should save emissions
      expect(outputs.co2SavedPerYear).toBeGreaterThan(0)
      
      // Payback should occur at some point (or be null)
      expect(outputs.paybackYear === null || outputs.paybackYear >= 0).toBe(true)
    })
    
    it('handles battery replacement correctly', () => {
      const inputs: ModelInputs = {
        fleetSize: 1,
        milesPerYearPerTaxi: 70000,
        mpgIce: 25,
        fuelPricePerGallon: 4.0,
        maintPerMileIce: 0.10,
        capexIce: 30000,
        kWhPerMileEv: 0.3,
        elecPricePerKWh: 0.12,
        maintPerMileEv: 0.05,
        capexEv: 50000,
        chargerCapexPerVehicle: 5000,
        incentivePerVehicle: 7500,
        discountRate: 0.05,
        years: 10,
        gridIntensity_g_per_kWh: 400,
        ice_kgCO2_per_gal: 8.887,
        batteryReplacementEnabled: true,
        batteryReplacementYear: 5,
        batteryReplacementCost: 15000,
      }
      
      const outputs = calculateModel(inputs)
      
      // Year 5 should have higher cashflow due to battery replacement
      const year5 = outputs.annualSeries[5]
      expect(year5.cashflowEv).toBeGreaterThan(outputs.annualSeries[4].cashflowEv)
    })
  })
})