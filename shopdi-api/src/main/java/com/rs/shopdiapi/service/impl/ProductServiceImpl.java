package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.CreateProductRequest;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.mapper.ProductMapper;
import com.rs.shopdiapi.repository.CategoryRepository;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ProductServiceImpl implements ProductService {
    ProductRepository productRepository;
    CategoryRepository categoryRepository;
    ProductMapper productMapper;

    @Override
    public ProductResponse createProduct(CreateProductRequest createProductRequest) {
        if(categoryRepository.findByName(createProductRequest.getCategory().getName()).getProducts().isEmpty()) {
            log.error("Category not found");
            return null;
        }

        Product product = productMapper.toProduct(createProductRequest);

        return productMapper.toProductResponse(productRepository.save(product));
    }

    @Override
    public String deleteProduct(Long productId) {
        return "";
    }

    @Override
    public Product updateProduct(Long productId, Product productRequest) {
        return null;
    }

    @Override
    public Product findProductById(Long productId) {
        return null;
    }

    @Override
    public List<Product> findProductByCategory(String category) {
        return List.of();
    }

    @Override
    public Page<Product> getAllProduct(String category, List<String> colors, List<String> sizes, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {
        return null;
    }

    @Override
    public List<Product> findAllProducts() {
        return List.of();
    }
}
