package com.rs.shopdiapi.domain.dto.response;

import com.rs.shopdiapi.domain.enums.ProductStatusEnum;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    Long productId;
    String productName;
    String description;
    Double price;
    Double discountPercent;
    String brand;
    ProductStatusEnum status;

    // Media
    List<String> imageUrls;

    // Category and Tags
    String categoryName;
    Set<String> tagNames;

    // Seller Information
    Long sellerId;
    String shopName;

    // Variants
    List<VariantResponse> variants;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class VariantResponse {
        String variantDetail;  // ví dụ: "Black/Sz42"
        Integer quantity;
    }

}
