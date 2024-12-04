package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.ReviewRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.ReviewResponse;

public interface ReviewService {
    PageResponse<?> getReviewsByProduct(Long productId, int page, int size);

    int calculateAverageRating(Long productId);

    int countReviewsByProduct(Long productId);

    boolean existsByProductIdAndUserId(Long productId, Long userId);

    ReviewResponse addReview(Long userId, Long productId, ReviewRequest reviewRequest);

    ReviewResponse updateReview(Long userId, Long reviewId, ReviewRequest reviewRequest);

    String deleteReview(Long userId, Long reviewId);
}
