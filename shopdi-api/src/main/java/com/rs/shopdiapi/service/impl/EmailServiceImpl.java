package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import java.io.UnsupportedEncodingException;


@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService {
    private JavaMailSender mailSender;

    @Override
    public void sendVerificationLink(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String fromAddress = "shopdi.uet@gmail.com";
        String senderName = "Shopdi";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(user.getEmail());
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyURL = siteURL + "/api/v1/auth/verify-email?token=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    @Override
    public void sendResetPasswordLink(String toEmail, String resetToken, String siteURL) {
        try {
            String link = siteURL + "/api/v1/auth/reset-password?token=" + resetToken;

            String emailContent = "<p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng click vào link dưới đây để thiết lập lại mật khẩu của bạn:</p>"
                    + "<a href=\"" + link + "\">Đặt lại mật khẩu</a>"
                    + "<p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>";

            sendEmail(toEmail, "[Shopdi] Đặt lại mật khẩu", emailContent);

        } catch (Exception e) {
            System.err.println("Failed to send reset password email to " + toEmail);
            e.printStackTrace();
            throw new RuntimeException("Failed to send reset password email", e);
        }
    }

    private void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
