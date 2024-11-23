package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.AddressRequest;
import com.rs.shopdiapi.domain.entity.Address;

public interface AddressService {
    Address addAddress(Long userId, AddressRequest addressRequest, boolean isBilling);
}
