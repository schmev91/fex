# Tasks: Fex Pip Calculator Refinement

**Input**: Design documents from `specs/002-pip-calculator-refinement/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Create scenario store directory and file at `src/store/useScenarioStore.ts`
- [X] T002 [P] Create scenarios component directory and file at `src/components/scenarios/ScenarioList.tsx`
- [X] T003 [P] Create test file for new risk math at `src/utils/__tests__/risk-math.test.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Implement `useScenarioStore` with Zustand for session-based storage in `src/store/useScenarioStore.ts`
- [X] T005 Update `src/utils/math.ts` with risk-based position size calculation logic
- [X] T006 Implement unit tests for risk-based calculation in `src/utils/__tests__/risk-math.test.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Calculate Position Size (Priority: P1) 🎯 MVP

**Goal**: Calculate trade position size (lots) by specifying risk in USD and risk in pips.

**Independent Test**: Enter risk amount (e.g., $100) and pip risk (e.g., 20 pips), verify the calculated lots matches the formula `USD / (Pips * PipValue)`.

### Implementation for User Story 1

- [X] T007 [US1] Remove Account Balance input from `src/components/calculators/PositionSizeCalculator.tsx`
- [X] T008 [US1] Add "Risk Amount (USD)" and "Risk in Pips" inputs to `src/components/calculators/PositionSizeCalculator.tsx`
- [X] T009 [US1] Integrate `calculatePositionSize` from `src/utils/math.ts` into `src/components/calculators/PositionSizeCalculator.tsx`
- [X] T010 [US1] Update UI to display calculated "Position Size (Lots)" in `src/components/calculators/PositionSizeCalculator.tsx`

**Checkpoint**: User Story 1 fully functional and testable independently.

---

## Phase 4: User Story 2 - Save and View Trade Scenarios (Priority: P2)

**Goal**: Save trade calculations as scenarios and view them in a list below the calculator.

**Independent Test**: Click "Save Scenario" after a calculation, verify a new entry appears in the list below the calculator with the correct values.

### Implementation for User Story 2

- [X] T011 [US2] Implement "Save Scenario" button and naming logic in `src/components/calculators/PositionSizeCalculator.tsx`
- [X] T012 [P] [US2] Implement `ScenarioList` component to display saved scenarios in `src/components/scenarios/ScenarioList.tsx`
- [X] T013 [US2] Integrate `ScenarioList` component below the calculator in `src/App.tsx`

**Checkpoint**: User Story 2 fully functional and integrated with User Story 1.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and removals that affect the overall application state.

- [X] T014 [P] Remove "Journal" link and tab from `src/components/layout/MainNavigation.tsx`
- [X] T015 Remove `TradeJournal` component usage and cleanup routes in `src/App.tsx`
- [X] T016 [P] Delete unused journal component file `src/components/journal/TradeJournal.tsx`
- [X] T017 Run final validation against `specs/002-pip-calculator-refinement/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Independent of other stories.
- **User Story 2 (P2)**: Depends on US1 for data to save, but the component structure can be built in parallel.

### Parallel Opportunities

- T001, T002, T003 (Setup)
- T012 (ScenarioList UI) can be developed in parallel with US1 implementation.
- T014, T016 (Removals) can be done anytime.

---

## Parallel Example: Setup & Foundation

```bash
# Initialize files in parallel
Task: "Create scenario store directory and file at src/store/useScenarioStore.ts"
Task: "Create scenarios component directory and file at src/components/scenarios/ScenarioList.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational math.
2. Refactor calculator for Risk-based input.
3. Validate calculation accuracy.

### Incremental Delivery

1. Foundation + US1 → Working Risk Calculator.
2. US2 → Persistent Scenarios list.
3. Polish → Cleanup navigation and unused features.
