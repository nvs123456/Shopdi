package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.ProductRequest;
import com.rs.shopdiapi.domain.dto.request.RegisterSellerRequest;
import com.rs.shopdiapi.domain.dto.request.UpdateSellerRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.dto.response.AuthResponse;
import com.rs.shopdiapi.domain.dto.response.SellerResponse;
import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.OrderStatusEnum;
import com.rs.shopdiapi.service.RevenueService;
import com.rs.shopdiapi.util.JwtUtil;
import com.rs.shopdiapi.service.OrderService;
import com.rs.shopdiapi.service.ProductService;
import com.rs.shopdiapi.service.SellerService;
import com.rs.shopdiapi.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/seller")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class SellerController {
    SellerService sellerService;
    ProductService productService;
    UserService userService;
    OrderService orderService;
    JwtUtil jwtUtil;
    RevenueService revenueService;

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping( "/add-product")
    public ApiResponse<?> addProduct(@Valid @RequestBody ProductRequest request) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(productService.createProduct(request, sellerId))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/update-product/{productId}")
    public ApiResponse<?> updateProduct(@PathVariable Long productId, @RequestBody ProductRequest request) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(productService.updateProduct(request, productId, sellerId))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @DeleteMapping("/delete-product/{productId}")
    public ApiResponse<?> deleteProduct(@PathVariable Long productId) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(productService.deleteProduct(productId, sellerId))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/my-products")
    public ApiResponse<?> getMyProducts(@RequestParam(defaultValue = "0", required = false) int pageNo,
                                        @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize,
                                        @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
                                        @RequestParam(defaultValue = "desc", required = false) String sortOrder) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(productService.getMyProducts(pageNo, pageSize, sortBy, sortOrder, sellerId))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/orders")
    public ApiResponse<?> getOrders(@RequestParam(defaultValue = "0", required = false) int pageNo,
                                   @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize,
                                    @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
                                    @RequestParam(defaultValue = "desc", required = false) String sortOrder) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(orderService.getAllOrdersForSeller(sellerId, pageNo, pageSize, sortBy, sortOrder))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/orders/status")
    public ApiResponse<?> getOrdersByStatus(@RequestParam OrderStatusEnum orderStatus,
                                           @RequestParam(defaultValue = "0", required = false) int pageNo,
                                           @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize,
                                           @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
                                           @RequestParam(defaultValue = "desc", required = false) String sortOrder) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(orderService.getOrdersByStatusForSeller(sellerId, orderStatus, pageNo, pageSize, sortBy, sortOrder))
                .build();
    }


    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/{orderId}/update-status")
    public ApiResponse<?> updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatusEnum orderStatus) {
        Seller seller = sellerService.getCurrentSeller();
        return ApiResponse.builder()
                .result(orderService.updateOrderStatusBySeller(orderId, seller.getId(),orderStatus))
                .build();
    }


    @PostMapping("/register")
    public AuthResponse registerSeller(@RequestBody @Valid RegisterSellerRequest request) {
        User user = userService.getCurrentUser();
        sellerService.sellerRegister(request, user);

        String token = jwtUtil.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .expiryTime(jwtUtil.extractExpiration(token))
                .build();
    }

    @GetMapping("/profile")
    public ApiResponse<?> getSellerProfile() {
        Seller seller = sellerService.getCurrentSeller();
        SellerResponse response = sellerService.getSellerProfile(seller.getId());
        return ApiResponse.builder()
                .result(response)
                .build();
    }


    @PutMapping("/profile")
    public ApiResponse<?> updateSellerProfile(@RequestBody @Valid UpdateSellerRequest request) {
        Seller seller = sellerService.getCurrentSeller();
        SellerResponse response = sellerService.updateSellerProfile(seller.getId(), request);
        return ApiResponse.builder()
                .result(response)
                .message("Profile updated successfully")
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ApiResponse<?> getAllSeller(@RequestParam(defaultValue = "0", required = false) int pageNo,
                                       @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize) {
        return ApiResponse.builder()
                .result(sellerService.getAllSeller(pageNo, pageSize))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/revenue")
    public ApiResponse<?> calculateRevenue() {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(revenueService.calculateRevenue(sellerId))
                .build();
    }

    @GetMapping("/seller/{sellerId}")
    public ApiResponse<?> getSellerProfile(@PathVariable Long sellerId) {
        return ApiResponse.builder()
                .result(sellerService.getSellerProfile(sellerId))
                .build();
    }

}
