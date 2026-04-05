/**
 * <h2>Package: com.finance.backend.service</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   The business logic layer. All rules, calculations, validations, and decisions 
 *   live here. Services are the heart of the application — controllers are thin, 
 *   services are rich.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>AuthService.java</b> — Orchestrates authentication flows and token issuance</li>
 *   <li><b>UserService.java</b> — Handles user lifecycle rules and modifications</li>
 *   <li><b>TransactionService.java</b> — Enforces financial logging logic and calculations</li>
 *   <li><b>DashboardService.java</b> — Aggregates and transforms chart data for the UI</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   repository/, model/, dto/, security/
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   Services never return raw JPA entities to controllers — they always map to 
 *   DTOs first.
 * </p>
 */
package com.finance.backend.service;
