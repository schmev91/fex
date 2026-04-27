# Data Model: Fex Pip Calculator

## Store State (Zustand)

### `UserPreferences`
| Field | Type | Description |
|-------|------|-------------|
| `accountCurrency` | `string` | e.g., "USD", "EUR" |
| `defaultRisk` | `number` | Default risk % per trade |
| `defaultLeverage` | `number` | Default leverage (e.g., 500) |
| `theme` | `"light" | "dark"` | UI theme preference |
| `favorites` | `string[]` | List of favorite pair symbols |

### `TradeHistory`
| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | UUID |
| `timestamp` | `number` | Date of calculation |
| `pair` | `string` | Instrument symbol |
| `lotSize` | `number` | Calculated lot size |
| `riskAmount` | `number` | Risk in account currency |
| `entry` | `number` | Entry price (optional) |
| `sl` | `number` | Stop loss price/pips |
| `tp` | `number` | Take profit price/pips |

### `InstrumentMetadata`
| Field | Type | Description |
|-------|------|-------------|
| `symbol` | `string` | e.g., "EURUSD", "XAUUSD" |
| `pipSize` | `number` | 0.0001, 0.01, etc. |
| `contractSize` | `number` | 100000 for standard forex |
| `category` | `string` | "forex", "commodity", "index" |

## Relationships
- `UserPreferences` is a singleton persisted to `localStorage`.
- `TradeHistory` is a collection of `TradeEntry` objects, also persisted.
- `InstrumentMetadata` is a static lookup table.
