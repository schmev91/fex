import { describe, it, expect } from 'vitest';
import { calculateLotSize } from '../math';

describe('calculateLotSize', () => {
  it('calculates correct lot size for $10k balance, 1% risk, 20 pip SL, $10 pip value', () => {
    // Lots = (10000 * 0.01) / (20 * 10) = 100 / 200 = 0.50
    const result = calculateLotSize(10000, 1, 20, 10);
    expect(result).toBe(0.5);
  });

  it('calculates correct lot size for $5k balance, 2% risk, 50 pip SL, $10 pip value', () => {
    // Lots = (5000 * 0.02) / (50 * 10) = 100 / 500 = 0.20
    const result = calculateLotSize(5000, 2, 50, 10);
    expect(result).toBe(0.2);
  });

  it('returns 0 if SL is 0', () => {
    const result = calculateLotSize(10000, 1, 0, 10);
    expect(result).toBe(0);
  });

  it('returns 0 if pipValuePerLot is 0', () => {
    const result = calculateLotSize(10000, 1, 20, 0);
    expect(result).toBe(0);
  });
});
