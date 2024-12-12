package com.rs.shopdiapi.repository;

import com.rs.shopdiapi.domain.entity.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Page<User> findAll(Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.verificationCode = :code")
    User findByVerificationCode(@Param("code") String code);

    @Query("SELECT u FROM User u WHERE u.resetPasswordToken = :token")
    Optional<User> findByResetPasswordToken(@Param("token") String token);
}
