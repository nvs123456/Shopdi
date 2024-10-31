package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.ProductRequest;
import com.rs.shopdiapi.domain.dto.request.ProductFilterRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.entity.*;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.domain.enums.ProductStatusEnum;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.ProductMapper;
import com.rs.shopdiapi.repository.*;
import com.rs.shopdiapi.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ProductServiceImpl implements ProductService {
    ProductRepository productRepository;
    CategoryRepository categoryRepository;
    ProductMapper productMapper;
    SellerRepository sellerRepository;
    TagRepository tagRepository;

    @Transactional
    @Override
    public ProductResponse createProduct(ProductRequest request, Long sellerId) {
        Category category = categoryRepository.findByName(request.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        Set<Tag> tags = request.getTagNames().stream()
                .map(tagName -> tagRepository.findByName(tagName)
                        .orElseGet(() -> new Tag(tagName)))
                .collect(Collectors.toSet());

        Product product = Product.builder()
                .productName(request.getProductName())
                .description(request.getDescription())
                .price(request.getPrice())
                .discountPercent(request.getDiscountPercent())
                .brand(request.getBrand())
                .category(category)
                .seller(seller)
                .tags(tags)
                .status(ProductStatusEnum.valueOf(request.getProductStatus()))
                .build();

        Set<Variant> variants = request.getVariantDetails().stream()
                .map(detail -> {
                    Variant variant = new Variant();
                    variant.setProduct(product);
                    variant.setVariantDetail(detail.getVariantDetail());
                    variant.setQuantity(detail.getQuantity());
                    return variant;
                }).collect(Collectors.toSet());
        product.setVariants(variants);

        Product savedProduct = productRepository.save(product);


        return ProductResponse.builder()
                .id(savedProduct.getId())
                .productName(savedProduct.getProductName())
                .description(savedProduct.getDescription())
                .price(savedProduct.getPrice())
                .discountPercent(savedProduct.getDiscountPercent())
                .brand(savedProduct.getBrand())
                .status(savedProduct.getStatus())
                .imageUrls(savedProduct.getImageUrls())
                .categoryName(savedProduct.getCategory() != null ? savedProduct.getCategory().getName() : null)
                .tagNames(savedProduct.getTags().stream().map(Tag::getName).collect(Collectors.toSet()))
                .sellerId(savedProduct.getSeller().getId())
                .shopName(savedProduct.getSeller().getShopName())
                .variants(savedProduct.getVariants().stream()
                        .map(variant -> ProductResponse.VariantResponse.builder()
                                .variantDetail(variant.getVariantDetail())
                                .quantity(variant.getQuantity())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    @Transactional
    @Override
    public String deleteProduct(Long productId, Long sellerId) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if (!product.getSeller().getId().equals(sellerId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        productRepository.deleteById(productId);
        return "Product deleted successfully";
    }

    @Transactional
    @Override
    public ProductResponse updateProduct(ProductRequest productRequest, Long productId) {
        var product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        productMapper.updateProduct(product, productRequest);

        return productMapper.toProductResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse findProductById(Long productId) {
        var product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return productMapper.toProductResponse(product);
    }

    @Override
    public PageResponse<?> searchProduct(String query, int pageNo, int pageSize) {
        return null;
    }

    @Override
    public PageResponse<?> findProductByCategory(String category, int pageNo, int pageSize) {
        var categoryEntity = categoryRepository.findByName(category).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        Page<Product> productPage = productRepository.findAllByCategoryId(categoryEntity.getId(), PageRequest.of(pageNo, pageSize));

        List<ProductResponse> products = productPage.map(productMapper::toProductResponse).toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }

    @Override
    public PageResponse<?> filterProducts(ProductFilterRequest filterRequest, int pageNo, int pageSize) {
        Specification<Product> specification = Specification
                .where(ProductSpecification.hasProductName(filterRequest.getProductName()))
                .and(ProductSpecification.hasCategory(filterRequest.getCategories()))
                .and(ProductSpecification.hasBrand(filterRequest.getBrands()))
                .and(ProductSpecification.hasPriceBetween(filterRequest.getMinPrice(), filterRequest.getMaxPrice()))
                .and(ProductSpecification.hasDiscountBetween(filterRequest.getMinDiscount(), filterRequest.getMaxDiscount()))
                .and(ProductSpecification.hasRatingBetween(filterRequest.getMinRating(), filterRequest.getMaxRating()));

        Page<Product> productPage = productRepository.findAll(specification, PageRequest.of(pageNo, pageSize));

        List<ProductResponse> products = productPage.map(productMapper::toProductResponse).toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }


//    @Override
//    public PageResponse<?> getAllProductByFilter(ProductFilterRequest filterRequest, int pageNo, int pageSize) {
//        List<Product> products = productRepository.filterProducts(
//                filterRequest.getCategories(),
//                filterRequest.getBrands(),
//                filterRequest.getMinPrice(),
//                filterRequest.getMaxPrice(),
//                filterRequest.getMinDiscount(),
//                filterRequest.getMinRating(),
//                filterRequest.getSortByDiscount(),
//                filterRequest.getSortByPrice(),
//                PageRequest.of(pageNo, pageSize)
//        );
//
//
//        return PageResponse.builder()
//                .pageNo(pageNo)
//                .pageSize(pageSize)
//                .totalPages(0)
//                .items(List.of())
//                .build();
//    }



    @Override
    public PageResponse<?> getAllProducts(int pageNo, int pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Page<Product> productPage = productRepository.findAll(PageRequest.of(pageNo, pageSize, sortByAndOrder));

        List<ProductResponse> products = productPage.map(productMapper::toProductResponse).toList();
        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }

    @Override
    public PageResponse<?> getMyProducts(int pageNo, int pageSize, String sortBy, String sortOrder, Long sellerId) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Page<Product> productPage = productRepository.findAllBySellerId(sellerId, PageRequest.of(pageNo, pageSize, sortByAndOrder));
        List<ProductResponse> products = productPage.map(productMapper::toProductResponse).toList();
        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }

}
