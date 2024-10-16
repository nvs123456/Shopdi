package com.rs.shopdiapi.domain.dto.request;

import com.rs.shopdiapi.domain.entity.Category;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateProductRequest {

    // General Information
    String productName;
    String description;

    // Media
    List<String> imageUrl;

    // Pricing
    Double basePrice;
    String discountType;
    Double discountPercentage;

    Integer quantity;

    // Variation
    String variationType;
    String variation;

    // Category and Tags
    Category category;
    List<String> tags;

    // Status
    String productStatus;
}
