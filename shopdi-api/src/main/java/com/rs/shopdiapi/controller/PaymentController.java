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

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    PaymentService paymentService;

    @GetMapping("/vn-pay")
    public ApiResponse<?> pay(HttpServletRequest request, @RequestParam BigDecimal amount, @RequestParam Long orderId)
            throws UnsupportedEncodingException {
        return ApiResponse.builder()
                .result(paymentService.createVnPayPayment(request, amount, orderId))
                .build();
    }

    @GetMapping("/vn-pay-return")
    public ResponseEntity<Resource> payCallbackHandler(HttpServletRequest request) throws IOException {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            paymentService.handleVnPayReturn(request);
            Resource resource = new ClassPathResource("dist/index.html");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_HTML);
            headers.set("Message-Code", "200");
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(resource.contentLength())
                    .body(resource);
        } else {
            // return ApiResponse.builder()
            // .message("Payment failed")
            // .build();
            paymentService.handleVnPayReturn(request);
            Resource resource = new ClassPathResource("dist/index.html");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_HTML);
            headers.set("Message-Code", "400");
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(resource.contentLength())
                    .body(resource);

        }
    }
}
