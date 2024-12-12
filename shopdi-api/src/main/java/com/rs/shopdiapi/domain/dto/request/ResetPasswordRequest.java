package com.rs.shopdiapi.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResetPasswordRequest {
    @NotBlank(message = "secretKey must be not blank")
    String token;

    @NotBlank(message = "password must be not blank")
    String newPassword;

    @NotBlank(message = "confirmPassword must be not blank")
    String confirmPassword;
}
