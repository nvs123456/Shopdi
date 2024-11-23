package com.rs.shopdiapi.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.util.List;

public interface ImageService {
    Resource getImage(String fileName);

    List<String> uploadProductImage(List<MultipartFile> file, Long productId);

    void deleteProductImage(String imageUrl);
}