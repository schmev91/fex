# Research: Fex Pip Calculator Refinement

**Feature**: Fex Pip Calculator Refinement
**Date**: 2026-04-30

## Research Findings

### Risk-Based Position Size Formula
- **Decision**: Use the formula: `Position Size (Lots) = (Risk Amount (USD) / (Risk in Pips * Pip Value))`
- **Rationale**: This is the standard formula for risk-based position sizing in forex trading when working with explicit USD amounts and pip risk.
- **Alternatives considered**: Calculating based on account balance percentage was rejected per user requirement.

### Scenario Storage
- **Decision**: Use an in-memory Zustand store (`useScenarioStore.ts`) to manage the state of saved scenarios.
- **Rationale**: User requested session-based persistence only. Zustand provides a clean, idiomatic way to manage this state within the existing React architecture.
- **Alternatives considered**: `localStorage` (overkill given the explicit request for session-based), `useState` in the parent component (leads to prop drilling for the list display).

### Implementation Details
- **Decision**: Refactor `PositionSizeCalculator.tsx` to accept new props and logic for the risk-based approach. Create `ScenarioList.tsx` for the list view below the calculator.
- **Rationale**: Separating the calculator logic from the scenario list component improves maintainability and adheres to React best practices for component composition.
