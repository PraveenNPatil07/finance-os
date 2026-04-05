# 📁 src/pages/

## Responsibility
Full page components, one per route. Pages are the top of the component tree — 
they call hooks for data, compose UI components, and handle page-level interactions 
like opening modals or triggering mutations.

## Files in this folder

| File | Purpose |
|------|---------|
| LoginPage.jsx | Main access portal orchestrating authentication |
| DashboardPage.jsx | High-level data visualization aggregation view |
| TransactionsPage.jsx | Sortable data grid allowing insertion and filtering |
| TransactionDetailPage.jsx | Deep inspection tool for individual events |
| UsersPage.jsx | Team member administration hub |
| ProfilePage.jsx | Current active user parameter inspection |

## How it fits in the app
Router → pages/ → components/ + hooks/

## Key conventions
- Pages are the only place that call data hooks
- Pages never contain inline styles or raw Tailwind class logic — delegate to ui/ components
- Each page has its own loading, error, and empty state handled explicitly
