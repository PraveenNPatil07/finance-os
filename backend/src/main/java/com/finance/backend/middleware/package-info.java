/**
 * <h2>Package: com.finance.backend.middleware</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   Contains filters that intercept HTTP requests before they reach the security or 
 *   controller layer. Currently handles rate limiting to protect auth endpoints from 
 *   brute force attacks.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>RateLimitingFilter.java</b> — Primary filter assessing bucket limitations</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   config/RateLimitConfig, config/SecurityConfig
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   Rate limiting uses Bucket4j with an in-memory ConcurrentHashMap keyed by IP address. 
 *   Limit is 10 requests per minute per IP on /api/auth/** endpoints only.
 * </p>
 */
package com.finance.backend.middleware;
