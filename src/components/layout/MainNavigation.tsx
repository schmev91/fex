import React, { useState } from 'react';
import { PipCalculator } from '../calculators/PipCalculator';
import { PositionSizeCalculator } from '../calculators/PositionSizeCalculator';
import { TradeJournal } from '../journal/TradeJournal';
import { LayoutGrid, Ruler, BookText } from 'lucide-react';

export const MainNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'risk' | 'pip' | 'journal'>('risk');

  const tabs = [
    { id: 'risk', label: 'Position Size', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'pip', label: 'Pip Value', icon: <Ruler className="w-5 h-5" /> },
    { id: 'journal', label: 'Journal', icon: <BookText className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-inner border dark:border-gray-700 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center gap-2 flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold transition-all duration-200
              ${activeTab === tab.id 
                ? 'bg-accent text-gray-900 shadow-sm scale-[1.02]' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="transition-all duration-300">
        {activeTab === 'risk' && <PositionSizeCalculator />}
        {activeTab === 'pip' && <PipCalculator />}
        {activeTab === 'journal' && <TradeJournal />}
      </div>
    </div>
  );
};
