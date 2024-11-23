package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.ReviewRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.dto.response.ReviewResponse;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.service.ReviewService;
import com.rs.shopdiapi.service.UserService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ReviewController {
    ReviewService reviewService;
    UserService userService;


    @GetMapping("/product/{productId}")
    public ApiResponse<?> getReviewsByProduct(@PathVariable Long productId, int pageNo, int pageSize) {
        Page<ReviewResponse> reviews = reviewService.getReviewsByProduct(productId, pageNo, pageSize);
        return ApiResponse.builder()
                .result(reviews)
                .build();
    }

    @GetMapping("/product/{productId}/average-rating")
    public ApiResponse<?> calculateAverageRating(@PathVariable Long productId) {
        int averageRating = reviewService.calculateAverageRating(productId);
        return ApiResponse.builder()
                .result(averageRating)
                .build();
    }

    @GetMapping("/product/{productId}/count")
    public ApiResponse<?> countReviewsByProduct(@PathVariable Long productId) {
        int count = reviewService.countReviewsByProduct(productId);
        return ApiResponse.builder()
                .result(count)
                .build();
    }

    @GetMapping("/product/{productId}/exists")
    public ApiResponse<?> existsReviewForUserAndProduct(@PathVariable Long productId) {
        User user = userService.getCurrentUser();
        boolean exists = reviewService.existsByProductIdAndUserId(productId, user.getId());
        return ApiResponse.builder()
                .result(exists)
                .build();
    }

    @PostMapping("/product/{productId}")
    public ApiResponse<?> addReview(@PathVariable Long productId, @RequestBody ReviewRequest reviewRequest) {
        User user = userService.getCurrentUser();
        ReviewResponse review = reviewService.addReview(user.getId(), productId, reviewRequest);
        return ApiResponse.builder()
                .result(review)
                .build();
    }

    @PutMapping("/{reviewId}")
    public ApiResponse<?> updateReview(@PathVariable Long reviewId, @RequestBody ReviewRequest reviewRequest) {
        User user = userService.getCurrentUser();
        ReviewResponse updatedReview = reviewService.updateReview(user.getId(), reviewId, reviewRequest);
        return ApiResponse.builder()
                .result(updatedReview)
                .build();
    }

    @DeleteMapping("/{reviewId}")
    public ApiResponse<?> deleteReview(@PathVariable Long reviewId) {
        User user = userService.getCurrentUser();

        return ApiResponse.builder()
                .message(reviewService.deleteReview(user.getId(), reviewId))
                .build();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<?> getReviewsByUser(@PathVariable Long userId, int pageNo, int pageSize) {
        Page<ReviewResponse> reviews = reviewService.getReviewsByUser(userId, pageNo, pageSize);
        return ApiResponse.builder()
                .result(reviews)
                .build();
    }
}
