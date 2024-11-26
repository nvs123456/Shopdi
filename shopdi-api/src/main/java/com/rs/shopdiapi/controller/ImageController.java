package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.service.ImageService;
import com.rs.shopdiapi.service.UserService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/images")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ImageController {
    ImageService imageService;
    UserService userService;

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping(value = "/upload-product-images/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> uploadImages(@PathVariable("productId") Long productId,
                                       @RequestParam("images") List<MultipartFile> images) {
        return ApiResponse.builder()
                .result(imageService.uploadProductImage(images, productId))
                .build();
    }

    @PostMapping(value = "/upload-profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> uploadProfileImage(@RequestParam("image") MultipartFile image) {
        User user = userService.getCurrentUser();
        return ApiResponse.builder()
                .result(imageService.uploadProfileImage(user.getId(), image))
                .build();
    }
}
