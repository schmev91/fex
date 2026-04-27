# Quickstart: Fex Pip Calculator

## Development Setup

1. **Initialize Project**:
   ```bash
   npm create vite@latest fex -- --template react-ts
   cd fex
   npm install
   ```

2. **Install Dependencies**:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install zustand decimal.js lucide-react
   ```

3. **Configure Tailwind**:
   Update `tailwind.config.js` to include the accent color `#35e668`.

4. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## Key Workflows

- **Adding a Calculator**: Create a new component in `src/components/calculators/` and hook it into the Zustand store.
- **Updating Instruments**: Modify `src/data/instruments.json`.
- **Logic Testing**: Run `npm test` (Vitest) to verify calculation accuracy in `src/utils/math.ts`.
