# 📁 src/hooks/

## Responsibility
Custom React hooks that encapsulate data-fetching logic, loading/error state, and 
filter management. Keep pages clean by moving all async logic out of components.

## Files in this folder

| File | Purpose |
|------|---------|
| useTransactions.js | Fetches and mutates the transactions table payload |
| useDashboard.js | Gathers aggregate analytics |
| useUsers.js | Bridges team members interface actions |
| useDebounce.js | Smooths rapid changing dependencies over time |
| useCountUp.js | Orchestrates UI number animations smoothly |

## How it fits in the app
pages/ → hooks/ → api/

## Key conventions
- Every data hook returns `{ data, loading, error, refetch }`
- Hooks re-fetch automatically when filter params change
- `useDebounce` wraps search inputs (300ms delay)
- `useCountUp` animates number values on mount
