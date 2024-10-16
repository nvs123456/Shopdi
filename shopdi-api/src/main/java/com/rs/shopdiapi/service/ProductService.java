package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.CreateProductRequest;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    public ProductResponse createProduct(CreateProductRequest createProductRequest);

    public String deleteProduct(Long productId);

    public Product updateProduct(Long productId, Product productRequest);

    public Product findProductById(Long productId);

    public List<Product> findProductByCategory(String category);

    public Page<Product> getAllProduct(String category, List<String> colors, List<String> sizes, Integer minPrice, Integer maxPrice
            , Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize);

    public List<Product> findAllProducts();
}
