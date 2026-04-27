import Decimal from 'decimal.js';

/**
 * Calculates the value of one pip for a given trade size.
 * Formula: Pip Value = (Contract Size * Pip Size * Lot Size) / Exchange Rate
 * (Exchange Rate is 1 if Quote Currency == Account Currency)
 */
export const calculatePipValue = (
  contractSize: number,
  pipSize: number,
  lotSize: number,
  exchangeRate: number = 1
): number => {
  try {
    return new Decimal(contractSize)
      .mul(pipSize)
      .mul(lotSize)
      .div(exchangeRate)
      .toDecimalPlaces(4)
      .toNumber();
  } catch {
    return 0;
  }
};

/**
 * Calculates the recommended lot size based on risk parameters.
 * Formula: Lots = (Balance * Risk%) / (Stop Loss in Pips * Pip Value Per Lot)
 */
export const calculateLotSize = (
  balance: number,
  riskPercent: number,
  stopLossPips: number,
  pipValuePerLot: number
): number => {
  try {
    if (stopLossPips <= 0 || pipValuePerLot <= 0) return 0;
    
    const riskAmount = new Decimal(balance).mul(riskPercent).div(100);
    const lots = riskAmount.div(new Decimal(stopLossPips).mul(pipValuePerLot));
    
    return lots.toDecimalPlaces(2).toNumber();
  } catch {
    return 0;
  }
};

/**
 * Calculates Profit/Loss in currency.
 */
export const calculatePL = (
  entryPrice: number,
  exitPrice: number,
  lotSize: number,
  contractSize: number,
  exchangeRate: number = 1
): number => {
  try {
    const priceDiff = new Decimal(exitPrice).sub(entryPrice);
    return priceDiff
      .mul(contractSize)
      .mul(lotSize)
      .div(exchangeRate)
      .toDecimalPlaces(2)
      .toNumber();
  } catch {
    return 0;
  }
};

/**
 * Calculates Risk to Reward ratio.
 */
export const calculateRR = (
  entryPrice: number,
  stopLossPrice: number,
  takeProfitPrice: number
): number => {
  try {
    const risk = new Decimal(entryPrice).sub(stopLossPrice).abs();
    const reward = new Decimal(takeProfitPrice).sub(entryPrice).abs();
    
    if (risk.isZero()) return 0;
    
    return reward.div(risk).toDecimalPlaces(2).toNumber();
  } catch {
    return 0;
  }
};
