package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long>, JpaSpecificationExecutor<Tag> {
    boolean existsByName(String name);
    Optional<Tag> findByName(String name);
}
