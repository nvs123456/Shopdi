package com.rs.shopdiapi.controller;

import com.cloudinary.Api;
import com.rs.shopdiapi.domain.dto.request.PaymentRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.dto.response.PaymentResponse;
import com.rs.shopdiapi.service.PaymentService;
import com.rs.shopdiapi.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    PaymentService paymentService;

    @GetMapping("/vn-pay")
    public ApiResponse<?> pay(HttpServletRequest request, @RequestParam BigDecimal amount, @RequestParam Long orderId) throws UnsupportedEncodingException {
        return ApiResponse.builder()
                .result(paymentService.createVnPayPayment(request, amount, orderId))
                .build();
    }

    @GetMapping("/vn-pay-return")
    public ApiResponse<?> payCallbackHandler(HttpServletRequest request) throws UnsupportedEncodingException {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            return ApiResponse.builder()
                    .result(paymentService.handleVnPayReturn(request))
                    .message("Payment successful")
                    .build();
        } else {
            return ApiResponse.builder()
                    .message("Payment failed")
                    .build();
        }
    }
}
