package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.ProductRequest;
import com.rs.shopdiapi.domain.dto.request.ProductFilterRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.ProductDetailResponse;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.dto.response.ProductSuggestionResponse;
import com.rs.shopdiapi.domain.entity.*;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.domain.enums.ProductStatusEnum;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.ProductMapper;
import com.rs.shopdiapi.repository.*;
import com.rs.shopdiapi.service.CategoryService;
import com.rs.shopdiapi.service.ProductService;
import com.rs.shopdiapi.service.ReviewService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ProductServiceImpl implements ProductService {
    ProductRepository productRepository;
    CategoryService categoryService;
    CategoryRepository categoryRepository;
    SellerRepository sellerRepository;
    TagRepository tagRepository;

    @Transactional
    @Override
    public ProductDetailResponse createProduct(ProductRequest request, Long sellerId) {
        Category category = categoryRepository.findByName(request.getCategoryName()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

        Set<Tag> tags = request.getTagNames().stream()
                .map(tagName -> tagRepository.findByName(tagName)
                        .orElseGet(() -> new Tag(tagName)))
                .collect(Collectors.toSet());

        Product product = Product.builder()
                .productName(request.getProductName())
                .description(request.getDescription())
                .price(request.getPrice())
                .brand(request.getBrand())
                .category(category)
                .seller(seller)
                .tags(tags)
                .build();

        category.getProducts().add(product);

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


        return toProductDetailResponse(savedProduct);
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
    public ProductResponse updateProduct(ProductRequest productRequest, Long productId, Long sellerId) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if (!product.getSeller().getId().equals(sellerId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        product.setProductName(productRequest.getProductName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setBrand(productRequest.getBrand());

        Category category = categoryRepository.findByName(productRequest.getCategoryName()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        product.setCategory(category);

        Set<Tag> tags = productRequest.getTagNames().stream()
                .map(tagName -> tagRepository.findByName(tagName)
                        .orElseGet(() -> new Tag(tagName)))
                .collect(Collectors.toSet());
        product.setTags(tags);

        Set<Variant> newVariants = productRequest.getVariantDetails().stream()
                .map(variantDetail -> {
                    Variant variant = new Variant();
                    variant.setVariantDetail(variantDetail.getVariantDetail());
                    variant.setQuantity(variantDetail.getQuantity());
                    variant.setProduct(product);
                    return variant;
                }).collect(Collectors.toSet());
        product.setVariants(newVariants);

        Product updatedProduct = productRepository.save(product);
        return this.toProductResponse(updatedProduct);
    }

    @Override
    public ProductDetailResponse findProductById(Long productId) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        return toProductDetailResponse(product);
    }

    @Override
    public PageResponse<?> searchProduct(String query, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("productName").ascending());

        Page<Product> products = productRepository.findByProductNameContainingIgnoreCase(query, pageable);

        List<ProductResponse> productResponses = products.map(this::toProductResponse).toList();
        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(products.getTotalPages())
                .items(productResponses)
                .build();
    }

    @Override
    public PageResponse<?> findProductByCategory(Long categoryId, int pageNo, int pageSize) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        Page<Product> productPage = productRepository.findAllByCategoryId(category.getId(), PageRequest.of(pageNo, pageSize));

        List<ProductResponse> products = productPage.map(this::toProductResponse).toList();

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

        List<ProductResponse> products = productPage.map(this::toProductResponse).toList();

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
        String[] sortFields = sortBy.split(",");

        Sort sort = Sort.unsorted();
        for (String field : sortFields) {
            Sort sortField = sortOrder.equalsIgnoreCase("asc") ? Sort.by(field).ascending() : Sort.by(field).descending();
            sort = sort.and(sortField);
        }

        Page<Product> productPage = productRepository.findAll(PageRequest.of(pageNo, pageSize, sort));

        List<ProductResponse> products = productPage.stream()
                .map(this::toProductResponse)
                .toList();

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
        List<ProductResponse> products = productPage.map(this::toProductResponse).toList();
        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }

    @Override
    public PageResponse<?> getSellerProducts(Long sellerId, int pageNo, int pageSize) {

        Page<Product> productPage = productRepository.findAllBySellerId(sellerId ,PageRequest.of(pageNo, pageSize));

        List<ProductResponse> products = productPage.stream()
                .map(this::toProductResponse)
                .toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(productPage.getTotalPages())
                .items(products)
                .build();
    }

    @Override
    public List<ProductSuggestionResponse> getProductSuggestions(String query) {
        List<Product> products = productRepository.findByProductNameContainingIgnoreCase(query);

        return products.stream()
                .map(Product::getProductName)
                .distinct()
                .map(ProductSuggestionResponse::new)
                .collect(Collectors.toList());
    }


    private ProductResponse toProductResponse(Product product) {
        return ProductResponse.builder()
                .productId(product.getId())
                .productImage(product.getImageUrls().isEmpty() ? null : product.getImageUrls().get(0))
                .productName(product.getProductName())
                .price(product.getPrice())
                .category(product.getCategory().getName())
                .categoryId(product.getCategory().getId())
                .stock(product.getVariants().stream().mapToInt(Variant::getQuantity).sum())
                .soldQuantity(product.getSoldQuantity())
                .publishedOn(product.getCreatedAt())
                .rating(product.getReviews().isEmpty() ? 0.0 : product.getReviews().stream().mapToDouble(Review::getRating).average().orElse(0.0))
                .reviewCount(product.getReviews().size())
                .build();
    }

    private ProductDetailResponse toProductDetailResponse(Product product) {
        return ProductDetailResponse.builder()
                .productId(product.getId())
                .productName(product.getProductName())
                .description(product.getDescription())
                .price(product.getPrice())
                .brand(product.getBrand())
                .imageUrls(product.getImageUrls())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .soldQuantity(product.getSoldQuantity())
                .tagNames(product.getTags() != null
                        ? product.getTags().stream().map(Tag::getName).collect(Collectors.toSet())
                        : Set.of())
                .seller(ProductDetailResponse.SellerResponse.builder()
                        .sellerId(product.getSeller().getId())
                        .shopName(product.getSeller().getShopName())
                        .shopImageUrl(product.getSeller().getProfileImage())
                        .productCount(product.getSeller().getProducts().size())
                        .rating(product.getSeller().getProducts().stream()
                                .filter(p -> p.getReviews() != null && !p.getReviews().isEmpty())
                                .flatMap(p -> p.getReviews().stream())
                                .mapToDouble(Review::getRating)
                                .average()
                                .orElse(0.0))
                        .build())
                .variants(product.getVariants() != null
                        ? product.getVariants().stream()
                        .map(variant -> ProductDetailResponse.VariantResponse.builder()
                                .variantDetail(variant.getVariantDetail())
                                .quantity(variant.getQuantity())
                                .build())
                        .toList()
                        : List.of())
                .build();
    }

}
