/**
 * <h2>Package: com.finance.backend.dto.request</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   Defines the shape and validation rules for all inbound API request bodies. Every 
 *   POST and PUT endpoint consumes one of these DTOs.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>LoginRequest.java</b> — Validates username and password payload</li>
 *   <li><b>RegisterRequest.java</b> — Ensures correctly formatted sign up parameters</li>
 *   <li><b>CreateUserRequest.java</b> — Administrative user insertion validation</li>
 *   <li><b>UpdateUserRequest.java</b> — Rules for modifying existing users</li>
 *   <li><b>TransactionRequest.java</b> — Payload rules for creating/updating transactions</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   controller/ (consumed via @RequestBody)
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   All fields use @Valid annotations. Validation errors are caught by GlobalExceptionHandler 
 *   and returned as structured 400 responses.
 * </p>
 */
package com.finance.backend.dto.request;
