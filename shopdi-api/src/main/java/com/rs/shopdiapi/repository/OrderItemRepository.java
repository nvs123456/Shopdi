package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long>, JpaSpecificationExecutor<OrderItem> {
    @Query("SELECT oi FROM OrderItem oi WHERE oi.seller.id = :sellerId AND oi.order.id = :orderId")
    List<OrderItem> findOrderItemsBySeller(@Param("sellerId") Long sellerId, @Param("orderId") Long orderId);

    @Query("SELECT SUM(oi.price * oi.quantity) " +
            "FROM OrderItem oi " +
            "JOIN oi.order o " +
            "WHERE oi.seller.id = :sellerId " +
            "AND o.orderStatus = 'DELIVERED'")
    BigDecimal calculateRevenueBySeller(@Param("sellerId") Long sellerId);
}
