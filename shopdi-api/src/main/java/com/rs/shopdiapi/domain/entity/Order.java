package com.rs.shopdiapi.domain.entity;

import com.rs.shopdiapi.domain.enums.OrderStatusEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "orders")
public class Order extends BaseEntity<Long> {

    @Column(name = "order_id")
    String orderId;
    @ManyToOne
    User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    List<OrderItem> orderItems = new ArrayList<>();
    Integer totalItem;

    @OneToOne
    Address shippingAddress;
//    @Embedded
//    PaymentDetails paymentDetails = new PaymentDetails();
    Double totalPrice;
    Integer totalDiscountedPrice;
    Integer discount;
    OrderStatusEnum orderStatus;
    LocalDateTime deliveryDate;

}
