package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.CartItemRequest;

import java.util.List;

public interface CartItemService {
    String addOrUpdateCartItem(Long userId, CartItemRequest request);

    String deleteCartItem(Long userId, Long cartItemId);

    String updateCartItemQuantity(Long userId, Long cartItemId, Integer quantity);

    String clearCart(Long userId);
}
