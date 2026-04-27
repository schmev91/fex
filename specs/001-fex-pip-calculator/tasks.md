# Tasks: Fex Pip Calculator

**Input**: Design documents from `specs/001-fex-pip-calculator/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Unit tests for calculation logic are included using Vitest as per technical context.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and environment configuration

- [x] T001 Create project structure using Vite (React + TS)
- [x] T002 [P] Configure Tailwind CSS with accent color `#35e668` in `tailwind.config.js`
- [x] T003 [P] Initialize Vitest and React Testing Library configuration in `vite.config.ts`
- [x] T004 Install core dependencies (Zustand, Decimal.js, Lucide React)
- [x] T005 Create base theme CSS variables in `src/styles/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic and state management that MUST be complete before user story work

- [x] T006 Create static instrument metadata in `src/data/instruments.json` (Forex, Gold, Silver)
- [x] T007 [P] Implement Decimal.js utility wrappers in `src/utils/math.ts`
- [x] T008 [P] Setup Zustand store for `UserPreferences` in `src/store/usePreferencesStore.ts`
- [x] T009 [P] Setup Zustand store for `TradeHistory` in `src/store/useHistoryStore.ts`
- [x] T010 Implement `localStorage` persistence middleware for Zustand stores
- [x] T011 Create shared UI components (Input, Button, Card) in `src/components/shared/`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 2 - Pip Value Calculation (Priority: P1)

**Goal**: Instant pip value calculations for all instruments

**Independent Test**: Select pair and lot size, verify pip value output matches standard formulas.

### Tests for User Story 2
- [x] T012 [P] [US2] Write unit tests for pip value logic in `src/utils/__tests__/pip-math.test.ts`

### Implementation for User Story 2
- [x] T013 [P] [US2] Implement pip value formula in `src/utils/math.ts`
- [x] T014 [US2] Create `PipCalculator` component in `src/components/calculators/PipCalculator.tsx`
- [x] T015 [US2] Integrate `PipCalculator` with `usePreferencesStore` for account currency
- [x] T016 [US2] Add `PipCalculator` to main dashboard in `src/App.tsx`

---

## Phase 4: User Story 1 - Position Size Calculator (Priority: P1) 🎯 MVP

**Goal**: Recommended lot size based on balance and risk

**Independent Test**: Input balance, risk %, and SL pips; verify recommended lot size output.

### Tests for User Story 1
- [x] T017 [P] [US1] Write unit tests for position sizing logic in `src/utils/__tests__/risk-math.test.ts`

### Implementation for User Story 1
- [x] T018 [P] [US1] Implement position sizing formula in `src/utils/math.ts`
- [x] T019 [US1] Create `PositionSizeCalculator` component in `src/components/calculators/PositionSizeCalculator.tsx`
- [x] T020 [US1] Implement "Reverse" mode (Lot size → % Risk) in `PositionSizeCalculator.tsx`
- [x] T021 [US1] Integrate `PositionSizeCalculator` with `usePreferencesStore` for default risk/balance

---

## Phase 5: User Story 3 - Persistence & Journal (Priority: P2)

**Goal**: Save trade calculations to history and persist theme/settings

**Independent Test**: Add trade to journal, refresh browser, verify it persists in the table.

### Implementation for User Story 3
- [x] T022 [P] [US3] Create `TradeJournal` table component in `src/components/journal/TradeJournal.tsx`
- [x] T023 [US3] Implement `addTrade` action in `useHistoryStore.ts` triggered by calculators
- [x] T024 [US3] Implement `ThemeSwitcher` component in `src/components/shared/ThemeSwitcher.tsx`
- [x] T025 [P] [US3] Implement CSV export utility in `src/utils/export.ts`
- [x] T026 [US3] Add export button to `TradeJournal.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: UI/UX refinements and final touches

- [x] T027 Implement mobile-responsive navigation (Tabs/Sidebar) in `src/components/layout/`
- [x] T028 [P] Add Lucide icons to all navigation and action items
- [x] T029 Implement high-contrast theme overrides in `src/styles/high-contrast.css`
- [x] T030 [P] Add tooltips for calculation formulas in `src/components/shared/Tooltip.tsx`
- [x] T031 Final verification of offline functionality via Service Workers (optional PWA)

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)** → **Foundational (Phase 2)**
- **Foundational (Phase 2)** → **User Story 2 (US2)** & **User Story 1 (US1)**
- **User Story 1 & 2** → **User Story 3 (US3)**
- **All User Stories** → **Polish (Phase 6)**

### Parallel Execution Examples
- **Foundational**: T007, T008, T009 can run in parallel.
- **Calculations**: US1 and US2 can be developed in parallel once T007 (math utils) is complete.
- **UI**: T011 and T014/T019 (calculators) can run in parallel once store structures are defined.

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)
1. Complete Setup and Foundational.
2. Implement US2 (Pip Value) and US1 (Position Size).
3. Result: A functional calculator that traders can use for risk management.

### Incremental Delivery
1. **Foundation Ready**: App skeleton and stores initialized.
2. **Calculator Ready**: US1 and US2 live on dashboard.
3. **Journal Ready**: US3 persistence and history table active.
4. **Full Release**: Polish phase complete with mobile optimizations.
