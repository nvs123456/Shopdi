package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.dto.request.AuthRequest;
import com.rs.shopdiapi.dto.request.IntrospectRequest;
import com.rs.shopdiapi.dto.request.LogoutRequest;
import com.rs.shopdiapi.dto.request.RefreshRequest;
import com.rs.shopdiapi.dto.response.AuthResponse;
import com.rs.shopdiapi.dto.response.IntrospectResponse;
import com.rs.shopdiapi.entity.InvalidatedToken;
import com.rs.shopdiapi.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.InvalidatedTokenRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.AuthService;
import com.rs.shopdiapi.jwt.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AuthServiceImpl implements AuthService {
    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;
    CustomUserDetailsService customUserDetailsService;
    JwtUtil jwtUtil;

    @Override
    public IntrospectResponse introspect(IntrospectRequest request) {
        var token = request.getToken();
        boolean isValid = true;

        try {
            jwtUtil.verifyToken(token, false);
        } catch (Exception e) {
            isValid = false;
        }
        return IntrospectResponse.builder().valid(isValid).build();
    }

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .or(() -> userRepository.findByEmail(request.getEmail()))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getUsername());

        String token = jwtUtil.generateToken(userDetails);

        return AuthResponse.builder()
                .jwt(token)
                .expiryTime(jwtUtil.extractExpiration(token))
                .build();
    }

    @Override
    public void logout(LogoutRequest logoutRequest) {
        try {
            Claims token = jwtUtil.verifyToken(logoutRequest.getToken(), true);
            String jti = token.getId();
            Date expiryTime = token.getExpiration();

            InvalidatedToken invalidatedToken =
                    InvalidatedToken.builder().id(Long.valueOf(jti)).expiryTime(expiryTime).build();
            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException e) {
            log.info("Token already expired");
        }
    }

    @Override
    public AuthResponse refreshToken(RefreshRequest refreshToken) {
        return jwtUtil.refreshToken(refreshToken);
    }
}
