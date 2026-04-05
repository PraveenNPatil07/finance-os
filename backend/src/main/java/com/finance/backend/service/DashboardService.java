package com.finance.backend.service;

import com.finance.backend.dto.response.DashboardSummaryResponse;
import com.finance.backend.dto.response.TransactionResponse;
import com.finance.backend.model.Transaction;
import com.finance.backend.model.TransactionType;
import com.finance.backend.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service for dashboard analytics and aggregation.
 * Provides financial summaries, category breakdowns, monthly trends,
 * and recent activity data.
 */
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TransactionRepository transactionRepository;

    /**
     * Get overall financial summary including all-time and current month metrics.
     */
    public DashboardSummaryResponse getSummary() {
        BigDecimal totalIncome = transactionRepository.sumAmountByType(TransactionType.INCOME);
        BigDecimal totalExpenses = transactionRepository.sumAmountByType(TransactionType.EXPENSE);
        BigDecimal netBalance = totalIncome.subtract(totalExpenses);
        long totalTransactions = transactionRepository.countAllTransactions();

        // Current month calculations
        LocalDate now = LocalDate.now();
        LocalDate thisMonthStart = now.withDayOfMonth(1);
        LocalDate thisMonthEnd = now.withDayOfMonth(now.lengthOfMonth());

        BigDecimal thisMonthIncome = transactionRepository
                .sumAmountByTypeAndDateBetween(TransactionType.INCOME, thisMonthStart, thisMonthEnd);
        BigDecimal thisMonthExpenses = transactionRepository
                .sumAmountByTypeAndDateBetween(TransactionType.EXPENSE, thisMonthStart, thisMonthEnd);
        BigDecimal thisMonthNet = thisMonthIncome.subtract(thisMonthExpenses);

        // Previous month calculations (for trends)
        LocalDate lastMonthStart = now.minusMonths(1).withDayOfMonth(1);
        LocalDate lastMonthEnd = now.minusMonths(1).withDayOfMonth(now.minusMonths(1).lengthOfMonth());

        BigDecimal lastMonthIncome = transactionRepository
                .sumAmountByTypeAndDateBetween(TransactionType.INCOME, lastMonthStart, lastMonthEnd);
        BigDecimal lastMonthExpenses = transactionRepository
                .sumAmountByTypeAndDateBetween(TransactionType.EXPENSE, lastMonthStart, lastMonthEnd);
        BigDecimal lastMonthNet = lastMonthIncome.subtract(lastMonthExpenses);

        return DashboardSummaryResponse.builder()
                .totalIncome(totalIncome)
                .totalExpenses(totalExpenses)
                .netBalance(netBalance)
                .totalTransactions(totalTransactions)
                .thisMonthIncome(thisMonthIncome)
                .thisMonthExpenses(thisMonthExpenses)
                .thisMonthNet(thisMonthNet)
                .incomeTrend(calculateTrend(lastMonthIncome, thisMonthIncome))
                .expenseTrend(calculateTrend(lastMonthExpenses, thisMonthExpenses))
                .balanceTrend(calculateTrend(lastMonthNet, thisMonthNet))
                .build();
    }

    private Double calculateTrend(BigDecimal previous, BigDecimal current) {
        if (previous == null || previous.compareTo(BigDecimal.ZERO) == 0) {
            return current.compareTo(BigDecimal.ZERO) > 0 ? 100.0 : 0.0;
        }
        return current.subtract(previous)
                .divide(previous, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .doubleValue();
    }

    /**
     * Get expense breakdown by category for a given date range.
     * Returns each category's total and percentage of overall expenses.
     * Defaults to last 30 days if no date range provided.
     */
    public List<Map<String, Object>> getCategoryBreakdown(LocalDate startDate, LocalDate endDate) {
        if (startDate == null) {
            startDate = LocalDate.now().minusDays(30);
        }
        if (endDate == null) {
            endDate = LocalDate.now();
        }

        List<Object[]> results = transactionRepository.getCategoryBreakdown(startDate, endDate);

        // Calculate total for percentage computation
        BigDecimal grandTotal = results.stream()
                .map(r -> (BigDecimal) r[1])
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Map<String, Object>> breakdown = new ArrayList<>();
        for (Object[] row : results) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("category", row[0]);
            BigDecimal total = (BigDecimal) row[1];
            item.put("total", total);

            double percentage = grandTotal.compareTo(BigDecimal.ZERO) > 0
                    ? total.multiply(BigDecimal.valueOf(100))
                    .divide(grandTotal, 1, RoundingMode.HALF_UP)
                    .doubleValue()
                    : 0.0;
            item.put("percentage", percentage);
            breakdown.add(item);
        }

        return breakdown;
    }

    /**
     * Get monthly income, expense, and net totals for a given year.
     * Returns data for all 12 months (zero-filled for months with no transactions).
     */
    public List<Map<String, Object>> getMonthlyTrends(int year) {
        List<Object[]> results = transactionRepository.getMonthlyTrends(year);

        // Initialize all 12 months with zero values
        Map<Integer, BigDecimal> incomeByMonth = new LinkedHashMap<>();
        Map<Integer, BigDecimal> expenseByMonth = new LinkedHashMap<>();
        for (int i = 1; i <= 12; i++) {
            incomeByMonth.put(i, BigDecimal.ZERO);
            expenseByMonth.put(i, BigDecimal.ZERO);
        }

        // Populate from query results
        for (Object[] row : results) {
            int month = (Integer) row[0];
            TransactionType type = (TransactionType) row[1];
            BigDecimal amount = (BigDecimal) row[2];

            if (type == TransactionType.INCOME) {
                incomeByMonth.put(month, amount);
            } else {
                expenseByMonth.put(month, amount);
            }
        }

        // Build response with month names
        List<Map<String, Object>> trends = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            Map<String, Object> monthData = new LinkedHashMap<>();
            String monthName = Month.of(i).getDisplayName(TextStyle.FULL, Locale.ENGLISH);
            BigDecimal income = incomeByMonth.get(i);
            BigDecimal expense = expenseByMonth.get(i);

            monthData.put("month", monthName);
            monthData.put("income", income);
            monthData.put("expenses", expense);
            monthData.put("net", income.subtract(expense));
            trends.add(monthData);
        }

        return trends;
    }

    /**
     * Get the 10 most recent transactions for the dashboard.
     */
    public List<TransactionResponse> getRecentActivity() {
        List<Transaction> transactions = transactionRepository
                .findRecentTransactions(PageRequest.of(0, 10));

        return transactions.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private TransactionResponse mapToResponse(Transaction transaction) {
        return TransactionResponse.builder()
                .id(transaction.getId())
                .amount(transaction.getAmount())
                .type(transaction.getType().name())
                .category(transaction.getCategory())
                .date(transaction.getDate())
                .notes(transaction.getNotes())
                .createdByUsername(transaction.getCreatedBy().getUsername())
                .createdById(transaction.getCreatedBy().getId())
                .createdAt(transaction.getCreatedAt())
                .updatedAt(transaction.getUpdatedAt())
                .build();
    }
}
