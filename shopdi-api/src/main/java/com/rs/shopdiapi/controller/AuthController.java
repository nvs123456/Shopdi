package com.rs.shopdiapi.controller;

import com.rs.shopdiapi.domain.dto.request.AuthRequest;
import com.rs.shopdiapi.domain.dto.request.ChangePasswordRequest;
import com.rs.shopdiapi.domain.dto.request.ForgotPasswordRequest;
import com.rs.shopdiapi.domain.dto.request.ResetPasswordRequest;
import com.rs.shopdiapi.domain.dto.request.TokenRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.domain.dto.response.AuthResponse;
import com.rs.shopdiapi.domain.dto.response.IntrospectResponse;
import com.rs.shopdiapi.service.AuthService;
import com.rs.shopdiapi.service.UserService;
import com.rs.shopdiapi.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authenticationService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

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

    @GetMapping("/verify-email")
    public ApiResponse<?> verifyEmail(@RequestParam("token") String token) {
        boolean isVerified = userService.verifyUser(token);
        if (isVerified) {
            return ApiResponse.builder()
                    .message("Email verified successfully")
                    .build();
        } else {
            return ApiResponse.builder()
                    .message("Email verification failed")
                    .build();
        }
    }

    @PostMapping("/refresh")
    ApiResponse<AuthResponse> refreshToken(@RequestBody TokenRequest request) {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthResponse>builder()
                .message("Refresh token successfully")
                .result(result)
                .build();
    }



    @PostMapping("/change-password")
    public ApiResponse<?> changePassword(@RequestBody @Valid ChangePasswordRequest request) {
        Long userId = userService.getCurrentUser().getId();
        authenticationService.changePassword(userId,request);
        return ApiResponse.builder()
                .message("Password has been changed successfully")
                .build();
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }


    @PostMapping("/forgot-password")
    ApiResponse<?> forgotPassword(@RequestBody ForgotPasswordRequest request, HttpServletRequest httpServletRequest) {
        authenticationService.forgotPassword(request.getEmail(), getSiteURL(httpServletRequest));
        return ApiResponse.builder()
                .message("Reset password link has been sent to your email")
                .build();
    }

    @PostMapping("/reset-password")
    ApiResponse<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        authenticationService.resetPasswordWithToken(request);
        return ApiResponse.builder()
                .message("Password has been reset successfully")
                .build();
    }

    @GetMapping("/reset-password")
    public ResponseEntity<?> verifyResetToken(@RequestParam("token") String token) {
        boolean isValid = authenticationService.verifyResetToken(token);

        if (isValid) {
            return ResponseEntity.ok("Reset token is valid. Please proceed to reset your password.");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }
    }
}
