package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {
    @Query("SELECT r FROM Review r WHERE r.product.id = :productId")
    public List<Review> getAllProductsRating(@Param("productId")Long productId);
}
