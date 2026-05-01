# Implementation Plan: Fex Pip Calculator Refinement

**Branch**: `002-fex-pip-calculator` | **Date**: 2026-04-30 | **Spec**: [specs/002-pip-calculator-refinement/spec.md](specs/002-pip-calculator-refinement/spec.md)
**Input**: Feature specification from `specs/002-pip-calculator-refinement/spec.md`

## Summary

Implement a position size calculator that replaces the existing balance-based approach with a risk-in-USD and risk-in-pips approach. It will include a scenario-saving mechanism that persists calculation settings during the user session and displays them below the main calculator component. The Journal feature will be removed.

## Technical Context

**Language/Version**: TypeScript (React/Vite project)  
**Primary Dependencies**: React (State management via existing hooks/context), math.ts (utility)  
**Storage**: In-memory (Session-based)  
**Testing**: vitest (based on existing structure)  
**Target Platform**: Web Browser  
**Project Type**: Web Application  
**Performance Goals**: Instant calculation response  
**Constraints**: No external math dependencies; leverage existing project setup.  
**Scale/Scope**: Single user, in-session data only.

## Constitution Check

*GATE: Must pass before Phase 0 research.*

- [x] Specification-First Governance: Feature specified in `specs/`.
- [x] Independent Value Delivery: Scenarios and calculator are independently testable.
- [x] Requirement-Driven Planning: Plan derived from spec requirements.
- [x] Story-Mapped Implementation: Prioritized stories.
- [x] Standardized Quality Gates: Checklist and validation steps defined.

## Project Structure

### Documentation (this feature)

```text
specs/002-pip-calculator-refinement/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── contracts/           # Phase 1 output (Internal)
```

### Source Code

```text
src/
├── components/
│   ├── calculators/
│   │   └── PositionSizeCalculator.tsx (Refactored)
│   └── scenarios/
│       └── ScenarioList.tsx (New)
├── store/
│   └── useScenarioStore.ts (New)
└── utils/
    └── math.ts (Updated for risk-based calc)
```

**Structure Decision**: Standard React component architecture consistent with existing project.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

None.
