package com.rs.shopdiapi.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.ImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ImageServiceImpl implements ImageService {
    Cloudinary cloudinary;
    ProductRepository productRepository;
    UserRepository userRepository;

    private String uploadImage(MultipartFile file) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("resource_type", "auto"));
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
        }
    }

    @Override
    public Resource getImage(String fileName) {
        return null;
    }

    @Override
    public List<String> uploadProductImage(List<MultipartFile> files, Long productId) {
        List<String> imageUrls = files.stream()
                .map(this::uploadImage)
                .collect(Collectors.toList());

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        product.setImageUrls(imageUrls);
        productRepository.save(product);
        return imageUrls;
    }

    @Override
    public void deleteProductImage(String imageUrl) {

    }

    @Override
    public String uploadProfileImage(Long userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        user.setProfileImage(uploadImage(file));
        userRepository.save(user);
        return user.getProfileImage();
    }
}
