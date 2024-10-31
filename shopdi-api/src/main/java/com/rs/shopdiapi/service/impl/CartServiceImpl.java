package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.AddCartItemRequest;
import com.rs.shopdiapi.domain.entity.Cart;
import com.rs.shopdiapi.domain.entity.CartItem;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
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

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CartServiceImpl implements CartService {
    CartRepository cartRepository;
    ProductRepository productRepository;
    UserRepository userRepository;
    CartItemRepository cartItemRepository;

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Transactional
    @Override
    public String addCartItem(Long userId, AddCartItemRequest req) {
        Cart cart = cartRepository.findByUserId(userId);

        if (cart == null) {
            cart = createCart(userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
        }

        Product product = productRepository.findById(req.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        CartItem existingCartItem = cartItemRepository.isCartItemExist(cart, product, req.getVariant(), userId);

        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + req.getQuantity());
            cartItemRepository.save(existingCartItem);
        } else {
            // If not exists, create a new cart item
            CartItem cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .variant(req.getVariant())
                    .quantity(req.getQuantity())
                    .price(req.getPrice() * req.getQuantity())
                    .discountPercent(req.getDiscountPercent())
                    .discountedPrice(req.getPrice() * req.getQuantity() * ((100 - req.getDiscountPercent()) / 100))
                    .build();

            cartItemRepository.save(cartItem);
        }

        return "Item added to cart successfully";
    }

    @Override
    public Cart findUserCart(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public Cart updateCartItem(Long userId, Long cartItemId, CartItem cartItem) {
        return null;
    }

    @Override
    public Cart deleteCartItem(Long userId, Long cartItemId) {
        return null;
    }
}
