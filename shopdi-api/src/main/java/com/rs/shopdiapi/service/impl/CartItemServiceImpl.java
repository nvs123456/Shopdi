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
import java.math.RoundingMode;
import java.util.Optional;

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
    public String addOrUpdateCartItem(Long userId, CartItemRequest request) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        boolean isValidVariant = product.getVariants().stream().anyMatch(v -> v.getVariantDetail() == null)
                || product.getVariants().stream()
                        .anyMatch(v -> v.getVariantDetail().equals(request.getVariant()));
        if (!isValidVariant) {
            throw new AppException(ErrorCode.VARIANT_NOT_FOUND);
        }

        Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndProductAndVariant(cart, product,
                request.getVariant());

        return existingCartItem.map(cartItem -> updateExistingCartItem(cartItem, request, product, cart))
                .orElseGet(() -> createNewCartItem(cart, product, request));

    }

    private String updateExistingCartItem(CartItem existingCartItem, CartItemRequest request, Product product,
            Cart cart) {
        existingCartItem.setQuantity(existingCartItem.getQuantity() + request.getQuantity());

        BigDecimal updatedPrice = product.getPrice().multiply(BigDecimal.valueOf(existingCartItem.getQuantity()));
        existingCartItem.setPrice(updatedPrice);

        cartItemRepository.save(existingCartItem);
        cartService.updateCartSummary(cart.getId());
        return "Cart item updated successfully";
    }

    private String createNewCartItem(Cart cart, Product product, CartItemRequest request) {
        BigDecimal price = product.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));

        CartItem newCartItem = CartItem.builder()
                .cart(cart)
                .product(product)
                .variant(request.getVariant())
                .quantity(request.getQuantity())
                .price(price)
                .build();

        cartItemRepository.save(newCartItem);
        cartService.updateCartSummary(cart.getId());
        return "Cart item added successfully";
    }

    @Transactional
    @Override
    public String deleteCartItem(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findByUserId(userId);
        CartItem cartItem = cart.getCartItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        cart.getCartItems().remove(cartItem);
        cartService.updateCartSummary(cart.getId());
        return "Cart item deleted successfully";
    }

    @Transactional
    @Override
    public String updateCartItemQuantity(Long userId, Long cartItemId, Integer quantity) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        BigDecimal updatedPrice = cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(quantity));
        cartItem.setPrice(updatedPrice);

        cartItemRepository.save(cartItem);
        cartService.updateCartSummary(cart.getId());

        return "Cart item updated successfully";
    }

    @Transactional
    @Override
    public String clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }

        cart.getCartItems().clear();

        cart.setTotalItems(0);
        cart.setTotalPrice(BigDecimal.ZERO);

        cartRepository.save(cart);
        return "Cart cleared successfully.";
    }
}