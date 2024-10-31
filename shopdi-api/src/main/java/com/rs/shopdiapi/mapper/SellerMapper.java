package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.request.CreateUserRequest;
import com.rs.shopdiapi.domain.dto.request.RegisterSellerRequest;
import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SellerMapper {
    Seller toSeller(RegisterSellerRequest request);
}
