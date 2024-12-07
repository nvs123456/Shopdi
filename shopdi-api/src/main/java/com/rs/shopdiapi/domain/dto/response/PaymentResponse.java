package com.rs.shopdiapi.domain.dto.response;

import com.rs.shopdiapi.domain.enums.PaymentStatusEnum;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PaymentResponse {
    private Long orderId;
    private String transactionId;
    private PaymentStatusEnum status;
    private BigDecimal amount;
}
