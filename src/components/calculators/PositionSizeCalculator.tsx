import React, { useState, useMemo } from 'react';
import { Card } from '../shared/Card';
import { Input } from '../shared/Input';
import { Tooltip } from '../shared/Tooltip';
import { calculatePositionSize, calculatePipValue } from '../../utils/math';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import instruments from '../../data/instruments.json';
import { Button } from '../shared/Button';
import { useScenarioStore } from '../../store/useScenarioStore';
import { Save } from 'lucide-react';

export const PositionSizeCalculator: React.FC = () => {
  const { accountCurrency } = usePreferencesStore();
  const { addScenario } = useScenarioStore();
  
  const [riskUSD, setRiskUSD] = useState<number>(100);
  const [riskPips, setRiskPips] = useState<number>(20);
  const [pair, setPair] = useState(instruments[0].symbol);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [scenarioName, setScenarioName] = useState<string>('');

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

  const calculatedLots = useMemo(() => 
    calculatePositionSize(riskUSD, riskPips, pipValuePerLot),
  [riskUSD, riskPips, pipValuePerLot]);

  const handleSave = () => {
    const name = scenarioName.trim() || `${pair} - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    addScenario({
      id: crypto.randomUUID(),
      name,
      riskUSD,
      riskPips,
      calculatedLots,
      createdAt: Date.now(),
      tradingPair: pair
    });
    setScenarioName('');
  };

  return (
    <Card title="Position Size Calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          label="Risk Amount (USD)" 
          type="number" 
          value={riskUSD}
          onChange={(e) => setRiskUSD(Number(e.target.value))}
        />

        <Input 
          label="Risk in Pips (Stop Loss)" 
          type="number" 
          value={riskPips} 
          onChange={(e) => setRiskPips(Number(e.target.value))} 
        />

        {!isQuoteSameAsAccount && (
          <div className="flex flex-col gap-1">
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

        <Input 
          label="Scenario Name (Optional)" 
          placeholder="e.g. Breakout Setup"
          value={scenarioName}
          onChange={(e) => setScenarioName(e.target.value)}
          className="md:col-span-2"
        />
      </div>

      <div className="mt-6 p-4 bg-accent bg-opacity-10 border border-accent rounded-lg flex flex-col items-center gap-3">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Recommended Position Size
          </p>
          <p className="text-4xl font-black text-gray-900 dark:text-white">
            {calculatedLots} Lots
          </p>
          <p className="text-sm font-bold text-accent mt-1">
            Risking {riskUSD} {accountCurrency} @ {riskPips} Pips
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Scenario
        </Button>
      </div>
    </Card>
  );
};
