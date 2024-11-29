package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.response.PaymentResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface PaymentService {
    PaymentResponse createVnPayPayment(HttpServletRequest request);
}
