# Feature Specification: Fex Pip Calculator

**Feature Branch**: `002-fex-pip-calculator`  
**Created**: 2026-04-30  
**Status**: Draft  
**Input**: User description: "Implement a pip calculator for the Fex platform."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Calculate Trade Risk (Priority: P1)

A trader wants to calculate the risk of a trade in pips and currency value to manage their exposure.

**Why this priority**: Core functionality needed for risk management.

**Independent Test**: Can be tested by entering trade details and verifying the pip and currency value output matches expected manual calculation.

**Acceptance Scenarios**:

1. **Given** a user has entered the trading pair, position size, and entry/exit price, **When** they request the calculation, **Then** the system displays the total pips lost/gained and the equivalent value in the account currency.
2. **Given** an invalid price, **When** they request the calculation, **Then** the system shows an error message.

---

### User Story 2 - Account Currency Selection (Priority: P2)

A trader wants to calculate risk in their specific account currency (e.g., USD, EUR).

**Why this priority**: Users have different account base currencies.

**Independent Test**: Can be tested by changing the account currency and observing the change in converted risk value.

**Acceptance Scenarios**:

1. **Given** a trader has an account in USD, **When** they select USD as the currency, **Then** the conversion values are calculated using the current USD exchange rates.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to input currency pair, position size, and trade prices.
- **FR-002**: System MUST calculate pip value based on standard market conventions for the selected pair.
- **FR-003**: System MUST convert the risk value into the user's account base currency.
- **FR-004**: System MUST handle at least 50 major currency pairs.
- **FR-005**: System MUST provide feedback for invalid inputs (e.g., negative price).

### Key Entities

- **Trading Pair**: Represents the currency pair (e.g., EUR/USD).
- **Trade Details**: Inputs for calculation (pair, size, price).
- **Result**: The output containing pip value and currency value.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete a pip calculation in under 15 seconds.
- **SC-002**: 98% accuracy compared to standard market pip calculation formulas.
- **SC-003**: System supports calculation across all major currency pairs listed in the application.

## Assumptions

- Market exchange rates are updated at a frequency suitable for estimation.
- Standard rounding rules for financial calculations are acceptable.
- The UI handles the input and output display without external library dependencies for the core math.
