package com.rs.shopdiapi.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSellerRequest {
    private String shopName;
    private String email;
    private String location;
    private String contactNumber;
    private String about;
}
