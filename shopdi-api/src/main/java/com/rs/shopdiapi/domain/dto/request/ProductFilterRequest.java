package com.rs.shopdiapi.domain.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductFilterRequest {
    private String productName;
    private Set<String> categories;
    private Set<String> brands;
    private Double minPrice;
    private Double maxPrice;
    private Double minDiscount;
    private Double maxDiscount;
    private Integer minRating;
    private Integer maxRating;
}
