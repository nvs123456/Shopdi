package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Cart;
import com.rs.shopdiapi.domain.entity.CartItem;
import com.rs.shopdiapi.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>, JpaSpecificationExecutor<CartItem> {
    @Query("SELECT ci FROM CartItem ci WHERE ci.cart = :cart AND ci.product = :product AND ci.variant = :variant")
    CartItem isCartItemExist(@Param("cart") Cart cart, @Param("product") Product product, @Param("variant") String variant);

    Optional<CartItem> findByCartAndProductAndVariant(Cart cart, Product product, String variant);

    @Query("SELECT ci FROM CartItem ci WHERE ci.product.id=:productId AND ci.cart.id=:cartId")
    CartItem findCartItemByProductIdAndCartId(Long productId, Long cartId);

    @Query("DELETE FROM CartItem ci WHERE ci.product.id=:productId AND ci.cart.id=:cartId")
    void deleteCartItemByProductIdAndCartId(Long productId, Long cartId);
}
