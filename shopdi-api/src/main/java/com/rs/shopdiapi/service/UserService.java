package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.CreateUserRequest;
import com.rs.shopdiapi.domain.dto.request.UpdateUserRequest;
import com.rs.shopdiapi.domain.dto.response.UserResponse;
import com.rs.shopdiapi.domain.entity.User;

import java.util.List;

public interface UserService {
    UserResponse createUser(CreateUserRequest request);

    UserResponse getMyInfo();

    UserResponse updateUser(Long userId, UpdateUserRequest request);

    void deleteUser(Long userId);

    List<UserResponse> getAllUsers();

    UserResponse getUser(Long userId);

    UserResponse getUserByEmail(String email);

    void createPasswordResetTokenForUser(User user, String token);
}
