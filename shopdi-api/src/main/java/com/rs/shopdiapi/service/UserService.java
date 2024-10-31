package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.CreateUserRequest;
import com.rs.shopdiapi.domain.dto.request.UpdateUserRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.UserResponse;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.UserStatusEnum;
import org.springframework.data.domain.Page;

public interface UserService {
    UserResponse createUser(CreateUserRequest request);

    UserResponse getMyInfo();

    UserResponse updateUser(Long userId, UpdateUserRequest request);

    void deleteUser(Long userId);

    PageResponse<?> getAllUsers(int pageNo, int pageSize, String sortBy, String sortOrder);

    UserResponse getUser(Long userId);

    UserResponse getUserByEmail(String email);

    void createPasswordResetTokenForUser(User user, String token);

    void changeStatus(Long userId, UserStatusEnum status);

    User getCurrentUser();
}
