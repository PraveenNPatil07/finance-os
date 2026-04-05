# 📊 FinanceOS

> A premium, full-stack financial data processing and access control dashboard.

FinanceOS is a modern SaaS-style application designed for managing financial transactions with granular role-based access control. It features a high-performance Spring Boot backend and a sleek, responsive React frontend.

---

## ✨ Features

### 🔐 Multi-Role Access Control
- **ADMIN**: Full control over transactions, users, and system settings.
- **ANALYST**: Can view all financial data and analytics but cannot modify records.
- **VIEWER**: Limited access to view essential financial reports.

### 💰 Financial Management
- **Live Dashboard**: Real-time stats for current balance, total income, and expenses.
- **Dynamic Trends**: Automated month-over-month percentage calculations for financial health tracking.
- **Transaction History**: Advanced filtering by category, date range, and transaction type.
- **CRUD Operations**: seamlessly add, edit, and delete (soft-delete) transactions.

### 📊 Analytics
- **Category Breakdown**: Interactive visualization of spending habits.
- **Monthly Trends**: Detailed bar charts comparing income vs. expenses across the year.

---

## 🛠️ Technology Stack

### Backend
- **Java 17 & Spring Boot 3.2**: Robust and scalable micro-service architecture.
- **Spring Security & JWT**: Secure stateless authentication.
- **Spring Data JPA & Hibernate**: Efficient persistence layer with PostgreSQL.
- **Swagger/OpenAPI**: Comprehensive API documentation.
- **Lombok**: Reduced boilerplate code.

### Frontend
- **React 18**: Component-based modern UI development.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first styling for a custom, premium aesthetic.
- **Zustand**: Lightweight and scalable state management.
- **Lucide React**: Beautiful, consistent iconography.
- **React Hot Toast**: Real-time user notifications.

---

## 🏗️ Project Structure (Monorepo)

```text
finance-os/
├── backend/                # Spring Boot Application
│   ├── src/main/java       # Source code (Controllers, Services, Models, Security)
│   ├── src/main/resources  # Configuration (application.yml)
│   ├── Dockerfile          # Production containerization
│   └── pom.xml             # Maven dependencies
├── frontend/               # React Application
│   ├── src/api             # Axios API services
│   ├── src/components      # Reusable UI components
│   ├── src/pages           # Page views (Dashboard, Transactions, etc.)
│   ├── src/store           # Global state (Auth)
│   ├── public/             # Static assets (Favicons, Logo)
│   └── package.json        # Node dependencies & Tailwind config
└── README.md               # You are here!
```

---

## 🚀 Deployment

### Live URLs
- **Frontend (Vercel)**: `https://finance-os-brown.vercel.app`
- **Backend (Render)**: `https://finance-os-p99j.onrender.com`
- **API Documentation**: `https://finance-os-p99j.onrender.com/swagger-ui.html`

### Environment Variables Required

#### Backend (Render)
- `DATABASE_URL`: JDBC connection string (PostgreSQL).
- `DATABASE_USERNAME`: Database user.
- `DATABASE_PASSWORD`: Database password.
- `JWT_SECRET`: A secure string (min 32 characters) for token signing.
- `FRONTEND_URL`: The Vercel URL for CORS clearance.

#### Frontend (Vercel)
- `VITE_API_BASE_URL`: Pointer to the Render backend (ends with `/api`).

---

## 🛠️ Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/PraveenNPatil07/finance-os.git
cd finance-os
```

### 2. Backend Setup
```bash
cd backend
mvn install
mvn spring-boot:run
```
*Note: Requires a running PostgreSQL instance on port 5432.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📜 License
This project was developed for the Finance Data Processing and Access Control assignment.
