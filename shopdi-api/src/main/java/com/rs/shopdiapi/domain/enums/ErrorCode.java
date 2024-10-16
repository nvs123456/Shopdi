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
