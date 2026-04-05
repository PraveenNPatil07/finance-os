# 📁 src/components/layout/

## Responsibility
The structural shell of the authenticated app. Defines the persistent 
sidebar + topbar layout that wraps every protected page. Controls responsive 
behavior and navigation structure.

## Files in this folder

| File | Purpose |
|------|---------|
| AppLayout.jsx | Wrapper determining the overarching flex grid structure |
| Sidebar.jsx | Desktop/mobile interactive hierarchical navigation menu tree |
| Topbar.jsx | Permanent site crest hosting responsive action items and user context |

## How it fits in the app
App.jsx → AppLayout → pages/

## Key conventions
- `AppLayout` is the single wrapper for all authenticated routes
- `Sidebar` reads from uiStore for open/close state
- Active nav link is determined by `useLocation()`
