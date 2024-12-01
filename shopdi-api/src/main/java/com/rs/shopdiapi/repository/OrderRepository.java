package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.enums.OrderStatusEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

//    @Query("SELECT o FROM Order o WHERE o.user.email = :email AND o.id = :orderId")
//    Order findOrderByEmailAndOrderId(String email, Long cartId);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.orderStatus ASC, o.createdAt DESC")
    Page<Order> findAllByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT DISTINCT o FROM Order o JOIN o.orderItems oi WHERE oi.seller.id = :sellerId ORDER BY o.orderStatus ASC, o.createdAt DESC")
    Page<Order> findAllBySellerId(@Param("sellerId") Long sellerId,Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.orderStatus <> :excludedStatus")
    Page<Order> findAllExcludingStatus(@Param("excludedStatus") OrderStatusEnum excludedStatus, Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.orderItems oi WHERE oi.product.seller.id = :sellerId")
    Page<Order> findOrdersBySellerId(@Param("sellerId") Long sellerId, Pageable pageable);
}
