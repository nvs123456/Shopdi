package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.CartItemRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.dto.response.CartResponse;
import com.rs.shopdiapi.domain.entity.Cart;
import com.rs.shopdiapi.service.CartItemService;
import com.rs.shopdiapi.service.CartService;
import com.rs.shopdiapi.service.UserService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CartController {
    CartService cartService;
    CartItemService cartItemService;
    UserService userService;

    @GetMapping
    public ApiResponse<?> getCart() {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(cartService.findUserCart(userId))
                .build();
    }

    @GetMapping("/{cartId}/total-price")
    public ApiResponse<?> calculateTotalPrice(@PathVariable Long cartId) {
        BigDecimal totalPrice = cartService.calculateTotalPrice(cartId);
        return ApiResponse.builder()
                .result(totalPrice)
                .build();
    }

    @GetMapping("/{cartId}/total-discounted-price")
    public ApiResponse<?> calculateTotalDiscountedPrice(@PathVariable Long cartId) {
        BigDecimal totalDiscountedPrice = cartService.calculateTotalDiscountedPrice(cartId);
        return ApiResponse.builder()
                .result(totalDiscountedPrice)
                .build();
    }

    @PutMapping("/{cartId}/apply-discount")
    public ApiResponse<?> applyDiscount(@PathVariable Long cartId, @RequestParam BigDecimal discountPercent) {
        cartService.applyDiscount(cartId, discountPercent);
        return ApiResponse.builder()
                .result("Discount applied successfully ")
                .build();
    }

    @PostMapping("/add-item")
    public ApiResponse<?> addItemToCart(@RequestBody CartItemRequest request) {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(cartItemService.addOrUpdateCartItem(userId, request))
                .build();
    }

    @PutMapping("/items/{cartItemId}/quantity")
    public ApiResponse<?> updateCartItemQuantity(@PathVariable Long cartItemId, @RequestParam Integer quantity) {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(cartItemService.updateCartItemQuantity(userId, cartItemId, quantity))
                .build();
    }

    @DeleteMapping("/items/{cartItemId}")
    public ApiResponse<?> deleteCartItem(@PathVariable Long cartItemId) {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(cartItemService.deleteCartItem(userId, cartItemId))
                .build();
    }
}
