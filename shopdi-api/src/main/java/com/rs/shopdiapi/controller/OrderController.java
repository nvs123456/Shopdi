package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.CreateOrderRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.PageConstants;
import com.rs.shopdiapi.service.OrderService;
import com.rs.shopdiapi.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OrderController {
    OrderService orderService;
    UserService userService;

    @PostMapping("/checkout")
    public ApiResponse<?> checkout(@RequestBody @Valid CreateOrderRequest request) {
        User user = userService.getCurrentUser();
        return ApiResponse.builder()
                .result(orderService.createOrder(user.getId(), request))
                .build();
    }

    @PutMapping("/cancel/{orderId}")
    public ApiResponse<?> cancelOrder(@PathVariable Long orderId) {
        return ApiResponse.builder()
                .result(orderService. cancelOrder(orderId))
                .build();
    }

    @GetMapping("/history")
    public ApiResponse<?> getOrdersHistory(@RequestParam(defaultValue = PageConstants.PAGE_NO, required = false) int pageNo,
                                           @Min(10) @RequestParam(defaultValue = PageConstants.PAGE_SIZE, required = false) int pageSize) {
        User user = userService.getCurrentUser();
        return ApiResponse.builder()
                .result(orderService.orderHistory(user.getId(), pageNo, pageSize))
                .build();
    }

    @GetMapping("{orderId}/details")
    public ApiResponse<?> getOrderDetails(@PathVariable Long orderId) {
        return ApiResponse.builder()
                .result(orderService.findOrderById(orderId))
                .build();
    }
}
