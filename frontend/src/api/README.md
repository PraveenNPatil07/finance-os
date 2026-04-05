# 📁 src/api/

## Responsibility
All HTTP communication with the Spring Boot backend. Every API call in the app 
goes through here. Components and hooks never use Axios directly.

## Files in this folder

| File | Purpose |
|------|---------|
| axios.js | Sets up base interceptors and generic request patterns |
| authApi.js | Exports standard login and register fetch operations |
| userApi.js | Dispatches account manipulation and user listing calls |
| transactionApi.js | Serves core financial tracking queries |
| dashboardApi.js | Targets chart analytics and aggregated endpoints |

## How it fits in the app
hooks → api/ → backend

## Key conventions
- `axios.js` is the single configured instance (base URL, interceptors) used by all other files
- Each api file groups calls by resource (auth, users, transactions, dashboard)
- All functions are async and return `response.data`
