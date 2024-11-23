package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.response.CartItemResponse;
import com.rs.shopdiapi.domain.dto.response.CartResponse;
import com.rs.shopdiapi.domain.dto.response.SellerGroupResponse;
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
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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
    public CartResponse getUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }

        Set<CartItem> cartItems = cart.getCartItems();

        Map<Long, List<CartItem>> groupedBySeller = cartItems.stream()
                .collect(Collectors.groupingBy(cartItem -> cartItem.getProduct().getSeller().getId()));

        List<SellerGroupResponse> sellerGroups = groupedBySeller.entrySet().stream()
                .map(entry -> {
                    Long sellerId = entry.getKey();
                    List<CartItem> sellerCartItems = entry.getValue();

                    List<CartItemResponse> cartItemResponses = sellerCartItems.stream()
                            .map(cartItem -> CartItemResponse.builder()
                                    .cartItemId(cartItem.getId())
                                    .productId(cartItem.getProduct().getId())
                                    .productName(cartItem.getProduct().getProductName())
                                    .productImage(cartItem.getProduct().getImageUrls() != null && !cartItem.getProduct().getImageUrls().isEmpty()
                                            ? cartItem.getProduct().getImageUrls().get(0)
                                            : null)
                                    .variant(cartItem.getVariant())
                                    .quantity(cartItem.getQuantity())
                                    .price(cartItem.getPrice())
                                    .build())
                            .toList();

                    return SellerGroupResponse.builder()
                            .sellerId(sellerId)
                            .sellerName(sellerCartItems.get(0).getProduct().getSeller().getShopName())
                            .cartItems(cartItemResponses)
                            .build();
                }).toList();

        return CartResponse.builder()
                .sellerGroups(sellerGroups)
                .totalItems(cart.getTotalItems())
                .totalPrice(cart.getTotalPrice())
                .build();
    }

    @Override
    public BigDecimal calculateTotalPrice(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        return cart.getCartItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Transactional
    @Override
    public Cart updateCartSummary(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        BigDecimal totalPrice = calculateTotalPrice(cartId);
        int totalItems = cart.getCartItems().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        cart.setTotalPrice(totalPrice);
        cart.setTotalItems(totalItems);

        return cartRepository.save(cart);
    }
}
