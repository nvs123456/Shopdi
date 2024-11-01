package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ratings")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class RatingReviewController {
    @PostMapping("/{productId}")
    public ApiResponse<?> addRating(@PathVariable Long productId, @RequestParam Double rating) {
        return ApiResponse.builder()
                .result(ratingService.addRating(productId, rating))
                .build();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<Rating>> getRatings(@PathVariable Long productId) {
        List<Rating> ratings = reviewRatingService.getRatingsForProduct(productId);
        return ResponseEntity.ok(ratings);
    }

    @PutMapping("/ratings/{ratingId}")
    public ResponseEntity<Rating> updateRating(@PathVariable Long ratingId, @RequestBody Rating rating) {
        Rating updatedRating = reviewRatingService.updateRating(ratingId, rating);
        return ResponseEntity.ok(updatedRating);
    }
}
