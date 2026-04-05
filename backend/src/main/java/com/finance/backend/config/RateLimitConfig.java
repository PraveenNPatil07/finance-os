package com.finance.backend.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Rate limiting configuration using Bucket4j.
 * Maintains an in-memory map of token buckets keyed by IP address.
 * Each IP gets 10 requests per minute to auth endpoints.
 */
@Configuration
public class RateLimitConfig {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    /**
     * Resolve (or create) a rate-limit bucket for a given IP address.
     * Each bucket allows 10 requests per 60-second window.
     */
    public Bucket resolveBucket(String ipAddress) {
        return buckets.computeIfAbsent(ipAddress, this::createNewBucket);
    }

    private Bucket createNewBucket(String ipAddress) {
        Bandwidth limit = Bandwidth.builder()
                .capacity(10)
                .refillIntervally(10, Duration.ofSeconds(60))
                .build();
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}
