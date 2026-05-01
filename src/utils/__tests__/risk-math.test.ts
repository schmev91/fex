import { describe, it, expect } from 'vitest';
import { calculatePositionSize } from '../math';

describe('calculatePositionSize', () => {
  it('calculates correct lots for $100 risk and 20 pips ($10 pip value)', () => {
    // Lots = 100 / (20 * 10) = 100 / 200 = 0.5
    const result = calculatePositionSize(100, 20, 10);
    expect(result).toBe(0.5);
  });

  it('calculates correct lots for $50 risk and 50 pips ($1 pip value)', () => {
    // Lots = 50 / (50 * 1) = 1.0
    const result = calculatePositionSize(50, 50, 1);
    expect(result).toBe(1);
  });

  it('returns 0 if risk pips is 0', () => {
    const result = calculatePositionSize(100, 0, 10);
    expect(result).toBe(0);
  });

  it('returns 0 if pip value is 0', () => {
    const result = calculatePositionSize(100, 20, 0);
    expect(result).toBe(0);
  });

  it('handles small lot sizes (rounding to 2 decimals)', () => {
    // Lots = 10 / (30 * 10) = 10 / 300 = 0.0333... -> 0.03
    const result = calculatePositionSize(10, 30, 10);
    expect(result).toBe(0.03);
  });
});
