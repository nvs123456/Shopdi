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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/address")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AddressController {
    UserService userService;
    AddressService addressService;

    @PostMapping("/billing")
    public ApiResponse<?> addBillingAddress(@RequestBody @Valid AddressRequest billingAddressRequest) {
        Long userId = userService.getCurrentUser().getId();
        Address billingAddress = addressService.addAddress(userId, billingAddressRequest, true);
        return ApiResponse.builder()
                .result(billingAddress)
                .message("Billing address added successfully")
                .build();
    }

    @PostMapping("/shipping")
    public ApiResponse<?> addShippingAddress(@RequestBody @Valid AddressRequest shippingAddressRequest) {
        Long userId = userService.getCurrentUser().getId();
        Address shippingAddress = addressService.addAddress(userId, shippingAddressRequest, false);
        return ApiResponse.builder()
                .result(shippingAddress)
                .message("Shipping address added successfully")
                .build();
    }
}
