package com.rs.shopdiapi.domain.enums;

import lombok.Getter;

@Getter
public enum OrderStatusEnum {
    PENDING("PENDING"),
    PROCESSING("PROCESSING"),
    DELIVERED("DELIVERED"),
    CANCELLED("CANCELLED");

    OrderStatusEnum(String name) {
        this.name = name;
    }

    private final String name;
}
