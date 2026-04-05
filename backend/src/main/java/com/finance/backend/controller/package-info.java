/**
 * <h2>Package: com.finance.backend.controller</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   The HTTP layer of the application. Controllers receive incoming requests, delegate to 
 *   services, and return appropriate HTTP responses. Contains zero business logic.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>AuthController.java</b> — Handles login and registration endpoints</li>
 *   <li><b>UserController.java</b> — Handles user management REST endpoints</li>
 *   <li><b>TransactionController.java</b> — Handles transaction CRUD and filtering</li>
 *   <li><b>DashboardController.java</b> — Serves aggregated data endpoints for charts</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   service/, dto/
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   Every endpoint is annotated with Swagger @Operation for API documentation. Role 
 *   enforcement is done via @PreAuthorize here.
 * </p>
 */
package com.finance.backend.controller;
