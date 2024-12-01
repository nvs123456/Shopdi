package com.rs.shopdiapi.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rs.shopdiapi.domain.dto.response.SellerResponse;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.repository.SellerRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.ImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
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
    SellerRepository sellerRepository;

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
        try {
            Map<?, ?> resource = cloudinary.api().resource(fileName, ObjectUtils.emptyMap());
            byte[] imageBytes = (byte[]) resource.get("bytes");
            return new ByteArrayResource(imageBytes);
        } catch (Exception e) {
            throw new AppException(ErrorCode.IMAGE_NOT_FOUND);
        }
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
    public List<String> updateProductImage(List<MultipartFile> files, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if (product.getImageUrls() != null && !product.getImageUrls().isEmpty()) {
            product.getImageUrls().forEach(this::deleteProductImage);
        }

        List<String> imageUrls = files.stream()
                .map(this::uploadImage)
                .collect(Collectors.toList());

        product.setImageUrls(imageUrls);
        productRepository.save(product);

        return imageUrls;
    }

    @Override
    public void deleteProductImage(String imageUrl) {
        try {
            String publicId = extractPublicIdFromUrl(imageUrl);
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new RuntimeException("failed to delete image");
        }
    }

    private String extractPublicIdFromUrl(String imageUrl) {
        String[] parts = imageUrl.split("/");
        String fileName = parts[parts.length - 1];
        return fileName.substring(0, fileName.indexOf('.'));
    }

    @Override
    public String uploadProfileImage(Long userId, MultipartFile file, boolean isBuyer) {
        if(isBuyer) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

            user.setProfileImage(uploadImage(file));
            userRepository.save(user);
            return user.getProfileImage();
        } else {
            Seller seller = sellerRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

            seller.setProfileImage(uploadImage(file));
            sellerRepository.save(seller);
            return seller.getProfileImage();
        }

    }

    @Override
    public String updateProfileImage(Long userId, MultipartFile file, boolean isBuyer) {
        String newImageUrl = uploadImage(file);

        if (isBuyer) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

            String oldImageUrl = user.getProfileImage();
            if (oldImageUrl != null) {
                deleteProductImage(oldImageUrl);
            }

            user.setProfileImage(newImageUrl);
            userRepository.save(user);
            return user.getProfileImage();
        } else {
            Seller seller = sellerRepository.findById(userId)
                    .orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

            String oldImageUrl = seller.getProfileImage();
            if (oldImageUrl != null) {
                deleteProductImage(oldImageUrl);
            }

            seller.setProfileImage(newImageUrl);
            sellerRepository.save(seller);
            return seller.getProfileImage();
        }
    }

    @Override
    public String uploadCoverImage(Long sellerId, MultipartFile file) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

        seller.setCoverImage(uploadImage(file));
        sellerRepository.save(seller);
        return seller.getCoverImage();
    }

    @Override
    public String updateCoverImage(Long sellerId, MultipartFile file) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

        String newImageUrl = uploadImage(file);
        String oldImageUrl = seller.getCoverImage();
        if (oldImageUrl != null) {
            deleteProductImage(oldImageUrl);
        }

        seller.setCoverImage(newImageUrl);
        sellerRepository.save(seller);
        return seller.getCoverImage();
    }
}
