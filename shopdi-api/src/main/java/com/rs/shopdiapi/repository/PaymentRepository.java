package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
        @Query("SELECT p FROM Payment p WHERE p.transactionId = :transactionId")
        Optional<Payment> findByTransactionId(@Param("transactionId") String transactionId);

        @Query("SELECT p FROM Payment p WHERE p.order.id = :orderId")
        Optional<Payment> findByOrderId(@Param("orderId") Long orderId);
}
