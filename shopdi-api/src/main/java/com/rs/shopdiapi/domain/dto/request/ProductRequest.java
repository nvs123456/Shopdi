package com.rs.shopdiapi.domain.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequest {
    // General Information
    String productName;
    String description;

    // Media
    List<String> imageUrls;

    // Pricing
    Double price;
    Double discountPercent;

    String Brand;

    // Variant
    List<VariantDetail> variantDetails;

    // Category and Tags
    String categoryName;
    Set<String> tagNames;

    // Status
    String productStatus;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class VariantDetail {
        String variantDetail; // e.g., "Black/Sz42"
        Integer quantity;
    }
}
