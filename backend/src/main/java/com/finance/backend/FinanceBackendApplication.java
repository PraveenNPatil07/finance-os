package com.finance.backend;

import com.finance.backend.model.*;
import com.finance.backend.repository.TransactionRepository;
import com.finance.backend.repository.UserRepository;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Main Spring Boot application class for the Finance Backend.
 * Includes OpenAPI configuration and data seeder for initial setup.
 */
@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Finance Dashboard API", version = "1.0.0", description = "API for Finance Data Processing and Access Control Backend"))
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
@Slf4j
@RequiredArgsConstructor
public class FinanceBackendApplication {

        public static void main(String[] args) {
                SpringApplication.run(FinanceBackendApplication.class, args);
        }

        /**
         * Seeds sample data on startup if the database is empty.
         * Creates 3 users (admin, analyst, viewer) and 15 sample transactions.
         */
        @Bean
        @SuppressWarnings("null")
        CommandLineRunner seedData(UserRepository userRepository,
                        TransactionRepository transactionRepository,
                        PasswordEncoder passwordEncoder) {
                return args -> {
                        if (userRepository.count() == 0) {
                                log.info("Seeding users...");
                                userRepository.save(User.builder()
                                                .username("admin")
                                                .email("admin@finance.com")
                                                .password(passwordEncoder.encode("admin123"))
                                                .role(Role.ADMIN)
                                                .status(UserStatus.ACTIVE)
                                                .build());

                                userRepository.save(User.builder()
                                                .username("analyst")
                                                .email("analyst@finance.com")
                                                .password(passwordEncoder.encode("analyst123"))
                                                .role(Role.ANALYST)
                                                .status(UserStatus.ACTIVE)
                                                .build());

                                userRepository.save(User.builder()
                                                .username("viewer")
                                                .email("viewer@finance.com")
                                                .password(passwordEncoder.encode("viewer123"))
                                                .role(Role.VIEWER)
                                                .status(UserStatus.ACTIVE)
                                                .build());
                                log.info("Created 3 users: admin, analyst, viewer");
                        }

                        if (transactionRepository.count() == 0) {
                                log.info("Seeding transactions...");
                                User admin = userRepository.findByUsername("admin").orElseThrow();
                                
                                LocalDate now = LocalDate.now();
                                List<Transaction> transactions = List.of(
                                                Transaction.builder()
                                                                .amount(new BigDecimal("80000.0000"))
                                                                .type(TransactionType.INCOME)
                                                                .category("Salary")
                                                                .date(now.minusMonths(2).withDayOfMonth(1))
                                                                .notes("Monthly salary for " + now.minusMonths(2).getMonth())
                                                                .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("12000.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Rent")
                                                        .date(now.minusMonths(2).withDayOfMonth(5))
                                                        .notes("Monthly rent payment")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("3500.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Food")
                                                        .date(now.minusMonths(2).withDayOfMonth(10))
                                                        .notes("Groceries and dining out")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("1500.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Transport")
                                                        .date(now.minusMonths(2).withDayOfMonth(15))
                                                        .notes("Fuel and cab rides")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("15000.0000"))
                                                        .type(TransactionType.INCOME)
                                                        .category("Freelance")
                                                        .date(now.minusMonths(2).withDayOfMonth(20))
                                                        .notes("Web development project payment")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("80000.0000"))
                                                        .type(TransactionType.INCOME)
                                                        .category("Salary")
                                                        .date(now.minusMonths(1).withDayOfMonth(1))
                                                        .notes("Monthly salary for " + now.minusMonths(1).getMonth())
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("12000.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Rent")
                                                        .date(now.minusMonths(1).withDayOfMonth(5))
                                                        .notes("Monthly rent payment")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("4200.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Food")
                                                        .date(now.minusMonths(1).withDayOfMonth(8))
                                                        .notes("Groceries and restaurants")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("2500.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Healthcare")
                                                        .date(now.minusMonths(1).withDayOfMonth(12))
                                                        .notes("Doctor visit and medicines")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("3000.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Entertainment")
                                                        .date(now.minusMonths(1).withDayOfMonth(18))
                                                        .notes("Movies, games, and subscriptions")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("2200.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Utilities")
                                                        .date(now.minusMonths(1).withDayOfMonth(25))
                                                        .notes("Electricity and internet bills")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("80000.0000"))
                                                        .type(TransactionType.INCOME)
                                                        .category("Salary")
                                                        .date(now.withDayOfMonth(1))
                                                        .notes("Monthly salary for " + now.getMonth())
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("12000.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Rent")
                                                        .date(now.withDayOfMonth(Math.min(5, now.lengthOfMonth())))
                                                        .notes("Monthly rent payment")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("500.0000"))
                                                        .type(TransactionType.EXPENSE)
                                                        .category("Transport")
                                                        .date(now.withDayOfMonth(Math.min(3, now.lengthOfMonth())))
                                                        .notes("Metro card recharge")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build(),
                                        Transaction.builder()
                                                        .amount(new BigDecimal("25000.0000"))
                                                        .type(TransactionType.INCOME)
                                                        .category("Freelance")
                                                        .date(now.withDayOfMonth(Math.min(2, now.lengthOfMonth())))
                                                        .notes("Mobile app development project")
                                                        .createdBy(admin)
                                                        .isDeleted(false)
                                                        .build());

                        transactionRepository.saveAll(transactions);
                        log.info("Created 15 sample transactions");
                        log.info("Database seeding complete!");
                        }
                };
        }
}
