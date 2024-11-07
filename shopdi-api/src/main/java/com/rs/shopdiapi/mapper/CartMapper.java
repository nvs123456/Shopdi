package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.response.CartItemResponse;
import com.rs.shopdiapi.domain.dto.response.CartResponse;
import com.rs.shopdiapi.domain.entity.Cart;
import com.rs.shopdiapi.domain.entity.CartItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartResponse toCartResponse(Cart cart);

    CartItemResponse toCartItemResponse(CartItem cartItem);
}
