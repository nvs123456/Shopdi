package com.rs.shopdiapi.service.impl;


import com.rs.shopdiapi.config.VNPayConfig;
import com.rs.shopdiapi.domain.dto.response.PaymentResponse;
import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.entity.Payment;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.domain.enums.OrderStatusEnum;
import com.rs.shopdiapi.domain.enums.PaymentMethodEnum;
import com.rs.shopdiapi.domain.enums.PaymentStatusEnum;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.OrderRepository;
import com.rs.shopdiapi.repository.PaymentRepository;
import com.rs.shopdiapi.service.PaymentService;
import com.rs.shopdiapi.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class PaymentServiceImpl implements PaymentService {
    VNPayConfig vnPayConfig;
    OrderRepository orderRepository;
    PaymentRepository paymentRepository;

    private String generateTxnRef(Long orderId) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        return "ORD" + orderId + "-" + timestamp;
    }

    private Long extractOrderIdFromTxnRef(String txnRef) {
        try {
            String[] parts = txnRef.split("-");
            String orderIdPart = parts[0].substring(3);
            return Long.parseLong(orderIdPart);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid TxnRef format: " + txnRef);
        }
    }

    @Transactional
    @Override
    public String createVnPayPayment(HttpServletRequest request, BigDecimal amount, Long orderId) throws UnsupportedEncodingException {
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount.multiply(BigDecimal.valueOf(100))));
        vnpParamsMap.put("vnp_TxnRef", generateTxnRef(orderId));
        vnpParamsMap.put("vnp_OrderInfo", "Thanh toán đơn hàng #" + orderId);

        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        return vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
    }

    @Override
    public PaymentResponse handleVnPayReturn(HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String> params = VNPayUtil.getParamsFromRequest(request);

        String vnpSecureHash = params.remove("vnp_SecureHash");

        String hashData = VNPayUtil.getPaymentURL(params, false);

        String calculatedHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);

        if (!calculatedHash.equals(vnpSecureHash)) {
            throw new AppException(ErrorCode.INVALID_SIGNATURE);
        }

        String responseCode = params.get("vnp_ResponseCode");
        if (!"00".equals(responseCode)) {
            throw new AppException(ErrorCode.PAYMENT_FAILED);
        }

        String transactionId = params.get("vnp_TransactionNo");
        String orderId = String.valueOf(extractOrderIdFromTxnRef(params.get("vnp_TxnRef")));
        BigDecimal amount = new BigDecimal(params.get("vnp_Amount")).divide(BigDecimal.valueOf(100));

        Order order = orderRepository.findById(Long.valueOf(orderId))
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        var payment = paymentRepository.findByOrderId(order.getId())
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_FOUND));

        payment.setStatus(PaymentStatusEnum.COMPLETED);
        payment.setTransactionId(transactionId);
        paymentRepository.save(payment);

        order.setOrderStatus(OrderStatusEnum.CONFIRMED);
        orderRepository.save(order);

        return PaymentResponse.builder()
                .orderId(order.getId())
                .transactionId(transactionId)
                .status(payment.getStatus())
                .amount(amount)
                .build();
    }

}
