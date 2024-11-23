package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {
    Page<Review> findAllByProductId(Long productId, Pageable pageable);

    @Query("SELECT COALESCE(CEILING(AVG(r.rating)),0) FROM Review r WHERE r.product.id = :productId")
    int calculateAverageRating(@Param("productId") Long productId);

    @Query("SELECT COUNT(r.id) FROM Review r WHERE r.product.id = :productId")
    int countByProductId(@Param("productId") Long productId);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN TRUE ELSE FALSE END " +
            "FROM Review r JOIN r.user u WHERE r.product.id = :productId AND u.id = :userId")
    boolean existsByProductIdAndUserId(@Param("productId") Long productId, @Param("userId") Long userId);

    @Query("SELECT COUNT(r.id) FROM Review r")
    int countByReviewId();

    Page<Review> findAllByUserId(Long userId, Pageable pageable);
}
