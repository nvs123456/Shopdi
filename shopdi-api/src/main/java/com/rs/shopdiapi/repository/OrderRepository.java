package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Order;
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

    Page<Order> findAllByUserId(Long userId, Pageable pageable);
}
