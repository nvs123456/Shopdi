package com.rs.shopdiapi.service.impl;


import com.rs.shopdiapi.domain.dto.response.PaymentResponse;
import com.rs.shopdiapi.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class PaymentServiceImpl implements PaymentService {
    @Override
    public PaymentResponse createVnPayPayment(HttpServletRequest request) {
        return null;
    }
}
