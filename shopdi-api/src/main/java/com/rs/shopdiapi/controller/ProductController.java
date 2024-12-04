package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.service.ProductService;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/products")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ProductController {
    ProductService productService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping
    public ApiResponse<?> getAllProducts(@RequestParam(defaultValue = "0", required = false) int pageNo,
                                         @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize,
                                         @RequestParam(defaultValue = "soldQuantity", required = false) String sortBy,
                                         @RequestParam(defaultValue = "desc", required = false) String sortOrder) {
        return ApiResponse.builder()
                .result(productService.getAllProducts(pageNo, pageSize, sortBy, sortOrder))
                .build();
    }


    @GetMapping("/{productId}")
    public ApiResponse<?> getProductById(@PathVariable Long productId) {
        return ApiResponse.builder()
                .result(productService.findProductById(productId))
                .build();
    }

    @GetMapping("/search")
    public ApiResponse<?> searchProduct(@RequestParam String query,
                                        @RequestParam(defaultValue = "0", required = false) int pageNo,
                                        @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize) {
        return ApiResponse.builder()
                .result(productService.searchProduct(query, pageNo, pageSize))
                .build();
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<?> getProductsByCategoryId(@PathVariable Long categoryId,
                                                  @RequestParam(defaultValue = "0", required = false) int pageNo,
                                                  @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize) {
        return ApiResponse.builder()
                .result(productService.findProductByCategory(categoryId, pageNo, pageSize))
                .build();
    }

    @GetMapping("/suggestions")
    public ApiResponse<?> getProductSuggestions(@RequestParam String query) {
        return ApiResponse.builder()
                .result(productService.getProductSuggestions(query))
                .build();
    }

    @GetMapping("/seller/{sellerId}")
    public ApiResponse<?> getProductsBySeller(@PathVariable Long sellerId,
                                              @RequestParam(defaultValue = "0", required = false) int pageNo,
                                              @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize) {
        return ApiResponse.builder()
                .result(productService.getSellerProducts(sellerId, pageNo, pageSize))
                .build();
    }
}

