package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.response.CartResponse;
import com.rs.shopdiapi.domain.entity.Cart;

import java.math.BigDecimal;

public interface CartService {
    Cart createCart(Long userId);

    CartResponse findUserCart(Long userId);

    BigDecimal calculateTotalPrice(Long cartId);

    BigDecimal calculateTotalDiscountedPrice(Long cartId);

    Cart updateCartSummary(Long cartId);

    void applyDiscount(Long cartId, BigDecimal discountPercent);
}
