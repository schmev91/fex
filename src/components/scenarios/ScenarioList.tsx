import React from 'react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { useScenarioStore } from '../../store/useScenarioStore';
import { Trash2 } from 'lucide-react';

export const ScenarioList: React.FC = () => {
  const { scenarios, removeScenario, clearScenarios } = useScenarioStore();

  return (
    <Card title="Saved Scenarios">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {scenarios.length} Scenario(s)
        </p>
        <div className="flex gap-2">
          <Button variant="danger" onClick={clearScenarios} disabled={scenarios.length === 0} className="flex items-center gap-2 py-1.5 px-3 text-sm">
            <Trash2 className="w-4 h-4" /> Clear All
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
              <th className="py-3 px-2 font-semibold">Scenario Name</th>
              <th className="py-3 px-2 font-semibold text-right">Pair</th>
              <th className="py-3 px-2 font-semibold text-right">Risk (USD)</th>
              <th className="py-3 px-2 font-semibold text-right">Risk (Pips)</th>
              <th className="py-3 px-2 font-semibold text-right">Lots</th>
              <th className="py-3 px-2 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {scenarios.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400 italic">
                  No scenarios saved yet.
                </td>
              </tr>
            ) : (
              scenarios.map((scenario) => (
                <tr key={scenario.id} className="text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-2 font-medium">{scenario.name}</td>
                  <td className="py-3 px-2 text-right">{scenario.tradingPair}</td>
                  <td className="py-3 px-2 text-right">${scenario.riskUSD}</td>
                  <td className="py-3 px-2 text-right">{scenario.riskPips}</td>
                  <td className="py-3 px-2 text-right font-bold text-accent">{scenario.calculatedLots}</td>
                  <td className="py-3 px-2 text-right">
                    <button 
                      onClick={() => removeScenario(scenario.id)}
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
