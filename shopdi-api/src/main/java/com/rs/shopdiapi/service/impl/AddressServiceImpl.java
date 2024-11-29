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
import jakarta.transaction.Transactional;
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

    @Transactional
    @Override
    public AddressResponse addAddress(Long userId, AddressRequest addressRequest) {
        return userRepository.findById(userId)
                .map(user -> {
                    Address address = convertToAddressEntity(addressRequest);
                    address.setUser(user);

                    if (addressRequest.isDefault() || user.getAddresses().isEmpty()) {
                        user.getAddresses().forEach(existingAddress -> existingAddress.setDefault(false));
                    }

                    Address savedAddress = addressRepository.save(address);

                    return toAddressResponse(savedAddress);
                })
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    @Override
    public List<AddressResponse> getUserAddress(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return addressRepository.findByUserId(user.getId())
                .stream()
                .map(this::toAddressResponse)
                .toList();
    }

    @Transactional
    @Override
    public AddressResponse setDefaultAddress(Long userId, Long addressId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Address defaultAddress = addressRepository.findById(addressId)
                .filter(address -> address.getUser().getId().equals(userId))
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));

        user.getAddresses().forEach(address -> address.setDefault(false));

        defaultAddress.setDefault(true);

        userRepository.save(user);

        return toAddressResponse(defaultAddress);
    }

    @Transactional
    @Override
    public AddressResponse updateAddress(Long userId, Long addressId, AddressRequest addressRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Address address = addressRepository.findById(addressId)
                .filter(a -> a.getUser().getId().equals(userId))
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));

        address.setFirstName(addressRequest.getFirstName());
        address.setLastName(addressRequest.getLastName());
        address.setCompanyName(addressRequest.getCompanyName());
        address.setAddress(addressRequest.getAddress());
        address.setCity(addressRequest.getCity());
        address.setState(addressRequest.getState());
        address.setCountry(addressRequest.getCountry());
        address.setZipCode(addressRequest.getZipCode());
        address.setEmail(addressRequest.getEmail());
        address.setPhoneNumber(addressRequest.getPhoneNumber());

        if (addressRequest.isDefault()) {
            user.getAddresses().forEach(existingAddress -> existingAddress.setDefault(false));
            address.setDefault(true);
        }

        Address updatedAddress = addressRepository.save(address);

        return toAddressResponse(updatedAddress);
    }

    @Override
    @Transactional
    public String deleteAddress(Long userId, Long addressId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Address address = addressRepository.findById(addressId)
                .filter(a -> a.getUser().getId().equals(userId))
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));

        addressRepository.delete(address);
        return "Address deleted successfully";
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
                .isDefault(request.isDefault())
                .build();
    }

    private AddressResponse toAddressResponse(Address address) {
        return AddressResponse.builder()
                .addressId(address.getId())
                .firstName(address.getFirstName())
                .lastName(address.getLastName())
                .address(address.getAddress())
                .city(address.getCity())
                .state(address.getState())
                .country(address.getCountry())
                .email(address.getEmail())
                .phoneNumber(address.getPhoneNumber())
                .isDefault(address.isDefault())
                .build();

    }
}
