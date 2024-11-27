package com.rs.shopdiapi.domain.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressResponse {
    Long addressId;
    String firstName;
    String lastName;
    String address;
    String phoneNumber;
    String email;
    boolean isDefault;
}
