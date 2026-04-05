package com.finance.backend.service;

import com.finance.backend.dto.response.DashboardSummaryResponse;
import com.finance.backend.model.TransactionType;
import com.finance.backend.repository.TransactionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

/**
 * Unit tests for DashboardService.
 */
@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private DashboardService dashboardService;

    @Test
    @DisplayName("Get summary returns correct totals")
    void testGetSummaryReturnsCorrectTotals() {
        when(transactionRepository.sumAmountByType(TransactionType.INCOME))
                .thenReturn(new BigDecimal("200000"));
        when(transactionRepository.sumAmountByType(TransactionType.EXPENSE))
                .thenReturn(new BigDecimal("80000"));
        when(transactionRepository.countAllTransactions()).thenReturn(15L);
        when(transactionRepository.sumAmountByTypeAndDateBetween(
                eq(TransactionType.INCOME), any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(new BigDecimal("80000"));
        when(transactionRepository.sumAmountByTypeAndDateBetween(
                eq(TransactionType.EXPENSE), any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(new BigDecimal("20000"));

        DashboardSummaryResponse summary = dashboardService.getSummary();

        assertThat(summary.getTotalIncome()).isEqualByComparingTo(new BigDecimal("200000"));
        assertThat(summary.getTotalExpenses()).isEqualByComparingTo(new BigDecimal("80000"));
        assertThat(summary.getNetBalance()).isEqualByComparingTo(new BigDecimal("120000"));
        assertThat(summary.getTotalTransactions()).isEqualTo(15);
        assertThat(summary.getThisMonthIncome()).isEqualByComparingTo(new BigDecimal("80000"));
        assertThat(summary.getThisMonthExpenses()).isEqualByComparingTo(new BigDecimal("20000"));
        assertThat(summary.getThisMonthNet()).isEqualByComparingTo(new BigDecimal("60000"));
    }

    @Test
    @DisplayName("Category breakdown returns correct percentages")
    void testCategoryBreakdownPercentages() {
        List<Object[]> mockResults = List.of(
                new Object[]{"Rent", new BigDecimal("12000")},
                new Object[]{"Food", new BigDecimal("5000")},
                new Object[]{"Transport", new BigDecimal("3000")}
        );

        when(transactionRepository.getCategoryBreakdown(
                any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(mockResults);

        List<Map<String, Object>> breakdown = dashboardService
                .getCategoryBreakdown(null, null);

        assertThat(breakdown).hasSize(3);

        // Rent: 12000 / 20000 = 60%
        assertThat(breakdown.get(0).get("category")).isEqualTo("Rent");
        assertThat((double) breakdown.get(0).get("percentage")).isEqualTo(60.0);

        // Food: 5000 / 20000 = 25%
        assertThat(breakdown.get(1).get("category")).isEqualTo("Food");
        assertThat((double) breakdown.get(1).get("percentage")).isEqualTo(25.0);

        // Transport: 3000 / 20000 = 15%
        assertThat(breakdown.get(2).get("category")).isEqualTo("Transport");
        assertThat((double) breakdown.get(2).get("percentage")).isEqualTo(15.0);
    }
}
