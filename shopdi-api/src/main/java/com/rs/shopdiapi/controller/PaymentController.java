package com.rs.shopdiapi.controller;

import com.cloudinary.Api;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.dto.response.PaymentResponse;
import com.rs.shopdiapi.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    PaymentService paymentService;

    @GetMapping("/vn-pay")
    public ApiResponse<?> pay(HttpServletRequest request) {
        return ApiResponse.builder()
                .result(paymentService.createVnPayPayment(request))
                .build();
    }

    @GetMapping("/vn-pay-return")
    public ApiResponse<?> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        if(status.equals("00")) {
            return ApiResponse.builder()
                    .result("Payment success")
                    .build();
        } else {
            return ApiResponse.builder()
                    .result("Payment failed")
                    .build();
        }
    }
}
