/**
 * <h2>Package: com.finance.backend.exception</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   Centralizes all error handling for the application. Custom exception classes define 
 *   meaningful error types, and GlobalExceptionHandler catches them all and maps them to 
 *   clean, consistent HTTP error responses.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>GlobalExceptionHandler.java</b> — Singleton controller advice mapping exceptions to responses</li>
 *   <li><b>ResourceNotFoundException.java</b> — Triggers universally configured 404 behavior</li>
 *   <li><b>UnauthorizedException.java</b> — Yields distinct 401 unauthenticated patterns</li>
 *   <li><b>DuplicateResourceException.java</b> — Throws cleanly handled 409 Conflicts</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   All layers (exceptions thrown anywhere, caught here)
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   Using @RestControllerAdvice means no try-catch blocks are needed in controllers or 
 *   services — exceptions bubble up and are handled in one place.
 * </p>
 */
package com.finance.backend.exception;
