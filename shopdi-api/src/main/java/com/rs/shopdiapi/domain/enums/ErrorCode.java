package com.rs.shopdiapi.domain.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_ERROR("UNCATEGORIZED_ERROR", "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),

    INVALID_KEY("INVALID_KEY", "Uncategorized error", HttpStatus.BAD_REQUEST),

    USER_EXISTED("USER_EXISTED", "User existed", HttpStatus.BAD_REQUEST),

    EMAIL_EXISTED("EMAIL_EXISTED", "Email existed", HttpStatus.BAD_REQUEST),

    USERNAME_INVALID("USERNAME_INVALID", "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),

    PASSWORD_INVALID("PASSWORD_INVALID", "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),

    EMAIL_INVALID("EMAIL_INVALID", "Email is invalid", HttpStatus.BAD_REQUEST),

    USER_NOT_EXISTED("USER_NOT_EXISTED", "User not existed", HttpStatus.NOT_FOUND),

    UNAUTHENTICATED("UNAUTHENTICATED", "Unauthenticated", HttpStatus.UNAUTHORIZED),

    UNAUTHORIZED("UNAUTHORIZED", "You do not have permission", HttpStatus.FORBIDDEN),

    INVALID_DOB("INVALID_DOB", "Your age must be at least {min}", HttpStatus.BAD_REQUEST),

    PASSWORD_NOT_MATCH("PASSWORD_NOT_MATCH", "Password not match", HttpStatus.BAD_REQUEST),

    PRODUCT_NOT_FOUND("PRODUCT_NOT_FOUND", "Product not found", HttpStatus.NOT_FOUND),

    CATEGORY_NOT_FOUND("CATEGORY_NOT_FOUND", "Category not found", HttpStatus.NOT_FOUND),

    CATEGORY_ALREADY_EXISTS("CATEGORY_ALREADY_EXISTS", "Category already exists", HttpStatus.BAD_REQUEST),

    SELLER_NOT_EXIST("SELLER_NOT_EXIST", "Seller not exist", HttpStatus.NOT_FOUND),

    SELLER_ALREADY_REGISTERED("SELLER_ALREADY_REGISTERED", "Seller already registered", HttpStatus.BAD_REQUEST),

    ORDER_NOT_FOUND("ORDER_NOT_FOUND", "Order not found", HttpStatus.NOT_FOUND),

    TAG_ALREADY_EXISTS("TAG_ALREADY_EXISTS", "Tag already exists", HttpStatus.BAD_REQUEST),

    TAG_NOT_FOUND("TAG_NOT_FOUND", "Tag not found", HttpStatus.NOT_FOUND),

    INVALID_ORDER_STATUS("INVALID_ORDER_STATUS", "Invalid order status", HttpStatus.BAD_REQUEST),

    CART_NOT_FOUND("CART_NOT_FOUND", "Cart not found", HttpStatus.NOT_FOUND),

    CART_EMPTY("CART_EMPTY", "Cart is empty", HttpStatus.BAD_REQUEST),

    ORDER_CANNOT_BE_CANCELLED("ORDER_CANNOT_BE_CANCELLED", "Order cannot be cancelled", HttpStatus.BAD_REQUEST),

    NO_ITEMS_SELECTED("NO_ITEMS_SELECTED", "No items selected", HttpStatus.BAD_REQUEST),

    ADDRESS_NOT_FOUND("ADDRESS_NOT_FOUND", "Address not found", HttpStatus.NOT_FOUND),

    CART_ITEM_NOT_FOUND("CART_ITEM_NOT_FOUND", "Cart item not found", HttpStatus.NOT_FOUND),

    REVIEW_NOT_FOUND("REVIEW_NOT_FOUND", "Review not found", HttpStatus.NOT_FOUND),

    REVIEW_ALREADY_EXISTS("REVIEW_ALREADY_EXISTS", "Review already exists", HttpStatus.BAD_REQUEST),

    FILE_UPLOAD_FAILED("FILE_UPLOAD_FAILED", "File upload failed", HttpStatus.INTERNAL_SERVER_ERROR),

    IMAGE_NOT_FOUND("IMAGE_NOT_FOUND", "Image not found", HttpStatus.NOT_FOUND),

    VARIANT_NOT_FOUND("VARIANT_NOT_FOUND", "Variant not found", HttpStatus.NOT_FOUND),

    PRODUCT_OUT_OF_STOCK("PRODUCT_OUT_OF_STOCK", "Product out of stock", HttpStatus.BAD_REQUEST),

    NOT_ENOUGH_STOCK("NOT_ENOUGH_STOCK", "Not enough stock", HttpStatus.BAD_REQUEST),

    NOT_PURCHASED_PRODUCT("NOT_PURCHASED_PRODUCT", "You have not purchased this product", HttpStatus.BAD_REQUEST),

    INVALID_SIGNATURE("INVALID_SIGNATURE", "Invalid signature", HttpStatus.BAD_REQUEST),

    PAYMENT_FAILED("PAYMENT_FAILED", "Payment failed", HttpStatus.BAD_REQUEST),

    PAYMENT_NOT_FOUND("PAYMENT_NOT_FOUND", "Payment not found", HttpStatus.NOT_FOUND),
    ;

    ErrorCode(String code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final String code;
    private final String message;
    private final HttpStatusCode statusCode;
}
