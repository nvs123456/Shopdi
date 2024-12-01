package com.rs.shopdiapi.domain.enums;

import lombok.Getter;

@Getter
public enum OrderStatusEnum {
    PENDING,
    CONFIRMED,
    PROCESSING,
    DELIVERING,
    DELIVERED,
    CANCELED
}
