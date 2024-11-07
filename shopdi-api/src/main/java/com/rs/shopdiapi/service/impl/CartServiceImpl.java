package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.response.CartResponse;
import com.rs.shopdiapi.domain.entity.Cart;
import com.rs.shopdiapi.domain.entity.CartItem;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.CartMapper;
import com.rs.shopdiapi.repository.CartItemRepository;
import com.rs.shopdiapi.repository.CartRepository;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.repository.UserRepository;
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
public class CartServiceImpl implements CartService {
    CartRepository cartRepository;
    CartMapper cartMapper;
    UserRepository userRepository;
    CartItemRepository cartItemRepository;

    @Transactional
    @Override
    public Cart createCart(Long userId) {
        Cart cart = new Cart();
        cart.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
        return cartRepository.save(cart);
    }

    @Override
    public CartResponse findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        return cartMapper.toCartResponse(cart);
    }

    @Override
    public BigDecimal calculateTotalPrice(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        return cart.getCartItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public BigDecimal calculateTotalDiscountedPrice(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        return cart.getCartItems().stream()
                .map(item -> item.getDiscountedPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Transactional
    @Override
    public Cart updateCartSummary(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        BigDecimal totalPrice = calculateTotalPrice(cartId);
        BigDecimal totalDiscountedPrice = calculateTotalDiscountedPrice(cartId);

        cart.setTotalPrice(totalPrice);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItems(cart.getCartItems().stream().mapToInt(CartItem::getQuantity).sum());

        return cartRepository.save(cart);
    }

    @Transactional
    @Override
    public void applyDiscount(Long cartId, BigDecimal discountPercent) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        cart.getCartItems().forEach(item -> {
            BigDecimal discountedPrice = item.getPrice()
                    .multiply(BigDecimal.valueOf(100).subtract(discountPercent))
                    .divide(BigDecimal.valueOf(100));
            item.setDiscountPercent(discountPercent);
            item.setDiscountedPrice(discountedPrice);
            cartItemRepository.save(item);
        });

        updateCartSummary(cartId);
    }

}