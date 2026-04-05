# 📁 src/constants/

## Responsibility
Application-wide constant values that never change at runtime. Centralizing these 
prevents magic strings scattered across the codebase.

## Files in this folder

| File | Purpose |
|------|---------|
| roles.js | Establishes the authoritative application role matrix keys |

## How it fits in the app
Imported heavily by guards, utilities, and access-specific components.

## Key conventions
- All constants are UPPER_SNAKE_CASE
- Never import role strings directly as 'ADMIN' in components — always use these constants
