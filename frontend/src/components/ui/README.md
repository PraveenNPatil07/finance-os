# 📁 src/components/ui/

## Responsibility
The design system. Every reusable, presentational UI primitive lives here. These 
components are generic — they know nothing about finance data. They only accept 
props and render UI.

## Files in this folder

| File | Purpose |
|------|---------|
| Button.jsx | Primary interactive action node primitive |
| Input.jsx | Standardized text entry point mechanism |
| Select.jsx | Form interaction system for dropdown mapping |
| Badge.jsx | Small contextual pill flag |
| Card.jsx | Receptacle structural element for segmenting layouts |
| Modal.jsx | Full priority foreground notification view component |
| Table.jsx | Presentational wrapper structuring arrays globally |
| Pagination.jsx | Controller logic to traverse chunks |
| Spinner.jsx | Awaiting payload representation visual |
| Skeleton.jsx | Early structural filler loading components |
| PageWrapper.jsx | Animation boundary that slides pages elegantly |

## How it fits in the app
Used universally by all pages and feature components across the stack.

## Key conventions
- All components accept a `className` prop for overrides
- No API calls or store access inside ui/ components
- Every interactive element has hover, focus, active, and disabled states styled
