package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.RegisterSellerRequest;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.entity.User;

import java.util.List;

public interface SellerService {
    Seller createSeller(Seller seller);

    Seller addProducts(Integer sellerId, Product product);

    Seller findByUsernameAndPassword(String username, String password);

    Seller updateProductStatus(Integer sellerId, Integer productId);

    List<Product> viewAllProductsBySeller(Integer sellerId);

    List<Seller> viewAllSeller();

    Seller getCurrentSeller();

    String sellerRegister(RegisterSellerRequest request, User user);
}
