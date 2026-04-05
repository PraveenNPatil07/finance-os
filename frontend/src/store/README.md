# 📁 src/store/

## Responsibility
Global client-side state using Zustand. Manages authentication state (user, token) 
and UI state (sidebar open/close). Single source of truth for data shared across 
multiple components.

## Files in this folder

| File | Purpose |
|------|---------|
| authStore.js | Holds user context and JSON Web Token |
| uiStore.js | Manages layout-wide volatile GUI elements |

## How it fits in the app
api/ → store/ ← components

## Key conventions
- `authStore` persists to localStorage via Zustand persist middleware
- No server data lives here — only client UI state and auth info
- Components read from store with `useAuthStore` hook
