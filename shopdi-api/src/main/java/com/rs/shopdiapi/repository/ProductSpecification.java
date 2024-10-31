package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;

public class ProductSpecification {
    public static Specification<Product> hasProductName(String productName) {
        return (root, query, criteriaBuilder) ->
                productName == null ? null : criteriaBuilder.like(root.get("productName"), "%" + productName + "%");
    }

    public static Specification<Product> hasCategory(Set<String> categoryNames) {
        return (root, query, criteriaBuilder) -> {
            if (categoryNames == null || categoryNames.isEmpty()) return null;
            return root.join("categories").get("name").in(categoryNames);
        };
    }

    public static Specification<Product> hasBrand(Set<String> brands) {
        return (root, query, criteriaBuilder) ->
                brands == null || brands.isEmpty() ? null : root.get("brand").in(brands);
    }

    public static Specification<Product> hasPriceBetween(Double minPrice, Double maxPrice) {
        return (root, query, criteriaBuilder) -> {
            if (minPrice != null && maxPrice != null) {
                return criteriaBuilder.between(root.get("price"), minPrice, maxPrice);
            } else if (minPrice != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice);
            } else if (maxPrice != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice);
            } else {
                return null;
            }
        };
    }

    public static Specification<Product> hasDiscountBetween(Double minDiscount, Double maxDiscount) {
        return (root, query, criteriaBuilder) -> {
            if (minDiscount != null && maxDiscount != null) {
                return criteriaBuilder.between(root.get("discountPercent"), minDiscount, maxDiscount);
            } else if (minDiscount != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("discountPercent"), minDiscount);
            } else if (maxDiscount != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("discountPercent"), maxDiscount);
            } else {
                return null;
            }
        };
    }

    public static Specification<Product> hasRatingBetween(Integer minRating, Integer maxRating) {
        return (root, query, criteriaBuilder) -> {
            if (minRating != null && maxRating != null) {
                return criteriaBuilder.between(root.get("numRatings"), minRating, maxRating);
            } else if (minRating != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("numRatings"), minRating);
            } else if (maxRating != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("numRatings"), maxRating);
            } else {
                return null;
            }
        };
    }
}
