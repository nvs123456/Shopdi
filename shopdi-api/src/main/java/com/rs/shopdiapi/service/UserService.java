package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.AddressRequest;
import com.rs.shopdiapi.domain.dto.request.CreateUserRequest;
import com.rs.shopdiapi.domain.dto.request.UpdateUserRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.ProfileResponse;
import com.rs.shopdiapi.domain.dto.response.UserResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.UserStatusEnum;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;

import java.io.UnsupportedEncodingException;

public interface UserService {
    UserResponse createUser(CreateUserRequest request, String siteURL) throws MessagingException, UnsupportedEncodingException;

   ProfileResponse getMyInfo();

    UserResponse updateUser(Long userId, UpdateUserRequest request);

    void banUser(Long userId);

    void unbanUser(Long userId);

    PageResponse<?> getAllUsers(int pageNo, int pageSize);

    UserResponse getUser(Long userId);

    UserResponse getUserByEmail(String email);

    void createPasswordResetTokenForUser(User user, String token);

    void changeStatus(Long userId, UserStatusEnum status);

    boolean verifyUser(String token);

    User getCurrentUser();
}
