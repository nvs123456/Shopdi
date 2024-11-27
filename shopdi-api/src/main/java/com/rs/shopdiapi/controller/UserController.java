package com.rs.shopdiapi.controller;

import com.cloudinary.Api;
import com.rs.shopdiapi.domain.dto.request.AddressRequest;
import com.rs.shopdiapi.domain.dto.request.CreateUserRequest;
import com.rs.shopdiapi.domain.dto.request.UpdateUserRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.dto.response.UserResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.PageConstants;
import com.rs.shopdiapi.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ApiResponse<UserResponse> createUser(@RequestBody @Valid CreateUserRequest createUserRequest, HttpServletRequest request)
            throws MessagingException, UnsupportedEncodingException {
        UserResponse userResponse = userService.createUser(createUserRequest, getSiteURL(request));

        return ApiResponse.<UserResponse>builder()
                .result(userResponse)
                .build();
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }


    @GetMapping("/my-info")
    public ApiResponse<?> getMyInfo() {
        return ApiResponse.builder()
                .result(userService.getMyInfo())
                .build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<?> getAllUsers(@RequestParam(defaultValue = "0", required = false) int pageNo,
                                      @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize,
                                      @RequestParam(defaultValue = PageConstants.SORT_BY_ID, required = false) String sortBy,
                                      @RequestParam(defaultValue = PageConstants.SORT_DIR, required = false) String sortOrder) {
        return ApiResponse.builder()
                .result(userService.getAllUsers(pageNo, pageSize, sortBy, sortOrder))
                .build();
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<UserResponse> getUser(@PathVariable("userId") Long userId) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUser(userId))
                .build();
    }

    @PutMapping("/{userId}/ban")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<String> banUser(@PathVariable Long userId) {
        userService.banUser(userId);
        return ApiResponse.<String>builder().result("User has been ban").build();
    }

    @PutMapping("/{userId}/unban")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<String> unbanUser(@PathVariable Long userId) {
        userService.unbanUser(userId);
        return ApiResponse.<String>builder().result("User has been unban").build();
    }

    @PutMapping("/update-profile")
    ApiResponse<UserResponse> updateUser(@RequestBody UpdateUserRequest request) {
        User user = userService.getCurrentUser();
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(user.getId(), request))
                .build();
    }



}