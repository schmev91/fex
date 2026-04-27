# Research: Fex Pip Calculator

## Decisions & Rationale

### 1. Technical Stack
- **Decision**: React + Vite + Tailwind CSS.
- **Rationale**: React provides a robust ecosystem for state management (needed for complex calculations). Vite offers ultra-fast development and build times. Tailwind CSS is ideal for a utility-first, responsive design, which is critical for the "mobile-first" requirement.
- **Alternatives considered**: Vue 3 (rejected as React is the team's primary expertise), Vanilla JS (rejected due to the complexity of real-time state synchronization across multiple calculators).

### 2. State Management & Persistence
- **Decision**: Zustand + `localStorage`.
- **Rationale**: Zustand is lightweight and integrates seamlessly with `localStorage` for persistence. It avoids the boilerplate of Redux while providing enough structure for the app's state.
- **Alternatives considered**: React Context (rejected due to potential performance issues with frequent updates), Redux (rejected as overkill).

### 3. Forex Pair Data
- **Decision**: Fixed local JSON/JS file for instrument definitions (Pip sizes, contract sizes).
- **Rationale**: Ensures zero backend costs and 100% offline functionality. Pip values can be updated manually by the user or fetched from an optional API if available.
- **Alternatives considered**: External API (rejected as primary source to ensure offline reliability and cost-efficiency).

### 4. Calculation Engine
- **Decision**: Pure JS functions with Decimal.js for precision.
- **Rationale**: Floating-point math in JS can be unreliable for financial calculations. Decimal.js ensures 100% accuracy for pip and position size calculations.
- **Alternatives considered**: Built-in `Number` (rejected due to precision risks).

## Best Practices & Patterns

- **Mobile-First Design**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) and focus on touch-friendly targets (44px min).
- **Debounced Calculations**: Use `useDebounce` hook for inputs to prevent UI lag while typing, although the math itself is fast, it helps with state synchronization.
- **Theme Management**: Use CSS Variables with a `dark` class on the `<html>` element for seamless Light/Dark mode transitions.
- **Error Boundaries**: Implement robust validation on all inputs (e.g., no negative balance, no zero stop loss).

## Unresolved Clarifications
- None. All major technical choices align with the "frontend-only" and "maximum comfort" requirements.
