package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.CartItemRequest;
import com.rs.shopdiapi.domain.dto.response.CartItemResponse;
import com.rs.shopdiapi.domain.entity.CartItem;

import java.util.List;

public interface CartItemService {
    CartItem addOrUpdateCartItem(Long userId, CartItemRequest request);

    String deleteCartItem(Long userId, Long cartItemId);

    String updateCartItemQuantity(Long userId, Long cartItemId, Integer quantity);

}
