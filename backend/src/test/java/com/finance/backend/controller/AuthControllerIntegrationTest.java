package com.finance.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finance.backend.dto.request.LoginRequest;
import com.finance.backend.dto.request.RegisterRequest;
import com.finance.backend.model.Role;
import com.finance.backend.model.User;
import com.finance.backend.model.UserStatus;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for AuthController using H2 in-memory database.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@SuppressWarnings("null")
class AuthControllerIntegrationTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private ObjectMapper objectMapper;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @BeforeEach
        void setUp() {
                userRepository.deleteAll();

                User admin = User.builder()
                                .username("testadmin")
                                .email("testadmin@finance.com")
                                .password(passwordEncoder.encode("admin123"))
                                .role(Role.ADMIN)
                                .status(UserStatus.ACTIVE)
                                .build();
                userRepository.save(admin);
        }

        @Test
        @DisplayName("Login with valid credentials returns 200 and token")
        void testLoginEndpointReturns200WithToken() throws Exception {
                LoginRequest request = new LoginRequest("testadmin@finance.com", "admin123");

                mockMvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.token").isNotEmpty())
                                .andExpect(jsonPath("$.username").value("testadmin"))
                                .andExpect(jsonPath("$.role").value("ADMIN"));
        }

        @Test
        @DisplayName("Login with bad credentials returns 401")
        void testLoginWithBadCredentialsReturns401() throws Exception {
                LoginRequest request = new LoginRequest("testadmin@finance.com", "wrongpassword");

                mockMvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isUnauthorized());
        }

        @Test
        @DisplayName("Register returns 201 with token")
        void testRegisterEndpointReturns201() throws Exception {
                RegisterRequest request = new RegisterRequest(
                                "newuser", "newuser@finance.com", "password123", null);

                mockMvc.perform(post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.token").isNotEmpty())
                                .andExpect(jsonPath("$.username").value("newuser"))
                                .andExpect(jsonPath("$.role").value("VIEWER"));
        }

        @Test
        @DisplayName("Protected endpoint without token returns 401")
        void testProtectedEndpointWithoutTokenReturns401() throws Exception {
                mockMvc.perform(get("/api/users/me"))
                                .andExpect(status().isUnauthorized());
        }

        @Test
        @DisplayName("Protected endpoint with valid token returns 200")
        void testProtectedEndpointWithTokenReturns200() throws Exception {
                // First, login to get a token
                LoginRequest loginRequest = new LoginRequest("testadmin@finance.com", "admin123");
                MvcResult result = mockMvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(loginRequest)))
                                .andExpect(status().isOk())
                                .andReturn();

                String responseBody = result.getResponse().getContentAsString();
                String token = objectMapper.readTree(responseBody).get("token").asText();

                // Use token to access protected endpoint
                mockMvc.perform(get("/api/users/me")
                                .header("Authorization", "Bearer " + token))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.email").value("testadmin@finance.com"));
        }
}
