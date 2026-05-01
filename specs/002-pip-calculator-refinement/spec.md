# Feature Specification: Fex Pip Calculator Refinement

**Feature Branch**: `002-fex-pip-calculator`  
**Created**: 2026-04-30  
**Status**: Draft  
**Input**: User description: "I dont need the journal tab - for the position size tab, I dont want the account balance input, instead, I think I want an input of how many USD I want to risk, and how much pips i want to risk, I enter the two of them and it show the lot for my trade - instead of journal feature, when I enter entries, I want a save scenario button, with option to choose the name for the scenario, it should have default name though, I want the list of scenario to be display below the calculator"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Calculate Position Size (Priority: P1)

A trader wants to calculate their trade position size (lots) by specifying their risk in USD and risk in pips.

**Why this priority**: Core functionality for managing risk based on explicit dollar amounts rather than balance percentage.

**Independent Test**: Can be tested by entering risk amount and pip risk and verifying the calculated position size (lots).

**Acceptance Scenarios**:

1. **Given** a user has entered risk amount (USD) and risk in pips, **When** they request the calculation, **Then** the system displays the required position size in lots.

---

### User Story 2 - Save and View Trade Scenarios (Priority: P2)

A trader wants to save trade calculations as scenarios and view them for later reference.

**Why this priority**: Improves workflow by allowing users to compare different trade setups.

**Independent Test**: Can be tested by saving a scenario and verifying it appears in the list below the calculator.

**Acceptance Scenarios**:

1. **Given** a calculation has been performed, **When** the user clicks "Save Scenario", **Then** the scenario is saved with either a default or user-specified name.
2. **Given** scenarios have been saved, **When** the user looks below the calculator, **Then** they see a list of saved scenarios.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide inputs for "Risk Amount (USD)" and "Risk in Pips".
- **FR-002**: System MUST calculate required "Position Size (Lots)" based on provided inputs.
- **FR-003**: System MUST allow users to save scenarios with a name (default name format: "Pair - Timestamp").
- **FR-004**: System MUST display a list of all saved scenarios below the calculator interface.
- **FR-005**: System MUST remove the "Journal" feature.
- **FR-006**: System MUST remove "Account Balance" input from the calculator.

### Key Entities

- **Scenario**: Represents a saved trade setup (name, risk USD, risk pips, calculated lots).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can calculate position size in under 10 seconds.
- **SC-002**: Users can save a scenario in a single click.
- **SC-003**: All saved scenarios are immediately visible below the calculator.

## Assumptions

- Position size calculation formulas based on risk USD and pips are standard and understood.
- Scenarios are persisted in the current session; long-term storage requirements are out of scope.
re standard and understood.
- Scenarios are persisted in the current session; long-term storage requirements are out of scope.
