package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.entity.User;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.Map;

public interface EmailService {
    void sendVerificationLink(User user, String siteURL) throws MessagingException, UnsupportedEncodingException;

    void sendResetPasswordLink(String toEmail, String resetToken);
}
