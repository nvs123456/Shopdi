package com.rs.shopdiapi.service;

import com.rs.shopdiapi.dto.request.AuthRequest;
import com.rs.shopdiapi.dto.request.IntrospectRequest;
import com.rs.shopdiapi.dto.request.LogoutRequest;
import com.rs.shopdiapi.dto.request.RefreshRequest;
import com.rs.shopdiapi.dto.response.AuthResponse;
import com.rs.shopdiapi.dto.response.IntrospectResponse;

import java.text.ParseException;

public interface AuthService {
    AuthResponse authenticate(AuthRequest authRequest);

    IntrospectResponse introspect(IntrospectRequest introspectRequest);

    AuthResponse refreshToken(RefreshRequest refreshToken);

    void logout(LogoutRequest logoutRequest) throws ParseException;
}
