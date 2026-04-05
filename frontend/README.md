# Finance Data Processing and Access Control System

A complete, production-quality full-stack application for managing and analyzing financial data with strict role-based access control.

## 1. Project Overview

This system provides a secure environment for recording financial transactions, filtering records, viewing advanced analytics, and managing user access.

### Role-Based Access Summary

| Role | API Access | Features available |
| :--- | :--- | :--- |
| **VIEWER** | Limit read-only access | Can view paginated transactions, view single transaction details, and see the basic dashboard summary (Total Income/Expense). |
| **ANALYST** | Full read-only access | Everything viewers can do, *plus* access to category breakdown (pie chart), monthly trends (bar chart), and recent activity lists. |
| **ADMIN** | Full administrative access | Everything analysts can do, *plus* the ability to create/update/soft-delete transactions, and full control over user management (creating users, activating/deactivating accounts). |

### Tech Stack Summary
- **Backend:** Java 17, Spring Boot 3.2.4, PostgreSQL, Spring Security 6 (JWT), Hibernate, Bucket4j, SpringDoc OpenAPI.
- **Frontend:** React 18 (Vite), Tailwind CSS 3, React Router DOM v6, Axios, Recharts, Zustand, React Hook Form + Zod.

---

## 2. Architecture Overview

### Backend Architecture
The backend follows a standard N-Layered Spring Boot architecture:
1. **Controller Layer:** Handles HTTP requests, input validation, and maps DTOs to/from services. Includes Swagger annotations for auto-generated documentation.
2. **Service Layer:** Contains core business logic, permissions logic, and transactions management (`@Transactional`).
3. **Repository Layer:** Spring Data JPA interfaces communicating with the PostgreSQL database. Uses `Specification` for dynamic query filtering and `@SQLRestriction` for soft-deletion.
4. **Security/Middleware Layer:** Intercepts traffic via `OncePerRequestFilter`. Includes the `JwtAuthenticationFilter` (token validation) and `RateLimitingFilter` (Bucket4j limits on auth endpoints).

### Frontend Architecture
The React frontend is built as a Single Page Application (SPA).
- **State Management:** Uses `Zustand` with `persist` middleware to save the JWT and user state across browser restarts.
- **API Communication:** A central `axios` instance acts as the gateway to the backend, appending Bearer tokens to every request, auto-logging out on 401, and showing warning toasts on 429.
- **Routing & Guards:** React Router separates public routes (`/login`) from authenticated dashboard routes. `ProtectedRoute` and `RoleGuard` wrapper components handle unauthorized access attempts.

---

## 3. Setup Instructions

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.8+
- PostgreSQL 14+

### Backend Setup
1. Open PostgreSQL and create a database named `finance_db`:
   ```sql
   CREATE DATABASE finance_db;
   ```
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Run the application (schema will be auto-generated and seeded upon startup):
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd finance-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server (defaults to port 5173, config includes proxy to backend at 8080):
   ```bash
   npm run dev
   ```

---

## 4. Seeded Credentials

When the backend starts *for the first time* on an empty database, it will automatically run a `CommandLineRunner` script that generates the following users and 15 sample transactions.

| Username | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| `admin` | admin@finance.com | admin123 | **ADMIN** |
| `analyst` | analyst@finance.com | analyst123 | **ANALYST** |
| `viewer` | viewer@finance.com | viewer123 | **VIEWER** |

---

## 5. API Endpoints Reference

### Public
| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate and get JWT token |
| `POST` | `/api/auth/register` | Register a new viewer |

### Protected (Transactions)
| Method | Path | Role Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/transactions` | ALL | Get paginated filtered transactions |
| `GET` | `/api/transactions/{id}`| ALL | Get transaction by ID |
| `POST` | `/api/transactions` | ADMIN | Create new transaction |
| `PUT` | `/api/transactions/{id}`| ADMIN | Update existing transaction |
| `DELETE`| `/api/transactions/{id}`| ADMIN | Soft delete transaction |

### Protected (Dashboard)
| Method | Path | Role Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard/summary` | ALL | Total metrics |
| `GET` | `/api/dashboard/category-breakdown` | ANALYST, ADMIN | Pie chart aggregate data |
| `GET` | `/api/dashboard/monthly-trends` | ANALYST, ADMIN | Bar chart time series data |
| `GET` | `/api/dashboard/recent-activity` | ANALYST, ADMIN | Last 10 records |

### Protected (Users)
| Method | Path | Role Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/me` | ALL | Current user profile |
| `GET` | `/api/users` | ADMIN | Get paginated user list |
| `GET` | `/api/users/{id}` | ADMIN | Get user details |
| `POST` | `/api/users` | ADMIN | Create a specific user |
| `PUT` | `/api/users/{id}` | ADMIN | Modify user role / status |
| `DELETE`| `/api/users/{id}` | ADMIN | Soft deactivate user |

*Swagger UI is available at `http://localhost:8080/swagger-ui.html` for testing endpoints interactively.*

---

## 6. Optional Enhancements Implemented

1. **JWT Authentication Persistence:** Zustand heavily leverages the `persist` middleware to automatically load tokens from `localStorage`, ensuring users stay logged in across hard refreshes.
2. **Pagination UI:** A smart layout UI component cleanly handles page limits and produces sliding "..." windows when dealing with large datasets on `TransactionsPage` and `UsersPage`. 
3. **Search Support:** The dashboard transaction filters actively rely on a custom React hook `useDebounce` that delays network calls while searching categories. It merges with query parameters.
4. **Soft Delete UX:** Entities (`User`, `Transaction`) have boolean flags representing deletion. Backend endpoints use `@SQLRestriction` to hide. The UI removes values visually instead of completely losing DB history.
5. **Rate Limit Handling:** Bucket4j sits in front of Auth endpoints. On receiving a `429 Too Many Requests`, a notification toast fires without terminating the app state.
6. **Loading/Error States:** Promise results fall back to sleek dark-themed loaders and isolated error boundary cards without full page crashes.
7. **API Documentation Link:** Configured in `Sidebar.jsx`, a quick access link navigates admins immediately to the Open API definition view.

---

## 7. Sample API Calls (curl)

**1. Login as Admin:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@finance.com", "password":"admin123"}'
```

**2. List Transactions with pagination:**
*(Replace `$TOKEN` with the JWT returned from the login call)*
```bash
curl -X GET "http://localhost:8080/api/transactions?size=5&page=0" \
  -H "Authorization: Bearer $TOKEN"
```

**3. Get Dashboard Category Data:**
```bash
curl -X GET "http://localhost:8080/api/dashboard/category-breakdown" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 8. Deployment Notes

### Backend (Railway/Render recommended)
- Generate a proper JWT Secret String (256-bit hash) and define as `APP_JWT_SECRET`.
- Point DB Config to a hosted PostgreSQL instance via `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `PASSWORD` vars.

### Frontend (Vercel/Netlify recommended)
- Set Environment Variable `VITE_API_BASE_URL` to your live Backend URL.
- Make sure routing is configured properly using standard Single Page App redirect configurations (e.g. `_redirects` file mapped to `index.html`) so refreshing on nested routes doesn't yield 404s.

---

## 9. Assumptions Made & Known Tradeoffs

- **User Self-Management:** Users are currently prohibited from changing their own passwords post-registration to simplify the demo scope. Only Administrators manage major profile alterations via the `/api/users` panel.
- **Deactivation vs Deletion:** A User deleted via the Admin dashboard is only marked "INACTIVE" to prevent their previously created Transactions from orphan foreign keys.
- **No Role Hierarchy:** By design layout, Roles are distinct paths. `ADMIN` contains all features `VIEWER` has, but it is explicitly passed through checks.
