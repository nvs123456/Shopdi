package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
}
