package com.rs.shopdiapi.service.impl;


import com.rs.shopdiapi.config.VNPayConfig;
import com.rs.shopdiapi.domain.dto.response.PaymentResponse;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.domain.model.PaymentInfo;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.PaymentService;
import com.rs.shopdiapi.service.UserService;
import com.rs.shopdiapi.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class PaymentServiceImpl implements PaymentService {

    VNPayConfig vnPayConfig;
    VNPayUtil vnPayUtil;
    UserService userService;

    @Override
    public PaymentResponse createVnPayPayment(HttpServletRequest request) {
        BigDecimal amount = new BigDecimal(request.getParameter("amount")).multiply(BigDecimal.valueOf(100));
        User user = userService.getCurrentUser();

        PaymentInfo paymentInfo = new PaymentInfo()
                .setReference("ORDER_" + System.currentTimeMillis())
                .setAmount(amount)
                .setDescription("Thanh toán đơn hàng cho user: " + user.getId())
                .setExpiresIn(Duration.ofMinutes(15));

        String paymentUrl = vnPayUtil.getPaymentURL(paymentInfo);

        return PaymentResponse.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl)
                .build();
    }
}
