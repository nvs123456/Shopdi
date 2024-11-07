package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.CartItemRequest;
import com.rs.shopdiapi.domain.entity.Cart;
import com.rs.shopdiapi.domain.entity.CartItem;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.CartItemRepository;
import com.rs.shopdiapi.repository.CartRepository;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.service.CartItemService;
import com.rs.shopdiapi.service.CartService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CartItemServiceImpl implements CartItemService {
    CartRepository cartRepository;
    CartService cartService;
    CartItemRepository cartItemRepository;
    ProductRepository productRepository;

    @Transactional
    @Override
    public CartItem addOrUpdateCartItem(Long userId, CartItemRequest request) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        CartItem existingCartItem = cartItemRepository.isCartItemExist(cart, product, request.getVariant());

        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + request.getQuantity());

            BigDecimal updatedPrice = BigDecimal.valueOf(product.getPrice() * existingCartItem.getQuantity());
            existingCartItem.setPrice(updatedPrice);

            BigDecimal updatedDiscountedPrice = updatedPrice
                    .multiply(BigDecimal.valueOf(100).subtract(existingCartItem.getDiscountPercent()))
                    .divide(BigDecimal.valueOf(100));
            existingCartItem.setDiscountedPrice(updatedDiscountedPrice);

            cartService.updateCartSummary(cart.getId());
            return cartItemRepository.save(existingCartItem);
        } else {
            BigDecimal price = request.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));
            BigDecimal discountedPrice = price
                    .multiply(BigDecimal.valueOf(100).subtract(request.getDiscountPercent()))
                    .divide(BigDecimal.valueOf(100));

            CartItem cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .variant(request.getVariant())
                    .quantity(request.getQuantity())
                    .price(price)
                    .discountPercent(request.getDiscountPercent())
                    .discountedPrice(discountedPrice)
                    .build();

            cartService.updateCartSummary(cart.getId());
            return cartItemRepository.save(cartItem);
        }
    }

    @Override
    @Transactional
    public String deleteCartItem(Long userId, Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        Cart cart = cartRepository.findByUserId(userId);

        if (!cartItem.getCart().equals(cart)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        cartItemRepository.deleteById(cartItem.getId());
        cartService.updateCartSummary(cart.getId());
        return "Cart item deleted successfully";
    }

    @Override
    @Transactional
    public String updateCartItemQuantity(Long userId, Long cartItemId, Integer quantity) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        cartItem.setQuantity(quantity);

        BigDecimal updatedPrice = BigDecimal.valueOf(cartItem.getProduct().getPrice() * quantity);
        cartItem.setPrice(updatedPrice);

        BigDecimal updatedDiscountedPrice = updatedPrice
                .multiply(BigDecimal.valueOf(100).subtract(cartItem.getDiscountPercent()))
                .divide(BigDecimal.valueOf(100));
        cartItem.setDiscountedPrice(updatedDiscountedPrice);

        cartItemRepository.save(cartItem);
        cartService.updateCartSummary(cart.getId());

        return "Cart item updated successfully";
    }
}