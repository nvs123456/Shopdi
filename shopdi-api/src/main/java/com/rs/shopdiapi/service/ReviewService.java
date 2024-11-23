package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.ReviewRequest;
import com.rs.shopdiapi.domain.dto.response.ReviewResponse;
import com.rs.shopdiapi.domain.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
    Page<ReviewResponse> getReviewsByProduct(Long productId, int page, int size);

    int calculateAverageRating(Long productId);

    int countReviewsByProduct(Long productId);

    boolean existsByProductIdAndUserId(Long productId, Long userId);

    int countAllReviews();

    Page<ReviewResponse> getReviewsByUser(Long userId, int page, int size);

    ReviewResponse addReview(Long userId, Long productId, ReviewRequest reviewRequest);

    ReviewResponse updateReview(Long userId, Long reviewId, ReviewRequest reviewRequest);

    String deleteReview(Long userId, Long reviewId);
}
