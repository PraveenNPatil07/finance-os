# 📁 src/components/charts/

## Responsibility
Data visualization components powered by Recharts. Transform raw API data into 
interactive charts for the dashboard. Each chart component is self-contained — 
it receives data as props and handles its own rendering.

## Files in this folder

| File | Purpose |
|------|---------|
| MonthlyTrendsChart.jsx | Processes timescale bar comparisons of income and debts |
| CategoryPieChart.jsx | Calculates fractional distributions over aggregated data bounds |
| SummaryCards.jsx | Exposes top line metrics cleanly |

## How it fits in the app
DashboardPage → charts/ (via props)

## Key conventions
- Charts receive already-fetched data as props
- All monetary values displayed use `formatCurrency`
- Custom tooltips match the app's dark color system
- Charts are responsive using Recharts `ResponsiveContainer`
