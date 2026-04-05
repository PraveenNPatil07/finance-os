package com.finance.backend.service;

import com.finance.backend.dto.request.TransactionRequest;
import com.finance.backend.dto.response.PagedResponse;
import com.finance.backend.dto.response.TransactionResponse;
import com.finance.backend.exception.ResourceNotFoundException;
import com.finance.backend.model.*;
import com.finance.backend.repository.TransactionRepository;
import com.finance.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for TransactionService.
 */
@ExtendWith(MockitoExtension.class)
@SuppressWarnings("null")
class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TransactionService transactionService;

    private User adminUser;
    private Transaction sampleTransaction;

    @BeforeEach
    void setUp() {
        adminUser = User.builder()
                .id(UUID.randomUUID())
                .username("admin")
                .email("admin@finance.com")
                .password("encoded")
                .role(Role.ADMIN)
                .status(UserStatus.ACTIVE)
                .build();

        sampleTransaction = Transaction.builder()
                .id(UUID.randomUUID())
                .amount(new BigDecimal("5000.00"))
                .type(TransactionType.EXPENSE)
                .category("Food")
                .date(LocalDate.now())
                .notes("Test transaction")
                .createdBy(adminUser)
                .isDeleted(false)
                .build();
    }

    @Test
    @DisplayName("Create transaction with valid data succeeds")
    void testCreateTransactionSuccess() {
        TransactionRequest request = new TransactionRequest(
                new BigDecimal("5000.00"), TransactionType.EXPENSE,
                "Food", LocalDate.now(), "Test transaction");

        when(userRepository.findByEmail("admin@finance.com"))
                .thenReturn(Optional.of(adminUser));
        when(transactionRepository.save(any(Transaction.class)))
                .thenReturn(sampleTransaction);

        TransactionResponse response = transactionService
                .createTransaction(request, "admin@finance.com");

        assertThat(response.getAmount()).isEqualByComparingTo(new BigDecimal("5000.00"));
        assertThat(response.getCategory()).isEqualTo("Food");
        assertThat(response.getType()).isEqualTo("EXPENSE");
        assertThat(response.getCreatedByUsername()).isEqualTo("admin");

        verify(transactionRepository).save(any(Transaction.class));
    }

    @Test
    @DisplayName("Create transaction with non-existent user throws exception")
    void testCreateTransactionWithInvalidUser() {
        TransactionRequest request = new TransactionRequest(
                new BigDecimal("5000.00"), TransactionType.EXPENSE,
                "Food", LocalDate.now(), null);

        when(userRepository.findByEmail("unknown@finance.com"))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                transactionService.createTransaction(request, "unknown@finance.com"))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("Soft delete sets isDeleted to true")
    void testSoftDeleteTransaction() {
        when(transactionRepository.findById(sampleTransaction.getId()))
                .thenReturn(Optional.of(sampleTransaction));
        when(transactionRepository.save(any(Transaction.class)))
                .thenReturn(sampleTransaction);

        transactionService.softDeleteTransaction(sampleTransaction.getId());

        assertThat(sampleTransaction.getIsDeleted()).isTrue();
        verify(transactionRepository).save(sampleTransaction);
    }

    @Test
    @DisplayName("Get transactions with filters returns paginated results")
    @SuppressWarnings("unchecked")
    void testGetTransactionsWithFilters() {
        Page<Transaction> page = new PageImpl<>(
                List.of(sampleTransaction),
                Pageable.ofSize(10), 1);

        when(transactionRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(page);

        PagedResponse<TransactionResponse> response = transactionService
                .getTransactions(0, 10, TransactionType.EXPENSE, "Food",
                        null, null, "date", "desc");

        assertThat(response.getContent()).hasSize(1);
        assertThat(response.getTotalElements()).isEqualTo(1);
        assertThat(response.getContent().get(0).getCategory()).isEqualTo("Food");
    }
}
