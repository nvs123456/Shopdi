package com.rs.shopdiapi.domain.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddCartItemRequest {
    Long productId;
    String variant;
    Integer quantity;
    Integer price;
    Integer discountPercent;
    Integer discountedPrice;
}
