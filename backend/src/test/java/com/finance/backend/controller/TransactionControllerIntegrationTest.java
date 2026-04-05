package com.finance.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finance.backend.dto.request.LoginRequest;
import com.finance.backend.dto.request.TransactionRequest;
import com.finance.backend.model.*;
import com.finance.backend.repository.TransactionRepository;
import com.finance.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for TransactionController testing role-based access,
 * CRUD operations, and soft delete behavior.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@SuppressWarnings("null")
class TransactionControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String adminToken;
    private String viewerToken;

    @BeforeEach
    void setUp() throws Exception {
        transactionRepository.deleteAll();
        userRepository.deleteAll();

        // Create admin user
        userRepository.save(User.builder()
                .username("testadmin")
                .email("testadmin@finance.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .status(UserStatus.ACTIVE)
                .build());

        // Create viewer user
        userRepository.save(User.builder()
                .username("testviewer")
                .email("testviewer@finance.com")
                .password(passwordEncoder.encode("viewer123"))
                .role(Role.VIEWER)
                .status(UserStatus.ACTIVE)
                .build());

        // Get tokens
        adminToken = getToken("testadmin@finance.com", "admin123");
        viewerToken = getToken("testviewer@finance.com", "viewer123");
    }

    private String getToken(String email, String password) throws Exception {
        LoginRequest request = new LoginRequest(email, password);
        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andReturn();
        return objectMapper.readTree(
                result.getResponse().getContentAsString()).get("token").asText();
    }

    @Test
    @DisplayName("VIEWER cannot create transaction - returns 403")
    void testViewerCannotCreateTransaction() throws Exception {
        TransactionRequest request = new TransactionRequest(
                new BigDecimal("5000"), TransactionType.EXPENSE,
                "Food", LocalDate.now(), "Test");

        mockMvc.perform(post("/api/transactions")
                        .header("Authorization", "Bearer " + viewerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("ADMIN can create transaction - returns 201")
    void testAdminCanCreateTransaction() throws Exception {
        TransactionRequest request = new TransactionRequest(
                new BigDecimal("5000"), TransactionType.EXPENSE,
                "Food", LocalDate.now(), "Admin created");

        mockMvc.perform(post("/api/transactions")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.category").value("Food"))
                .andExpect(jsonPath("$.amount").value(5000));
    }

    @Test
    @DisplayName("Get transactions supports pagination")
    void testGetTransactionsPagination() throws Exception {
        // Create 3 transactions
        for (int i = 0; i < 3; i++) {
            TransactionRequest req = new TransactionRequest(
                    new BigDecimal("1000"), TransactionType.EXPENSE,
                    "Category" + i, LocalDate.now(), null);
            mockMvc.perform(post("/api/transactions")
                    .header("Authorization", "Bearer " + adminToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(req)));
        }

        mockMvc.perform(get("/api/transactions")
                        .header("Authorization", "Bearer " + adminToken)
                        .param("page", "0")
                        .param("size", "2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.totalElements").value(3))
                .andExpect(jsonPath("$.totalPages").value(2));
    }

    @Test
    @DisplayName("Soft-deleted transactions do not appear in list")
    void testSoftDeleteDoesNotShowInList() throws Exception {
        // Create a transaction
        TransactionRequest req = new TransactionRequest(
                new BigDecimal("5000"), TransactionType.EXPENSE,
                "ToDelete", LocalDate.now(), null);

        MvcResult createResult = mockMvc.perform(post("/api/transactions")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andReturn();

        String transactionId = objectMapper.readTree(
                createResult.getResponse().getContentAsString()).get("id").asText();

        // Soft-delete it
        mockMvc.perform(delete("/api/transactions/" + transactionId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNoContent());

        // Verify it's gone from the list
        mockMvc.perform(get("/api/transactions")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(0)));
    }
}
