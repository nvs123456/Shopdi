package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.AuthRequest;
import com.rs.shopdiapi.domain.dto.request.ChangePasswordRequest;
import com.rs.shopdiapi.domain.dto.request.ResetPasswordRequest;
import com.rs.shopdiapi.domain.dto.request.TokenRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.dto.response.AuthResponse;
import com.rs.shopdiapi.domain.dto.response.IntrospectResponse;
import com.rs.shopdiapi.jwt.JwtUtil;
import com.rs.shopdiapi.service.AuthService;
import com.rs.shopdiapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    @Autowired
    private AuthService authenticationService;

    @PostMapping("/login")
    ApiResponse<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthResponse>builder().result(result).build();
    }
    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody TokenRequest request) {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder().result(result).build();
    }

    @PostMapping("/logout")
    ApiResponse<?> logout(@RequestBody TokenRequest request) throws ParseException {
        authenticationService.logout(request);
        return ApiResponse.builder().
                message("Logout successfully").
                build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthResponse> refreshToken(@RequestBody TokenRequest request) {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthResponse>builder()
                .message("Refresh token successfully")
                .result(result)
                .build();
    }

    @PostMapping("/forgot-password")
    ApiResponse<String> forgotPassword(@RequestBody String email) {
        return ApiResponse.<String>builder()
                .message(authenticationService.forgotPassword(email))
                .build();
    }

    @PostMapping("/reset-password")
    ApiResponse<String> resetPassword(@RequestBody String secretKey) {
        return ApiResponse.<String>builder()
                .message(authenticationService.resetPassword(secretKey))
                .build();
    }


    @PostMapping("change-password")
    public ApiResponse<String> changePassword(@RequestBody @Valid ChangePasswordRequest request) {
        return ApiResponse.<String>builder()
                .message(authenticationService.changePassword(request))
                .build();
    }


}
