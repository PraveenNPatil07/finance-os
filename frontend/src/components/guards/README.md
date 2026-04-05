# 📁 src/components/guards/

## Responsibility
Route and role protection wrappers. Prevent unauthorized access at the UI level 
by checking authentication status and user roles before rendering children.

## Files in this folder

| File | Purpose |
|------|---------|
| ProtectedRoute.jsx | Examines auth stores forcing unregistered users to validation screen |
| RoleGuard.jsx | Checks privilege chains preventing rendering |

## How it fits in the app
App.jsx wraps routes with these

## Key conventions
- `ProtectedRoute` redirects to `/login` if no token
- `RoleGuard` renders null silently if role doesn't match (no error shown)
- These are UI guards only — backend enforces the real security via `@PreAuthorize`
