package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.response.CartResponse;
import com.rs.shopdiapi.domain.entity.Cart;

import java.math.BigDecimal;

public interface CartService {
    Cart createCart(Long userId);

    CartResponse getUserCart(Long userId);

//    BigDecimal calculateTotalPrice(Long cartId);

    Cart updateCartSummary(Long cartId);
}
