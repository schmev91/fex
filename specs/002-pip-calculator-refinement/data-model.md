# Data Model: Fex Pip Calculator

## Entities

### Scenario
- **Name**: `string` (The user-provided or default name)
- **RiskUSD**: `number` (The amount of USD to risk)
- **RiskPips**: `number` (The number of pips to risk)
- **CalculatedLots**: `number` (Resulting position size in lots)
- **CreatedAt**: `Date` (For sorting scenarios in the list)
- **TradingPair**: `string` (The currency pair)

## Validation Rules
- `RiskUSD` must be > 0.
- `RiskPips` must be > 0.
- `TradingPair` must be valid based on available instruments.
- `Name` must be a string; empty strings default to "Pair - Timestamp".
