package com.rs.shopdiapi.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerResponse {
    private Long sellerId;
    private String shopName;
    private String email;
    private String location;
    private String contactNumber;
    private String about;
    private String coverImage;
    private String profileImage;
    private String username;
}
