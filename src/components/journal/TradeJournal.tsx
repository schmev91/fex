import React from 'react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { useHistoryStore } from '../../store/useHistoryStore';
import { Trash2, Download } from 'lucide-react';

export const TradeJournal: React.FC = () => {
  const { history, removeTrade, clearHistory } = useHistoryStore();

  const handleExport = () => {
    if (history.length === 0) return;
    
    const headers = ['Date', 'Pair', 'Lots', 'Risk Amount', 'SL', 'TP'];
    const rows = history.map(t => [
      new Date(t.timestamp).toLocaleString(),
      t.pair,
      t.lotSize,
      t.riskAmount,
      t.sl,
      t.tp
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `fex-trades-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card title="Trade Journal">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {history.length} Saved Calculation(s)
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleExport} disabled={history.length === 0} className="flex items-center gap-2 py-1.5 px-3 text-sm">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button variant="danger" onClick={clearHistory} disabled={history.length === 0} className="flex items-center gap-2 py-1.5 px-3 text-sm">
            <Trash2 className="w-4 h-4" /> Clear All
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
              <th className="py-3 px-2 font-semibold">Date</th>
              <th className="py-3 px-2 font-semibold">Pair</th>
              <th className="py-3 px-2 font-semibold text-right">Lots</th>
              <th className="py-3 px-2 font-semibold text-right">Risk</th>
              <th className="py-3 px-2 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {history.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400 italic">
                  No trades saved yet.
                </td>
              </tr>
            ) : (
              history.map((trade) => (
                <tr key={trade.id} className="text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-2 text-xs opacity-70">{new Date(trade.timestamp).toLocaleDateString()}</td>
                  <td className="py-3 px-2 font-bold">{trade.pair}</td>
                  <td className="py-3 px-2 text-right">{trade.lotSize}</td>
                  <td className="py-3 px-2 text-right font-medium text-accent">{trade.riskAmount.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right">
                    <button 
                      onClick={() => removeTrade(trade.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
