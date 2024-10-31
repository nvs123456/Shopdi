package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.AddCartItemRequest;
import com.rs.shopdiapi.domain.entity.Cart;
import com.rs.shopdiapi.domain.entity.CartItem;
import com.rs.shopdiapi.domain.entity.User;

public interface CartService {

    Cart createCart(User user);

    String addCartItem(Long userId, AddCartItemRequest req);

    Cart findUserCart(Long userId);

    Cart updateCartItem(Long userId, Long cartItemId, CartItem cartItem);



    Cart deleteCartItem(Long userId, Long cartItemId);


}
