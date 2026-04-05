/**
 * <h2>Package: com.finance.backend.config</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   Centralized configuration for all cross-cutting concerns — security, JWT, CORS, and 
 *   rate limiting. Nothing in this package contains business logic.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>SecurityConfig.java</b> — Configures HTTP security, endpoints, and sessions</li>
 *   <li><b>JwtConfig.java</b> — Properties and settings configuration for JWT generation</li>
 *   <li><b>CorsConfig.java</b> — Configures global Cross-Origin Resource Sharing logic</li>
 *   <li><b>RateLimitConfig.java</b> — Defines bucket configurations for rate limiting</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   security/, middleware/, all controllers
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   SecurityConfig is the most critical file in the app — all HTTP security decisions 
 *   are made here.
 * </p>
 */
package com.finance.backend.config;
