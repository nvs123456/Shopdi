package com.rs.shopdiapi.domain.entity;

import com.rs.shopdiapi.domain.enums.PaymentMethodEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class PaymentMethod extends BaseEntity<Long> {
    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    PaymentMethodEnum code;

    @Column(nullable = false, columnDefinition = "TINYINT")
    Integer status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
