package com.rs.shopdiapi.enums;

import lombok.Getter;

@Getter
public enum RoleEnum {
    ADMIN("ADMIN"),
    USER("USER");

    RoleEnum(String name) {
        this.name = name;
    }

    private final String name;
}
