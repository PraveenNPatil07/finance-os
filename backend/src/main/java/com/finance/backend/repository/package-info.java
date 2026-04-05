/**
 * <h2>Package: com.finance.backend.repository</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   The data access layer. Interfaces that extend JpaRepository to handle all database 
 *   reads and writes. Contains custom JPQL queries for filtering, search, and dashboard 
 *   aggregations.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>UserRepository.java</b> — Executes Data Access logic against the users table</li>
 *   <li><b>TransactionRepository.java</b> — Handles transaction persistence and aggregations</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   model/, service/
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   TransactionRepository uses Specification&lt;T&gt; for dynamic multi-filter queries 
 *   and custom @Query methods for dashboard aggregations.
 * </p>
 */
package com.finance.backend.repository;
