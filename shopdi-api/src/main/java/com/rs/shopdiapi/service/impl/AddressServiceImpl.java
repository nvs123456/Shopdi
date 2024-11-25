package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.AddressRequest;
import com.rs.shopdiapi.domain.dto.response.AddressResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.User;
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
    AddressRepository addressRepository;

    @Override
    public AddressResponse addAddress(Long userId, AddressRequest addressRequest) {
        return userRepository.findById(userId)
                .map(user -> {
                    Address address = convertToAddressEntity(addressRequest);
                    address.setUser(user);

                    user.getAddresses().add(address);

                    userRepository.save(user);
                    return AddressResponse.builder()
                            .addressId(address.getId())
                            .firstName(address.getFirstName())
                            .lastName(address.getLastName())
                            .address(address.getAddress() + ", " + address.getCity() + ", " + address.getState() + ", " + address.getCountry())
                            .email(address.getEmail())
                            .phone(address.getPhoneNumber())
                            .build();
                })
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    @Override
    public List<AddressResponse> getUserAddress(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return addressRepository.findByUserId(user.getId())
                .stream()
                .map(address -> AddressResponse.builder()
                        .addressId(address.getId())
                        .firstName(address.getFirstName())
                        .lastName(address.getLastName())
                        .address(address.getAddress() + ", " + address.getCity() + ", " + address.getState() + ", " + address.getCountry())
                        .email(address.getEmail())
                        .phone(address.getPhoneNumber())
                        .build())
                .toList();
    }

    private Address convertToAddressEntity(AddressRequest request) {
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
                .build();
    }
}
