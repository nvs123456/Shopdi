package com.rs.shopdiapi.domain.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SimpleSellerResponse {
    Long id;
    String shopName;
    String profileImage;
    String status;
    int totalProducts;
    BigDecimal totalRevenue;
}
