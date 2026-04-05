/**
 * <h2>Package: com.finance.backend.dto</h2>
 *
 * <h3>Responsibility</h3>
 * <p>
 *   Data Transfer Objects that define the exact shape of data entering and leaving the 
 *   API. Decouples the internal domain model from the external API contract. Prevents 
 *   accidentally exposing sensitive fields like passwords.
 * </p>
 *
 * <h3>Contains</h3>
 * <ul>
 *   <li><b>request/</b> — sub-package for all inbound request bodies</li>
 *   <li><b>response/</b> — sub-package for all outbound response payloads</li>
 * </ul>
 *
 * <h3>Connects To</h3>
 * <p>
 *   controller/, service/
 * </p>
 *
 * <h3>Design Notes</h3>
 * <p>
 *   DTOs use Jakarta Bean Validation annotations (@NotBlank, @Email etc.) so validation 
 *   happens automatically before reaching service layer.
 * </p>
 */
package com.finance.backend.dto;
