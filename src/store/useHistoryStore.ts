import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TradeEntry {
  id: string;
  timestamp: number;
  pair: string;
  lotSize: number;
  riskAmount: number;
  entry?: number;
  sl: number | string;
  tp: number | string;
}

interface HistoryState {
  history: TradeEntry[];
  addTrade: (trade: TradeEntry) => void;
  removeTrade: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addTrade: (trade) => set((state) => ({ history: [trade, ...state.history] })),
      removeTrade: (id) => set((state) => ({ history: state.history.filter((t) => t.id !== id) })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'fex-history',
    }
  )
);
