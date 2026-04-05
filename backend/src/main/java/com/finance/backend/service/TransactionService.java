package com.finance.backend.service;

import com.finance.backend.dto.request.TransactionRequest;
import com.finance.backend.dto.response.PagedResponse;
import com.finance.backend.dto.response.TransactionResponse;
import com.finance.backend.exception.ResourceNotFoundException;
import com.finance.backend.model.Transaction;
import com.finance.backend.model.TransactionType;
import com.finance.backend.model.User;
import com.finance.backend.repository.TransactionRepository;
import com.finance.backend.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service for transaction management.
 * Supports dynamic filtering via JPA Specifications,
 * pagination, sorting, and soft delete.
 */
@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    /**
     * Get paginated transactions with optional filters.
     * Supports filtering by type, category (partial match), and date range.
     * Sorting by date or amount in asc/desc order.
     */
    public PagedResponse<TransactionResponse> getTransactions(
            int page, int size, TransactionType type, String category,
            LocalDate startDate, LocalDate endDate,
            String sortBy, String sortDir) {

        Sort sort = Sort.by(
                sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC,
                sortBy.equals("amount") ? "amount" : "date"
        );
        Pageable pageable = PageRequest.of(page, size, sort);

        // Build dynamic specification for filtering
        Specification<Transaction> spec = buildSpecification(type, category, startDate, endDate);

        Page<Transaction> transactionPage = transactionRepository.findAll(spec, pageable);

        List<TransactionResponse> content = transactionPage.getContent().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return PagedResponse.<TransactionResponse>builder()
                .content(content)
                .page(transactionPage.getNumber())
                .size(transactionPage.getSize())
                .totalElements(transactionPage.getTotalElements())
                .totalPages(transactionPage.getTotalPages())
                .first(transactionPage.isFirst())
                .last(transactionPage.isLast())
                .build();
    }

    /**
     * Get a single transaction by ID.
     */
    public TransactionResponse getTransactionById(UUID id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction", "id", id));
        return mapToResponse(transaction);
    }

    /**
     * Create a new transaction.
     * The creator is automatically determined from the authenticated user's email.
     */
    @Transactional
    public TransactionResponse createTransaction(TransactionRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        Transaction transaction = Transaction.builder()
                .amount(request.getAmount())
                .type(request.getType())
                .category(request.getCategory())
                .date(request.getDate())
                .notes(request.getNotes())
                .createdBy(user)
                .isDeleted(false)
                .build();

        transaction = transactionRepository.save(transaction);
        return mapToResponse(transaction);
    }

    /**
     * Update an existing transaction.
     */
    @Transactional
    public TransactionResponse updateTransaction(UUID id, TransactionRequest request) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction", "id", id));

        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setCategory(request.getCategory());
        transaction.setDate(request.getDate());
        transaction.setNotes(request.getNotes());

        transaction = transactionRepository.save(transaction);
        return mapToResponse(transaction);
    }

    /**
     * Soft-delete a transaction by setting isDeleted = true.
     * The record remains in the database but is filtered from all queries.
     */
    @Transactional
    public void softDeleteTransaction(UUID id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction", "id", id));
        transaction.setIsDeleted(true);
        transactionRepository.save(transaction);
    }

    /**
     * Build a JPA Specification for dynamic transaction filtering.
     * Combines type, category (case-insensitive partial match), and date range predicates.
     */
    private Specification<Transaction> buildSpecification(
            TransactionType type, String category,
            LocalDate startDate, LocalDate endDate) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (type != null) {
                predicates.add(criteriaBuilder.equal(root.get("type"), type));
            }
            if (category != null && !category.isBlank()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("category")),
                        "%" + category.toLowerCase() + "%"));
            }
            if (startDate != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("date"), startDate));
            }
            if (endDate != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("date"), endDate));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    /**
     * Map Transaction entity to TransactionResponse DTO.
     */
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
