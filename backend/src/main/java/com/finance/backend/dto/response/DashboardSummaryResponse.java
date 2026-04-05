package com.finance.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Response DTO for the dashboard summary endpoint.
 * Contains aggregate financial data for all-time and current month.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryResponse {
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal netBalance;
    private long totalTransactions;
    private BigDecimal thisMonthIncome;
    private BigDecimal thisMonthExpenses;
    private BigDecimal thisMonthNet;
    
    // Trend percentages (month-over-month)
    private Double incomeTrend;
    private Double expenseTrend;
    private Double balanceTrend;
}
