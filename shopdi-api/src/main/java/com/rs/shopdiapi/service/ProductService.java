package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.ProductRequest;
import com.rs.shopdiapi.domain.dto.request.ProductFilterRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.ProductDetailResponse;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.dto.response.ProductSuggestionResponse;
import com.rs.shopdiapi.domain.entity.Product;

import java.util.List;

public interface ProductService {
    ProductDetailResponse createProduct(ProductRequest productRequest, Long sellerId);

    String deleteProduct(Long productId, Long sellerId);

    ProductResponse updateProduct(ProductRequest request, Long productId, Long sellerId);

    ProductDetailResponse findProductById(Long productId);

    PageResponse<?> searchProduct(String query, int pageNo, int pageSize);

    PageResponse<?> findProductByCategory(Long categoryId, int pageNo, int pageSize,String sortBy, String sortOrder);

    PageResponse<?> filterProducts(ProductFilterRequest filterRequest, int pageNo, int pageSize);

//    PageResponse<?> getAllProductByFilter(ProductFilterRequest filterRequest, int pageNo, int pageSize); ;

    PageResponse<?> getAllProducts(int pageNo, int pageSize, String sortBy, String sortOrder);

    PageResponse<?> getMyProducts(int pageNo, int pageSize, String sortBy, String sortOrder, Long sellerId);

    PageResponse<?> getSellerProducts(Long sellerId, int pageNo, int pageSize);

    List<ProductSuggestionResponse> getProductSuggestions(String query);
}
