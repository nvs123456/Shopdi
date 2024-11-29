package com.rs.shopdiapi.controller;

import com.cloudinary.Api;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.dto.response.ProductSuggestionResponse;
import com.rs.shopdiapi.domain.enums.PageConstants;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.service.ProductService;
import com.rs.shopdiapi.service.SellerService;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/products")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ProductController {
    ProductService productService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping
    public ApiResponse<?> getAllProducts(@RequestParam(defaultValue = PageConstants.PAGE_NO, required = false) int pageNo,
                                         @Min(10) @RequestParam(defaultValue = PageConstants.PAGE_SIZE, required = false) int pageSize,
                                         @RequestParam(defaultValue = PageConstants.SORT_BY_ID, required = false) String sortBy,
                                         @RequestParam(defaultValue = PageConstants.SORT_DIR, required = false) String sortOrder) {
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
                                        @RequestParam(defaultValue = PageConstants.PAGE_NO, required = false) int pageNo,
                                        @Min(10) @RequestParam(defaultValue = PageConstants.PAGE_SIZE, required = false) int pageSize) {
        return ApiResponse.builder()
                .result(productService.searchProduct(query, pageNo, pageSize))
                .build();
    }

    @GetMapping("/category/{categoryName}")
    public ApiResponse<?> getProductsByCategoryId(@PathVariable String categoryName,
                                                  @RequestParam(defaultValue = PageConstants.PAGE_NO, required = false) int pageNo,
                                                  @Min(10) @RequestParam(defaultValue = PageConstants.PAGE_SIZE, required = false) int pageSize) {
        return ApiResponse.builder()
                .result(productService.findProductByCategory(categoryName, pageNo, pageSize))
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
                                              @RequestParam(defaultValue = PageConstants.PAGE_NO, required = false) int pageNo,
                                              @Min(10) @RequestParam(defaultValue = PageConstants.PAGE_SIZE, required = false) int pageSize) {
        return ApiResponse.builder()
                .result(productService.getSellerProducts(sellerId, pageNo, pageSize))
                .build();
    }
}

