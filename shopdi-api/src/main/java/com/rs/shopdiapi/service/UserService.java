package com.rs.shopdiapi.service;

import com.rs.shopdiapi.dto.request.UserCreationRequest;
import com.rs.shopdiapi.dto.request.UserUpdateRequest;
import com.rs.shopdiapi.dto.response.UserResponse;
import com.rs.shopdiapi.repository.UserRepository;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserCreationRequest request);

    UserResponse getMyInfo();

    UserResponse updateUser(Long userId, UserUpdateRequest request);

    void deleteUser(Long userId);

    List<UserResponse> getAllUsers();

    UserResponse getUser(Long userId);
}
