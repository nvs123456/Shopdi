package com.rs.shopdiapi.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
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
public class CartItem extends BaseEntity<Long> {
    Long userId;

    @JsonIgnore
    @ManyToOne
    Cart cart;

    @ManyToOne
    Product product;

    String size;
    int quantity;
    Integer price;
    Integer discountedPrice;

}
