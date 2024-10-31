package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.AuthRequest;
import com.rs.shopdiapi.domain.dto.request.ChangePasswordRequest;
import com.rs.shopdiapi.domain.dto.request.RegisterSellerRequest;
import com.rs.shopdiapi.domain.dto.request.ResetPasswordRequest;
import com.rs.shopdiapi.domain.dto.request.TokenRequest;
import com.rs.shopdiapi.domain.dto.response.AuthResponse;
import com.rs.shopdiapi.domain.dto.response.IntrospectResponse;

import java.text.ParseException;

public interface AuthService {
    AuthResponse authenticate(AuthRequest authRequest);

    IntrospectResponse introspect(TokenRequest introspectRequest);

    AuthResponse refreshToken(TokenRequest refreshToken);

    void logout(TokenRequest logoutRequest) throws ParseException;

    String resetPassword(String email);

    String forgotPassword(String email);

    String changePassword(ChangePasswordRequest request);

}
