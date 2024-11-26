package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.AddressRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.service.AddressService;
import com.rs.shopdiapi.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/address")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AddressController {
    UserService userService;
    AddressService addressService;

    @PostMapping("/shipping")
    public ApiResponse<?> addShippingAddress(@RequestBody @Valid AddressRequest shippingAddressRequest) {
        Long userId = userService.getCurrentUser().getId();

        return ApiResponse.builder()
                .result(addressService.addAddress(userId, shippingAddressRequest))
                .build();
    }

    @GetMapping("/shipping")
    public ApiResponse<?> getShippingAddress() {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(addressService.getUserAddress(userId))
                .build();
    }

    @PutMapping("/{addressId}/default")
    public ApiResponse<?> setDefaultAddress(@PathVariable Long addressId) {
        Long userId = userService.getCurrentUser().getId();
        return ApiResponse.builder()
                .result(addressService.setDefaultAddress(userId, addressId))
                .build();
    }
}
