package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.PaymentRequest;
import com.rs.shopdiapi.domain.dto.response.PaymentResponse;
import com.rs.shopdiapi.domain.entity.Order;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Map;

public interface PaymentService {

    String createVnPayPayment(HttpServletRequest request, BigDecimal amount, Long orderId) throws UnsupportedEncodingException;

    PaymentResponse handleVnPayReturn(HttpServletRequest request) throws UnsupportedEncodingException;
}
