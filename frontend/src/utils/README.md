# 📁 src/utils/

## Responsibility
Pure helper functions with no side effects. Used throughout the app for 
consistent formatting of currencies, dates, and role-based logic checks.

## Files in this folder

| File | Purpose |
|------|---------|
| formatCurrency.js | Standardizes monetary presentation into locales |
| formatDate.js | Transforms raw timestamp data into readable UI strings |
| roleUtils.js | Bundles standard permission verifications |

## How it fits in the app
Used globally by any component or hook.

## Key conventions
- All functions are pure (no state, no side effects)
- `formatCurrency` always uses Indian locale (en-IN)
- `roleUtils` exports simple boolean helpers like `isAdmin(user)`, `isAnalyst(user)`, `canEdit(user)`
