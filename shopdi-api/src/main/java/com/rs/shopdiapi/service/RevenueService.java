package com.rs.shopdiapi.service;

import java.math.BigDecimal;

public interface RevenueService {
    BigDecimal calculateRevenue(Long sellerId);

    void updateRevenue(Long sellerId, BigDecimal orderTotal);

    void refundRevenue(Long sellerId, BigDecimal refundAmount);
}
