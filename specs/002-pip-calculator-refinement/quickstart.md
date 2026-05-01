# Quickstart: Fex Pip Calculator Refinement

## Overview
This feature introduces a risk-based position size calculator for Fex, allowing traders to input their desired risk in USD and pips to determine the correct lot size. It also adds a session-based scenario saving functionality.

## Usage
1. Open the **Position Size** tab.
2. Enter the **Trading Pair**, **Risk Amount (USD)**, and **Risk in Pips**.
3. Click "Calculate" to view the required **Position Size (Lots)**.
4. (Optional) Click "Save Scenario" to add the calculation to your list.
5. Saved scenarios appear below the calculator in the **Saved Scenarios** list.

## Development Setup
- The implementation uses a new Zustand store `useScenarioStore.ts`.
- Calculator logic is updated in `PositionSizeCalculator.tsx`.
- Scenario display component is `ScenarioList.tsx`.
