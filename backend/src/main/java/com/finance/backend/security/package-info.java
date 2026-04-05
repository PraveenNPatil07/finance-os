/**
 * <h2>Package: com.finance.backend.security</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   Implements the JWT authentication mechanism. Handles token generation, validation, 
 *   and extraction of user identity from tokens. Also loads user details from the database 
 *   for Spring Security's authentication process.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>JwtTokenProvider.java</b> — Responsible for signing tokens and defining claims</li>
 *   <li><b>JwtAuthenticationFilter.java</b> — Intercepts and validates HTTP authorization headers</li>
 *   <li><b>CustomUserDetailsService.java</b> — Connects Spring Security context logic maps properties</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   config/SecurityConfig, repository/UserRepository, model/User
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   JwtAuthenticationFilter runs on every request before any controller is reached. It 
 *   reads the Bearer token, validates it, and populates the SecurityContext so 
 *   @PreAuthorize works correctly.
 * </p>
 */
package com.finance.backend.security;
