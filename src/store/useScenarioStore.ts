import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Scenario {
  id: string;
  name: string;
  riskUSD: number;
  riskPips: number;
  calculatedLots: number;
  createdAt: number;
  tradingPair: string;
}

interface ScenarioState {
  scenarios: Scenario[];
  addScenario: (scenario: Scenario) => void;
  removeScenario: (id: string) => void;
  clearScenarios: () => void;
}

export const useScenarioStore = create<ScenarioState>()(
  persist(
    (set) => ({
      scenarios: [],
      addScenario: (scenario) =>
        set((state) => ({
          scenarios: [scenario, ...state.scenarios],
        })),
      removeScenario: (id) =>
        set((state) => ({
          scenarios: state.scenarios.filter((s) => s.id !== id),
        })),
      clearScenarios: () => set({ scenarios: [] }),
    }),
    {
      name: 'fex-scenarios',
    }
  )
);
