package com.rs.shopdiapi.domain.dto.response;

import com.rs.shopdiapi.domain.enums.OrderStatusEnum;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    Long orderId;
    OrderStatusEnum status;
    LocalDateTime date;
    Double total;
    int productCount;
    List<ProductResponse> products;
    List<CartItemResponse> orderItems;
    AddressResponse billingAddress;
    AddressResponse shippingAddress;
//    List<OrderActivityResponse> orderActivities;
}
