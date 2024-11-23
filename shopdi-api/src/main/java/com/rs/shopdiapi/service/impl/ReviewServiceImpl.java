package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.ReviewRequest;
import com.rs.shopdiapi.domain.dto.response.ReviewResponse;
import com.rs.shopdiapi.domain.entity.Review;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.ReviewMapper;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.repository.ReviewRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.ReviewService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ReviewServiceImpl implements ReviewService {
    ReviewRepository reviewRepository;
    ProductRepository productRepository;
    UserRepository userRepository;
    ReviewMapper reviewMapper;

    @Override
    public Page<ReviewResponse> getReviewsByProduct(Long productId, int pageNo, int pageSize) {
        Page<Review> reviews = reviewRepository.findAllByProductId(productId, PageRequest.of(pageNo, pageSize));
        return reviews.map(reviewMapper::toReviewResponse);
    }

    @Override
    public int calculateAverageRating(Long productId) {
        return reviewRepository.calculateAverageRating(productId);
    }

    @Override
    public int countReviewsByProduct(Long productId) {
        return reviewRepository.countByProductId(productId);
    }

    @Override
    public boolean existsByProductIdAndUserId(Long productId, Long userId) {
        return reviewRepository.existsByProductIdAndUserId(productId, userId);
    }

    @Override
    public int countAllReviews() {
        return reviewRepository.countByReviewId();
    }

    @Override
    public Page<ReviewResponse> getReviewsByUser(Long userId, int pageNo, int pageSize) {
        Page<Review> reviews = reviewRepository.findAllByUserId(userId, PageRequest.of(pageNo, pageSize));
        return reviews.map(reviewMapper::toReviewResponse);
    }

    @Transactional
    @Override
    public ReviewResponse addReview(Long userId, Long productId, ReviewRequest reviewRequest) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if (reviewRepository.existsByProductIdAndUserId(productId, userId)) {
            throw new AppException(ErrorCode.REVIEW_ALREADY_EXISTS);
        }

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(reviewRequest.getRating())
                .review(reviewRequest.getReview())
                .build();

        Review savedReview = reviewRepository.save(review);
        return reviewMapper.toReviewResponse(savedReview);
    }

    @Transactional
    @Override
    public ReviewResponse updateReview(Long userId, Long reviewId, ReviewRequest reviewRequest) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND));

        if (!review.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        review.setRating(reviewRequest.getRating());
        review.setReview(reviewRequest.getReview());
        reviewRepository.save(review);

        return reviewMapper.toReviewResponse(review);
    }

    @Transactional
    @Override
    public String deleteReview(Long userId, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND));

        if (!review.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        reviewRepository.delete(review);
        return "Review deleted successfully";
    }
}
