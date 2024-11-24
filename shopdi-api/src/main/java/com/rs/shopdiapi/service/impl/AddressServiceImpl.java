package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.AddressRequest;
import com.rs.shopdiapi.domain.dto.response.UserResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.enums.AddressEnum;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.AddressRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.AddressService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AddressServiceImpl implements AddressService {
    UserRepository userRepository;

    @Override
    public Address addAddress(Long userId, AddressRequest addressRequest, boolean isBilling) {
        return userRepository.findById(userId)
                .map(user -> {
                    Address address = convertToAddressEntity(addressRequest, isBilling);
                    address.setUser(user);

                    user.getAddresses().add(address);

                    userRepository.save(user);
                    return address;
                })
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    private Address convertToAddressEntity(AddressRequest request, boolean isBilling) {
        return Address.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .companyName(request.getCompanyName())
                .address(request.getAddress())
                .country(request.getCountry())
                .state(request.getState())
                .city(request.getCity())
                .zipCode(request.getZipCode())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .addressType(isBilling ? AddressEnum.BILLING : AddressEnum.SHIPPING)
                .build();
    }
}
