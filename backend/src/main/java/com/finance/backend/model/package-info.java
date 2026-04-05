/**
 * <h2>Package: com.finance.backend.model</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   JPA entity definitions that map directly to database tables. These are the core 
 *   domain objects of the system — User and Transaction. Also contains enum types 
 *   used across the application.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>User.java</b> — Database entity mapping for system users</li>
 *   <li><b>Transaction.java</b> — Database entity mapping for financial records</li>
 *   <li><b>Role.java</b> — Defines user permission hierarchies</li>
 *   <li><b>UserStatus.java</b> — Represents user states natively natively mapping to tables</li>
 *   <li><b>TransactionType.java</b> — Enumerates valid financial flow types (e.g. INCOME, EXPENSE)</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   repository/, dto/, service/
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   Transaction uses @SQLRestriction to automatically filter soft-deleted records 
 *   from ALL queries at the ORM level — no manual filtering needed in services or 
 *   repositories.
 * </p>
 */
package com.finance.backend.model;
