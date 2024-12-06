package com.rs.shopdiapi.domain.dto.response;

import com.rs.shopdiapi.domain.enums.ProductStatusEnum;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    Long productId;
    String productImage;
    String productName;
    BigDecimal price;
    String category;
    String status;
    Long categoryId;
    int stock;
    int soldQuantity;
    Date publishedOn ;
    double rating;
    int reviewCount;
}
