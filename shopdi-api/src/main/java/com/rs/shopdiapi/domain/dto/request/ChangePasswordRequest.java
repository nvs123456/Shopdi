package com.rs.shopdiapi.domain.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangePasswordRequest {
    String token;

    @Size(min = 6, message = "PASSWORD_INVALID")
    String currentPassword;

    @Size(min = 6, message = "PASSWORD_INVALID")
    String newPassword;

    @Size(min = 6, message = "PASSWORD_INVALID")
    String confirmPassword;
}
