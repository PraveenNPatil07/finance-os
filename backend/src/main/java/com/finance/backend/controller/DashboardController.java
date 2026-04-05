package com.finance.backend.controller;

import com.finance.backend.dto.response.DashboardSummaryResponse;
import com.finance.backend.dto.response.TransactionResponse;
import com.finance.backend.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.Map;

/**
 * Dashboard analytics controller.
 * Summary is available to all authenticated users.
 * Category breakdown, monthly trends, and recent activity require ANALYST or ADMIN role.
 */
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Dashboard analytics endpoints")
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {

    private final DashboardService dashboardService;

    @Operation(summary = "Get dashboard summary",
            description = "Returns total income, expenses, net balance, and this month's metrics")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Summary retrieved"),
            @ApiResponse(responseCode = "401", description = "Not authenticated")
    })
    @GetMapping("/summary")
    @PreAuthorize("hasAnyRole('VIEWER', 'ANALYST', 'ADMIN')")
    public ResponseEntity<DashboardSummaryResponse> getSummary() {
        return ResponseEntity.ok(dashboardService.getSummary());
    }

    @Operation(summary = "Get category breakdown",
            description = "Expense breakdown by category with percentages.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Breakdown retrieved"),
            @ApiResponse(responseCode = "403", description = "Not authorized")
    })
    @GetMapping("/category-breakdown")
    @PreAuthorize("hasAnyRole('VIEWER', 'ANALYST', 'ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getCategoryBreakdown(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(dashboardService.getCategoryBreakdown(startDate, endDate));
    }

    @Operation(summary = "Get monthly trends",
            description = "Monthly income, expense, and net totals for a given year.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Trends retrieved"),
            @ApiResponse(responseCode = "403", description = "Not authorized")
    })
    @GetMapping("/monthly-trends")
    @PreAuthorize("hasAnyRole('VIEWER', 'ANALYST', 'ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyTrends(
            @RequestParam(required = false) Integer year) {
        int targetYear = (year != null) ? year : Year.now().getValue();
        return ResponseEntity.ok(dashboardService.getMonthlyTrends(targetYear));
    }

    @Operation(summary = "Get recent activity",
            description = "Last 10 transactions sorted by date descending.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Activity retrieved"),
            @ApiResponse(responseCode = "403", description = "Not authorized")
    })
    @GetMapping("/recent-activity")
    @PreAuthorize("hasAnyRole('VIEWER', 'ANALYST', 'ADMIN')")
    public ResponseEntity<List<TransactionResponse>> getRecentActivity() {
        return ResponseEntity.ok(dashboardService.getRecentActivity());
    }
}
