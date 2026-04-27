import React, { useState, useMemo } from 'react';
import { Card } from '../shared/Card';
import { Input } from '../shared/Input';
import { calculatePipValue } from '../../utils/math';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import instruments from '../../data/instruments.json';
import { Button } from '../shared/Button';
import { useHistoryStore } from '../../store/useHistoryStore';
import { Save } from 'lucide-react';

export const PipCalculator: React.FC = () => {
  const { accountCurrency } = usePreferencesStore();
  const { addTrade } = useHistoryStore();
  const [pair, setPair] = useState(instruments[0].symbol);
  const [lotSize, setLotSize] = useState<number>(1);
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  const selectedInstrument = useMemo(() => 
    instruments.find(i => i.symbol === pair) || instruments[0], 
  [pair]);

  const isQuoteSameAsAccount = useMemo(() => {
    return selectedInstrument.symbol.endsWith(accountCurrency);
  }, [selectedInstrument, accountCurrency]);

  const pipValue = useMemo(() => 
    calculatePipValue(
      selectedInstrument.contractSize,
      selectedInstrument.pipSize,
      lotSize,
      isQuoteSameAsAccount ? 1 : exchangeRate
    ),
  [selectedInstrument, lotSize, exchangeRate, isQuoteSameAsAccount]);

  const handleSave = () => {
    addTrade({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      pair,
      lotSize,
      riskAmount: pipValue, // For Pip Calculator, we'll store the pip value as risk for now
      sl: 'N/A',
      tp: 'N/A'
    });
  };

  return (
    <Card title="Pip Value Calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pair</label>
          <select 
            value={pair} 
            onChange={(e) => setPair(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {instruments.map(i => <option key={i.symbol} value={i.symbol}>{i.symbol}</option>)}
          </select>
        </div>
        <Input 
          label="Lot Size" 
          type="number" 
          step="0.01" 
          value={lotSize} 
          onChange={(e) => setLotSize(Number(e.target.value))} 
        />
        {!isQuoteSameAsAccount && (
          <Input 
            label={`Exchange Rate (${accountCurrency}/${selectedInstrument.symbol.substring(selectedInstrument.symbol.length - 3)})`}
            type="number" 
            step="0.00001" 
            value={exchangeRate} 
            onChange={(e) => setExchangeRate(Number(e.target.value))} 
            className="md:col-span-2"
          />
        )}
      </div>
      <div className="mt-6 p-4 bg-accent bg-opacity-10 border border-accent rounded-lg text-center flex flex-col items-center gap-2">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Value per {lotSize} lot(s)</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {pipValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {accountCurrency}
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2 mt-2">
          <Save className="w-4 h-4" /> Save to Journal
        </Button>
      </div>
    </Card>
  );
};
