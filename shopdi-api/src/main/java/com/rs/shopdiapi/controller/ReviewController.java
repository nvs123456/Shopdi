package com.rs.shopdiapi.controller;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ReviewController {

//    @PostMapping("/{productId}")
//    public ApiResponse<?> addRating(@PathVariable Long productId, @RequestParam Double rating) {
//        return ApiResponse.builder()
//                .result(ratingService.addRating(productId, rating))
//                .build();
//    }
//
//    @GetMapping("/{productId}")
//    public ResponseEntity<List<Rating>> getRatings(@PathVariable Long productId) {
//        List<Rating> ratings = reviewRatingService.getRatingsForProduct(productId);
//        return ResponseEntity.ok(ratings);
//    }
//
//    @PutMapping("/ratings/{ratingId}")
//    public ResponseEntity<Rating> updateRating(@PathVariable Long ratingId, @RequestBody Rating rating) {
//        Rating updatedRating = reviewRatingService.updateRating(ratingId, rating);
//        return ResponseEntity.ok(updatedRating);
//    }

//    @Autowired
//    private ReviewRatingService reviewRatingService;
//
//    @Autowired
//    private ReviewRatingMapper mapper;
//
//    @PostMapping("/{productId}/reviews")
//    public ResponseEntity<ReviewDTO> createReview(@PathVariable Long productId, @RequestBody ReviewDTO reviewDTO) {
//        Review review = mapper.toEntity(reviewDTO);
//        review.setProduct(productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found")));
//        Review createdReview = reviewRatingService.createReview(review);
//        return ResponseEntity.ok(mapper.toDTO(createdReview));
//    }
//
//    @GetMapping("/{productId}/reviews")
//    public ResponseEntity<List<ReviewDTO>> getReviews(@PathVariable Long productId) {
//        List<Review> reviews = reviewRatingService.getReviewsForProduct(productId);
//        List<ReviewDTO> reviewDTOs = reviews.stream().map(mapper::toDTO).collect(Collectors.toList());
//        return ResponseEntity.ok(reviewDTOs);
//    }
//
//    @DeleteMapping("/reviews/{reviewId}")
//    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
//        reviewRatingService.deleteReview(reviewId);
//        return ResponseEntity.noContent().build();
//    }
}
