/**
 * <h2>Package: com.finance.backend.dto.response</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   Defines the exact shape of all outbound API responses. Ensures the API contract 
 *   is stable and never accidentally leaks internal entity fields (e.g. hashed passwords).
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>AuthResponse.java</b> — Holds tokens and initial authenticated user profile info</li>
 *   <li><b>UserResponse.java</b> — Sanitized representation of User entities</li>
 *   <li><b>TransactionResponse.java</b> — Formatted DTO mapped back to the client application</li>
 *   <li><b>PagedResponse.java</b> — Standard wrapper for pagination data handling</li>
 *   <li><b>DashboardSummaryResponse.java</b> — Structured grouping for analytical data overviews</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   service/ (populated here), controller/ (returned from here)
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   PagedResponse&lt;T&gt; is a generic wrapper used by all paginated endpoints to provide a 
 *   consistent pagination envelope.
 * </p>
 */
package com.finance.backend.dto.response;
