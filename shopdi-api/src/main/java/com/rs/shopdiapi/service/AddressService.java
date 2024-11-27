package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.AddressRequest;
import com.rs.shopdiapi.domain.dto.response.AddressResponse;
import com.rs.shopdiapi.domain.entity.Address;

import java.util.List;

public interface AddressService {
    AddressResponse addAddress(Long userId, AddressRequest addressRequest);

    List<AddressResponse> getUserAddress(Long userId);

    AddressResponse setDefaultAddress(Long userId, Long addressId);

    AddressResponse updateAddress(Long userId, Long addressId, AddressRequest addressRequest);

    String deleteAddress(Long userId, Long addressId);
}
