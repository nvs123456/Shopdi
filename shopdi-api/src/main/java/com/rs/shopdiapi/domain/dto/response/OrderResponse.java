package com.rs.shopdiapi.domain.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    Long orderId;
    BigDecimal totalPrice;
    String orderStatus;
    Date deliveryDate;

    List<OrderItemResponse> orderItems;

    AddressResponse shippingAddress;

    String orderNotes;
}
