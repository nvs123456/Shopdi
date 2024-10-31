package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String>, JpaSpecificationExecutor<InvalidatedToken> {
}
