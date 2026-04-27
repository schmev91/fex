import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PreferencesState {
  accountCurrency: string;
  defaultBalance: number;
  defaultRisk: number;
  defaultLeverage: number;
  theme: 'light' | 'dark';
  favorites: string[];
  setPreference: <K extends keyof PreferencesState>(key: K, value: PreferencesState[K]) => void;
  toggleTheme: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      accountCurrency: 'USD',
      defaultBalance: 10000,
      defaultRisk: 1,
      defaultLeverage: 100,
      theme: 'dark',
      favorites: ['EURUSD', 'GBPUSD', 'XAUUSD'],
      setPreference: (key, value) => set((state) => ({ ...state, [key]: value })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'fex-preferences',
    }
  )
);
