package com.rs.shopdiapi.util;

import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.InvalidatedTokenRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.impl.CustomUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtUtil {
    @NonFinal
    @Value("${jwt.accessKey}")
    protected String ACCESS_KEY;

    @NonFinal
    @Value("${jwt.refreshKey}")
    protected String REFRESH_KEY;

    @NonFinal
    @Value("${jwt.resetKey}")
    protected String RESET_KEY;

    @NonFinal
    @Value("${jwt.expiration}")
    protected long EXPIRATION;

    @NonFinal
    @Value("${jwt.refresh-expiration}")
    protected long REFRESH_EXPIRATION;

    private final CustomUserDetailsService customUserDetailsService;
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final UserRepository userRepository;

    @Autowired
    public JwtUtil(
            CustomUserDetailsService customUserDetailsService, InvalidatedTokenRepository invalidatedTokenRepository, UserRepository userRepository) {
        this.customUserDetailsService = customUserDetailsService;
        this.invalidatedTokenRepository = invalidatedTokenRepository;
        this.userRepository = userRepository;
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        String roles = userDetails.getAuthorities().stream()
                .map(authority -> "ROLE_" + authority.getAuthority())
                .collect(Collectors.joining(" "));
        claims.put("roles", roles);

        return createToken(claims, userDetails.getUsername());
    }

    public String generateResetToken(UserDetails user) {
        return createResetToken(new HashMap<>(), user);
    }

    public List<String> extractRoles(String token) {
        Claims claims = extractAllClaims(token);
        String scope = (String) claims.get("roles");
        return Arrays.asList(scope.split(" "));
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setHeaderParam("typ", "JWT")
                .setId(UUID.randomUUID().toString())
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, ACCESS_KEY)
                .compact();
    }

    private String createResetToken(Map<String, Object> claims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, RESET_KEY)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(ACCESS_KEY).parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Claims verifyToken(String token, boolean isRefresh) {
        Claims claims = extractAllClaims(token);

        Date expiryTime = isRefresh
                ? Date.from(new Date().toInstant().plus(REFRESH_EXPIRATION, ChronoUnit.MILLIS))
                : claims.getExpiration();

        if (expiryTime.before(new Date())) throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedTokenRepository.existsById(claims.getId())) throw new AppException(ErrorCode.UNAUTHENTICATED);

        return claims;
    }

    public boolean isTokenInvalidated(String token) {
        Claims claims = extractAllClaims(token);
        return invalidatedTokenRepository.existsById(claims.getId());
    }
}
