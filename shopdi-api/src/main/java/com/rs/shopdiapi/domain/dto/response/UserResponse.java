package com.rs.shopdiapi.domain.dto.response;

import com.rs.shopdiapi.domain.enums.UserStatusEnum;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Long userId;
    String username;
    String firstName;
    String lastName;
    String profileImage;
    String email;
    Double balance;
    Set<RoleResponse> roles;
    UserStatusEnum status;
}
