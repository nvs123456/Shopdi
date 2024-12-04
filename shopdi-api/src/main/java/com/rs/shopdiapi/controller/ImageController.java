package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.service.ImageService;
import com.rs.shopdiapi.service.SellerService;
import com.rs.shopdiapi.service.UserService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/images")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ImageController {
    ImageService imageService;
    UserService userService;
    SellerService sellerService;

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping(value = "/upload-product-images/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> uploadProductImages(@PathVariable("productId") Long productId,
                                       @RequestParam("images") List<MultipartFile> images) {
        return ApiResponse.builder()
                .result(imageService.uploadProductImage(images, productId))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @PutMapping(value = "/update-product-images/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> updateProductImages(@PathVariable("productId") Long productId,
                                       @RequestParam("images") List<MultipartFile> images) {
        return ApiResponse.builder()
                .result(imageService.updateProductImage(images, productId))
                .build();
    }

    @PostMapping(value = "/upload-profile-buyer-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> uploadProfileBuyerImage(@RequestParam("image") MultipartFile image) {
        User user = userService.getCurrentUser();
        return ApiResponse.builder()
                .result(imageService.uploadProfileImage(user.getId(), image, true))
                .build();
    }

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping(value = "/upload-profile-seller-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> uploadProfileSellerImage(@RequestParam("image") MultipartFile image) {
        Seller seller = sellerService.getCurrentSeller();
        return ApiResponse.builder()
                .result(imageService.uploadProfileImage(seller.getId(), image, false))
                .build();
    }

    @PutMapping(value = "/update-profile-buyer-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> updateProfileBuyerImage(@RequestParam("image") MultipartFile image) {
        User user = userService.getCurrentUser();
        return ApiResponse.builder()
                .result(imageService.updateProfileImage(user.getId(), image, true))
                .build();
    }

    @PutMapping(value = "/update-profile-seller-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> updateProfileSellerImage(@RequestParam("image") MultipartFile image) {
        Seller seller = sellerService.getCurrentSeller();
        return ApiResponse.builder()
                .result(imageService.updateProfileImage(seller.getId(), image, false))
                .build();
    }

    @PostMapping(value = "/upload-cover-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> uploadCoverImage(@RequestParam("image") MultipartFile image) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(imageService.uploadCoverImage(sellerId, image))
                .build();
    }

    @PutMapping(value = "/update-cover-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> updateCoverImage(@RequestParam("image") MultipartFile image) {
        Long sellerId = sellerService.getCurrentSeller().getId();
        return ApiResponse.builder()
                .result(imageService.updateCoverImage(sellerId, image))
                .build();
    }

}
