package com.rs.shopdiapi.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import jakarta.persistence.*;
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
public class Variant extends BaseEntity<Long> {
    String variantDetail;

    @Column(nullable = false, columnDefinition = "int default 0")
    Integer quantity = 0;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    Product product;

    public void decreaseQuantity(Integer amount) {
        if (this.quantity < amount) {
            throw new AppException(ErrorCode.PRODUCT_OUT_OF_STOCK);
        }
        this.quantity -= amount;
    }
}
