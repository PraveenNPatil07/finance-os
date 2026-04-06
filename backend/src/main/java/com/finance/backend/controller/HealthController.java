package com.finance.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Public health check controller for infrastructure monitoring.
 * Returns a simple UP status without requiring authentication.
 */
@RestController
@RequestMapping("/api/health")
@Tag(name = "Health", description = "System health check endpoint")
public class HealthController {

    @Operation(summary = "Check system health", description = "Returns UP status if the server is running.")
    @GetMapping
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "timestamp", java.time.LocalDateTime.now().toString(),
                "message", "FinanceOS Backend is operational"
        ));
    }
}
