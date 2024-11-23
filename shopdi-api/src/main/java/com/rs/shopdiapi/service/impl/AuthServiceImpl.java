package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.AuthRequest;
import com.rs.shopdiapi.domain.dto.request.ChangePasswordRequest;
import com.rs.shopdiapi.domain.dto.request.TokenRequest;
import com.rs.shopdiapi.domain.dto.response.AuthResponse;
import com.rs.shopdiapi.domain.dto.response.IntrospectResponse;
import com.rs.shopdiapi.domain.entity.InvalidatedToken;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.InvalidatedTokenRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.AuthService;
import com.rs.shopdiapi.jwt.JwtUtil;
import com.rs.shopdiapi.service.EmailService;
import io.jsonwebtoken.SignatureException;
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
    EmailService emailSenderService;

    @Override
    public IntrospectResponse introspect(TokenRequest request) {
        var token = request.getToken();
        boolean isValid = true;

        try {
            jwtUtil.verifyToken(token, false);
        } catch (AppException | SignatureException e) {
            isValid = false;
        }
        return IntrospectResponse.builder().valid(isValid).build();
    }

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        var user = userRepository.findByUsername(request.getUsernameOrEmail())
                .or(() -> userRepository.findByEmail(request.getUsernameOrEmail()))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());

        String token = jwtUtil.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .expiryTime(jwtUtil.extractExpiration(token))
                .build();
    }

    public void logout(TokenRequest request) {
        try {
            var claims = jwtUtil.verifyToken(request.getToken(), true);

            String jit = claims.getId();
            Date expiryTime = claims.getExpiration();

            InvalidatedToken invalidatedToken =
                    InvalidatedToken.builder().dateCreated(new Date()).id(jit).expiryTime(expiryTime).build();

            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException exception) {
            log.info("Token already expired");
        }
    }

    @Override
    public AuthResponse refreshToken(TokenRequest request) {
        var claims = jwtUtil.verifyToken(request.getToken(), true);

        String jit = claims.getId();
        Date expiryTime = claims.getExpiration();

        InvalidatedToken invalidatedToken =
                InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

        invalidatedTokenRepository.save(invalidatedToken);

        String username = claims.getSubject();

        var user = customUserDetailsService.loadUserByUsername(username);

        var token = jwtUtil.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .expiryTime(jwtUtil.extractExpiration(token))
                .build();
    }

    @Override
    public String forgotPassword(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        String resetToken = jwtUtil.generateResetToken(user);

        String confirmLink =String.format("curl --location 'http://localhost:80/auth/reset-password' \\\n" +
                "--header 'accept: */*' \\\n" +
                "--header 'Content-Type: application/json' \\\n" +
                "--data '%s'", resetToken);
        log.info("--> confirmLink: {}", confirmLink);

        return resetToken;
    }

    @Override
    public String changePassword(ChangePasswordRequest request) {
        if(!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }

        var username = jwtUtil.extractUsername(request.getToken());

        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        return "Changed password";
    }


    @Override
    public String resetPassword(String secretKey) {
        var claims = jwtUtil.verifyToken(secretKey, false);

        String username = claims.getSubject();

        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return "Reset";
    }
}
