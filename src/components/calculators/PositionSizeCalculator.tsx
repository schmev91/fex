import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '../shared/Card';
import { Input } from '../shared/Input';
import { Tooltip } from '../shared/Tooltip';
import { calculateLotSize, calculatePipValue } from '../../utils/math';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import instruments from '../../data/instruments.json';
import { Button } from '../shared/Button';
import { useHistoryStore } from '../../store/useHistoryStore';
import { Save } from 'lucide-react';

export const PositionSizeCalculator: React.FC = () => {
  const { accountCurrency, defaultBalance, defaultRisk } = usePreferencesStore();
  const { addTrade } = useHistoryStore();
  
  const [balance, setBalance] = useState<number>(defaultBalance);
  const [riskPercent, setRiskPercent] = useState<number>(defaultRisk);
  const [stopLossPips, setStopLossPips] = useState<number>(20);
  const [pair, setPair] = useState(instruments[0].symbol);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [manualLotSize, setManualLotSize] = useState<number>(0);
  const [isReverse, setIsReverse] = useState(false);

  const selectedInstrument = useMemo(() => 
    instruments.find(i => i.symbol === pair) || instruments[0], 
  [pair]);

  const isQuoteSameAsAccount = useMemo(() => {
    return selectedInstrument.symbol.endsWith(accountCurrency);
  }, [selectedInstrument, accountCurrency]);

  const pipValuePerLot = useMemo(() => 
    calculatePipValue(
      selectedInstrument.contractSize,
      selectedInstrument.pipSize,
      1,
      isQuoteSameAsAccount ? 1 : exchangeRate
    ),
  [selectedInstrument, exchangeRate, isQuoteSameAsAccount]);

  const recommendedLots = useMemo(() => 
    calculateLotSize(balance, riskPercent, stopLossPips, pipValuePerLot),
  [balance, riskPercent, stopLossPips, pipValuePerLot]);

  const reverseRisk = useMemo(() => {
    if (stopLossPips === 0 || pipValuePerLot === 0 || balance === 0) return 0;
    return (manualLotSize * stopLossPips * pipValuePerLot * 100) / balance;
  }, [manualLotSize, stopLossPips, pipValuePerLot, balance]);

  useEffect(() => {
    if (!isReverse) {
      setManualLotSize(recommendedLots);
    }
  }, [recommendedLots, isReverse]);

  const handleSave = () => {
    const finalRisk = isReverse ? reverseRisk : riskPercent;
    addTrade({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      pair,
      lotSize: manualLotSize,
      riskAmount: (finalRisk * balance) / 100,
      sl: stopLossPips,
      tp: 'N/A'
    });
  };

  return (
    <Card title="Position Size Calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Account Balance" 
          type="number" 
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
            Pair
            <Tooltip content="The currency pair or instrument you are trading." />
          </label>
          <select 
            value={pair} 
            onChange={(e) => setPair(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {instruments.map(i => <option key={i.symbol} value={i.symbol}>{i.symbol}</option>)}
          </select>
        </div>
<Input 
  label="Risk %" 
  type="number" 
  step="0.1" 
  value={isReverse ? reverseRisk.toFixed(2) : riskPercent} 
  onChange={(e) => setRiskPercent(Number(e.target.value))}
  disabled={isReverse}
/>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      Stop Loss (Pips)
                      <Tooltip content="Distance from entry to stop loss. Used to calculate risk." />
                    </label>
                    <input 
                      type="number" 
                      value={stopLossPips} 
                      onChange={(e) => setStopLossPips(Number(e.target.value))} 
                      className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  {!isQuoteSameAsAccount && (
                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                        Exchange Rate ({accountCurrency}/{selectedInstrument.symbol.substring(selectedInstrument.symbol.length - 3)})
                        <Tooltip content="Rate used to convert quote currency to your account currency." />
                      </label>
                      <input 
                        type="number" 
                        step="0.00001" 
                        value={exchangeRate} 
                        onChange={(e) => setExchangeRate(Number(e.target.value))} 
                        className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  )}

        <div className="md:col-span-2 flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isReverse} 
              onChange={(e) => setIsReverse(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Reverse Mode (Input Lot Size)</span>
          </label>
        </div>

        {isReverse && (
          <Input 
            label="Manual Lot Size" 
            type="number" 
            step="0.01" 
            value={manualLotSize} 
            onChange={(e) => setManualLotSize(Number(e.target.value))} 
            className="md:col-span-2"
          />
        )}
      </div>

      <div className="mt-6 p-4 bg-accent bg-opacity-10 border border-accent rounded-lg flex flex-col items-center gap-3">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {isReverse ? 'Risk Percentage' : 'Recommended Position Size'}
          </p>
          <p className="text-4xl font-black text-gray-900 dark:text-white">
            {isReverse ? `${reverseRisk.toFixed(2)}%` : `${recommendedLots} Lots`}
          </p>
          <p className="text-sm font-bold text-accent mt-1">
            Risk Amount: {((isReverse ? reverseRisk : riskPercent) * balance / 100).toFixed(2)} {accountCurrency}
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" /> Save to Journal
        </Button>
      </div>
    </Card>
  );
};
