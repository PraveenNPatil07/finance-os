package com.finance.backend.model;

/**
 * Enum representing user roles in the finance system.
 * Each role has progressively more permissions:
 * VIEWER < ANALYST < ADMIN
 */
public enum Role {
    VIEWER,
    ANALYST,
    ADMIN
}
