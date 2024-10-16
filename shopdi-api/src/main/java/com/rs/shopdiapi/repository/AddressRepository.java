package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
