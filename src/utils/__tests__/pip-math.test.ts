import { describe, it, expect } from 'vitest';
import { calculatePipValue } from '../math';

describe('calculatePipValue', () => {
  it('calculates correct pip value for EURUSD (Standard Lot, 100k)', () => {
    // EURUSD, 1.0 lot, PipSize 0.0001, Contract 100,000, ExchangeRate 1 (USD account)
    const result = calculatePipValue(100000, 0.0001, 1, 1);
    expect(result).toBe(10);
  });

  it('calculates correct pip value for USDJPY (Standard Lot, 100k)', () => {
    // USDJPY, 1.0 lot, PipSize 0.01, Contract 100,000, ExchangeRate 1 (USD account)
    const result = calculatePipValue(100000, 0.01, 1, 1);
    expect(result).toBe(1000);
  });

  it('calculates correct pip value for Micro Lot (1k)', () => {
    const result = calculatePipValue(100000, 0.0001, 0.01, 1);
    expect(result).toBe(0.1);
  });

  it('adjusts for exchange rate correctly', () => {
    // If account is USD and pair is EURGBP, we need exchange rate of GBPUSD
    // Pip Value = (100000 * 0.0001 * 1) / (1 / 1.25) = 10 GBP * 1.25 = 12.5 USD
    // wait, my formula says div(exchangeRate). 
    // If quote is GBP and account is USD, exchangeRate = GBPUSD price (e.g. 0.8 GBP per 1 USD -> 1/1.25)
    // Actually, if we want pip value in account currency:
    // PipValueInQuote = LotSize * ContractSize * PipSize
    // PipValueInAccount = PipValueInQuote * (QuoteToAccountRate)
    
    // In my math.ts: div(exchangeRate)
    // So if Quote is GBP and Account is USD, exchangeRate should be USD/GBP price.
    // If 1 USD = 0.8 GBP, then 10 GBP / 0.8 = 12.5 USD. Correct.
    const result = calculatePipValue(100000, 0.0001, 1, 0.8);
    expect(result).toBe(12.5);
  });
});
