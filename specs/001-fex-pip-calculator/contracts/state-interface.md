# Store Interface Contract

## `useCalculatorStore`

The primary state management interface for Fex Pip Calculator.

### Actions
| Method | Arguments | Description |
|--------|-----------|-------------|
| `setPreference` | `key: string, value: any` | Updates a user preference |
| `addTrade` | `trade: TradeEntry` | Adds a calculation to history |
| `clearHistory` | `void` | Deletes all saved trades |
| `toggleTheme` | `void` | Switches between light/dark |

### Computed Values
| Value | Description |
|-------|-------------|
| `recommendedLots` | Derived from balance, risk, and SL |
| `pipValue` | Derived from pair and lot size |
| `potentialPL` | Derived from entry/exit levels |
