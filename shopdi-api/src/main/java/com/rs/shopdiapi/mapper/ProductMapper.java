package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.request.CreateProductRequest;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductResponse toProductResponse(Product product);
    Product toProduct(CreateProductRequest request);
}
