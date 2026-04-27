# Feature Specification: Fex Pip Calculator

**Feature Branch**: `001-fex-pip-calculator`  
**Created**: 2026-04-27  
**Status**: Draft  
**Input**: Comprehensive plan for a highly optimized, comfortable Forex Pip Calculator website named "Fex".

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Risk-First Position Sizing (Priority: P1)

As a trader, I want to calculate my recommended lot size based on my account balance and risk percentage so that I can manage my risk effectively before entering a trade.

**Why this priority**: Risk management is the most critical aspect of trading; determining position size is the primary reason traders use calculators.

**Independent Test**: Can be fully tested by inputting balance (e.g., $10,000), risk (1%), and stop loss (20 pips) to receive a specific lot size (e.g., 0.50 lots for EURUSD).

**Acceptance Scenarios**:

1. **Given** a $10,000 balance and 1% risk, **When** I enter a 20 pip stop loss for EUR/USD, **Then** I should see a recommended lot size of 0.50.
2. **Given** a 0.50 lot size, **When** I toggle "Reverse" mode, **Then** I should see that my risk is 1% of my balance.

---

### User Story 2 - Real-Time Pip Value Calculation (Priority: P1)

As a trader, I want to see the value of a pip for different lot sizes and currency pairs instantly so that I know exactly how much each price movement affects my profit/loss.

**Why this priority**: Understanding the monetary value of a pip is fundamental to all other calculations.

**Independent Test**: Select a pair (e.g., USD/JPY) and lot size (1.00) and verify the pip value in the account currency matches the standard formula.

**Acceptance Scenarios**:

1. **Given** EUR/USD and a Standard Lot (100k), **When** the account currency is USD, **Then** the pip value must be $10.00.
2. **Given** USD/JPY and a Micro Lot (1k), **When** the account currency is USD, **Then** the pip value should be approximately $0.09 (depending on the current price).

---

### User Story 3 - Trade Journaling & Persistence (Priority: P2)

As a trader, I want my calculations and trade plans to be saved automatically so that I can review my history and return to my preferred settings without re-entering data.

**Why this priority**: Comfort and workflow efficiency; traders often trade the same pairs with the same risk profiles.

**Independent Test**: Enter values, refresh the page, and verify that all inputs and the history table remain unchanged.

**Acceptance Scenarios**:

1. **Given** I have added 5 trades to the journal, **When** I refresh the browser, **Then** those 5 trades should still be visible in the history table.
2. **Given** I have changed the theme to "Dark Mode", **When** I return to the site later, **Then** the site should still be in "Dark Mode".

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a Position Size Calculator with inputs for Balance, Risk %, Stop Loss (pips), and Pair.
- **FR-002**: System MUST calculate Pip Values for Standard, Mini, Micro, and Custom lot sizes.
- **FR-003**: System MUST calculate Profit/Loss and Risk-Reward ratios based on Entry, SL, and TP levels.
- **FR-004**: System MUST support Margin calculations based on user-selectable leverage (e.g., 1:100, 1:500).
- **FR-005**: System MUST persist all user settings, presets, and trade history to `localStorage`.
- **FR-006**: System MUST support light and dark modes with system preference detection.
- **FR-007**: System MUST support a comprehensive list of Forex pairs, Gold (XAUUSD), and Silver (XAGUSD).
- **FR-008**: System MUST perform all calculations in real-time (onInput) without requiring a "Calculate" button.
- **FR-009**: System MUST allow exporting trade history as a CSV file.
- **FR-010**: System MUST include a "Quick Trade Planner" dashboard for multi-scenario analysis.

### Key Entities

- **TradeEntry**: Represents a calculated trade setup (Pair, Entry, SL, TP, Lot Size, Risk Amount, Date).
- **UserPreferences**: Stores account currency, default risk %, default leverage, favorite pairs, and theme.
- **Instrument**: Stores pip size definitions and contract sizes for various pairs and commodities.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete a position size calculation in under 10 seconds.
- **SC-002**: All calculations must be accurate to at least 4 decimal places for pip values.
- **SC-003**: 100% of inputs and history must persist across browser restarts via `localStorage`.
- **SC-004**: The application MUST be fully functional offline once loaded.
- **SC-005**: UI components must be touch-friendly with minimum tap target sizes of 44x44 pixels for mobile comfort.

## Assumptions

- **AS-001**: Users have a modern web browser that supports `localStorage` and CSS Variables.
- **AS-002**: Current exchange rates for pip value calculations will be stored locally or hardcoded for the "frontend-only" requirement, with an option for manual price input.
- **AS-003**: The primary account currency for most users is USD, but other majors will be supported.
- **AS-004**: "Pip" definitions follow industry standards (0.0001 for 5-decimal pairs, 0.01 for JPY pairs).
