package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.RegisterSellerRequest;
import com.rs.shopdiapi.domain.dto.request.UpdateSellerRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.SellerResponse;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.entity.User;

import java.math.BigDecimal;
import java.util.List;

public interface SellerService {
    Seller findByUsernameAndPassword(String username, String password);

    Seller updateProductStatus(Integer sellerId, Integer productId);

    List<Product> viewAllProductsBySeller(Integer sellerId);

    PageResponse<?> getAllSeller(int pageNo, int pageSize);

    Seller getCurrentSeller();

    void sellerRegister(RegisterSellerRequest request, User user);

    SellerResponse updateSellerProfile(Long sellerId, UpdateSellerRequest request);

    SellerResponse getSellerProfile(Long sellerId);
}
