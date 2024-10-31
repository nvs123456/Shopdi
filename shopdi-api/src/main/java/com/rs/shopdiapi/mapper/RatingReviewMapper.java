package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.request.RatingRequest;
import com.rs.shopdiapi.domain.dto.request.ReviewRequest;
import com.rs.shopdiapi.domain.entity.Rating;
import com.rs.shopdiapi.domain.entity.Review;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RatingReviewMapper {
    Rating toEntity(RatingRequest ratingDTO);
    RatingResponse toRatingResponse(Rating rating);

    Review toEntity(ReviewRequest reviewDTO);
    ReviewResponse toReviewResponse(Review review);
}
