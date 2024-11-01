package com.rs.shopdiapi.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {
    @Autowired
    private ReviewRatingService reviewRatingService;

    @Autowired
    private ReviewRatingMapper mapper;

    @PostMapping("/{productId}/reviews")
    public ResponseEntity<ReviewDTO> createReview(@PathVariable Long productId, @RequestBody ReviewDTO reviewDTO) {
        Review review = mapper.toEntity(reviewDTO);
        review.setProduct(productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found")));
        Review createdReview = reviewRatingService.createReview(review);
        return ResponseEntity.ok(mapper.toDTO(createdReview));
    }

    @GetMapping("/{productId}/reviews")
    public ResponseEntity<List<ReviewDTO>> getReviews(@PathVariable Long productId) {
        List<Review> reviews = reviewRatingService.getReviewsForProduct(productId);
        List<ReviewDTO> reviewDTOs = reviews.stream().map(mapper::toDTO).collect(Collectors.toList());
        return ResponseEntity.ok(reviewDTOs);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewRatingService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}
