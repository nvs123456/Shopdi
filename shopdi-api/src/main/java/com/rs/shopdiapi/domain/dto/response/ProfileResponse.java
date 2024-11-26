package com.rs.shopdiapi.domain.dto.response;

import com.rs.shopdiapi.domain.enums.UserStatusEnum;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProfileResponse {
    String username;
    String firstName;
    String lastName;
    String email;
    String mobileNo;
    String profileImage;
    List<AddressResponse> address;
    UserStatusEnum status;
}
