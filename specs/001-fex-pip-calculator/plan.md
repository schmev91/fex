# Implementation Plan: Fex Pip Calculator

**Branch**: `001-fex-pip-calculator` | **Date**: 2026-04-27 | **Spec**: [specs/001-fex-pip-calculator/spec.md](spec.md)
**Input**: Feature specification for a highly optimized, comfortable Forex Pip Calculator website.

## Summary
Build a frontend-only, mobile-first Forex Pip Calculator ("Fex") using React, Vite, and Tailwind CSS. The app features real-time calculations for pip values, position sizing, and profit/loss, with full offline support and `localStorage` persistence.

## Technical Context

**Language/Version**: TypeScript 5.0+  
**Primary Dependencies**: React 18, Vite, Tailwind CSS, Zustand, Decimal.js, Lucide React (icons)  
**Storage**: Browser `localStorage`  
**Testing**: Vitest + React Testing Library (unit tests for calculation logic)  
**Target Platform**: Web (Static Hosting - GitHub Pages)
**Project Type**: Single-page application (SPA)  
**Performance Goals**: Instant calculations (<100ms), 100/100 Lighthouse performance score  
**Constraints**: Zero backend dependencies, offline-first  
**Scale/Scope**: ~10 specialized calculators, Trade Journal, Watchlist

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Specification-First Governance**: ✅ Specification finalized in `specs/001-fex-pip-calculator/spec.md`.
- **II. Independent Value Delivery**: ✅ User stories (US1-US3) are independently testable.
- **III. Requirement-Driven Planning**: ✅ Plan derived from spec requirements FR-001 to FR-010.
- **IV. Story-Mapped Implementation**: ✅ Tasks will be organized by US1, US2, US3.
- **V. Standardized Quality Gates**: ✅ Research and Design phases follow defined checkpoints.

## Project Structure

### Documentation (this feature)

```text
specs/001-fex-pip-calculator/
├── spec.md              # Requirements and User Stories
├── plan.md              # This file
├── research.md          # Tech decisions and best practices
├── data-model.md        # State structure and entities
├── quickstart.md        # Feature setup and dev guide
├── contracts/           # Component/State interface definitions
└── tasks.md             # Implementation task list
```

### Source Code (repository root)

```text
src/
├── components/          # Reusable UI cards, inputs, tabs
├── hooks/               # useLocalStorage, useDebounce
├── store/               # Zustand store (state management)
├── utils/               # Decimal.js calculation logic
├── data/                # Static instrument definitions (JSON)
├── styles/              # Tailwind configuration and CSS variables
└── App.tsx              # Main layout and routing
```

**Structure Decision**: Single project (Option 1) is selected as this is a frontend-only application with no backend or mobile-native components.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None      | N/A        | N/A                                 |
