package com.finance.backend.repository;

import com.finance.backend.model.Transaction;
import com.finance.backend.model.TransactionType;

import com.finance.backend.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Repository for Transaction entity operations.
 * Uses JpaSpecificationExecutor for dynamic filtering.
 * Note: @SQLRestriction on the entity automatically filters soft-deleted records.
 */
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID>,
        JpaSpecificationExecutor<Transaction> {

    @Modifying
    @Query("DELETE FROM Transaction t WHERE t.createdBy = :user")
    void deleteByCreatedBy(@Param("user") User user);

    /**
     * Sum all amounts by transaction type (respects soft-delete filter).
     */
    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.type = :type")
    BigDecimal sumAmountByType(@Param("type") TransactionType type);

    /**
     * Count all non-deleted transactions.
     */
    @Query("SELECT COUNT(t) FROM Transaction t")
    long countAllTransactions();

    /**
     * Sum amounts by type within a date range.
     */
    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
            "WHERE t.type = :type AND t.date BETWEEN :startDate AND :endDate")
    BigDecimal sumAmountByTypeAndDateBetween(
            @Param("type") TransactionType type,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /**
     * Get category breakdown with totals within a date range.
     * Returns Object[] arrays: [category, totalAmount]
     */
    @Query("SELECT t.category, SUM(t.amount) FROM Transaction t " +
            "WHERE t.type = 'EXPENSE' AND t.date BETWEEN :startDate AND :endDate " +
            "GROUP BY t.category ORDER BY SUM(t.amount) DESC")
    List<Object[]> getCategoryBreakdown(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    /**
     * Get monthly income/expense totals for a specific year.
     * Returns Object[] arrays: [month, type, totalAmount]
     */
    @Query("SELECT MONTH(t.date), t.type, SUM(t.amount) FROM Transaction t " +
            "WHERE YEAR(t.date) = :year " +
            "GROUP BY MONTH(t.date), t.type " +
            "ORDER BY MONTH(t.date)")
    List<Object[]> getMonthlyTrends(@Param("year") int year);

    /**
     * Get the most recent transactions (for dashboard recent activity).
     */
    @Query("SELECT t FROM Transaction t ORDER BY t.date DESC, t.createdAt DESC")
    List<Transaction> findRecentTransactions(Pageable pageable);
}
