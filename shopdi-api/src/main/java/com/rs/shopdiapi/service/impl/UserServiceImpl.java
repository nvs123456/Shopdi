package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.AddressRequest;
import com.rs.shopdiapi.domain.dto.request.CreateUserRequest;
import com.rs.shopdiapi.domain.dto.request.UpdateUserRequest;
import com.rs.shopdiapi.domain.dto.response.AddressResponse;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.ProfileResponse;
import com.rs.shopdiapi.domain.dto.response.RoleResponse;
import com.rs.shopdiapi.domain.dto.response.UserResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.Role;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.domain.enums.RoleEnum;
import com.rs.shopdiapi.domain.enums.UserStatusEnum;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.UserMapper;
import com.rs.shopdiapi.repository.OrderRepository;
import com.rs.shopdiapi.repository.RoleRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.CartService;
import com.rs.shopdiapi.service.EmailService;
import com.rs.shopdiapi.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;
    CartService cartService;
    OrderRepository orderRepository;
    EmailService emailService;

    private String generateUsernameFromEmail(String email) {
        String username = email.split("@")[0];
        return username + "_" + UUID.randomUUID().toString().substring(0, 8);
    }

    private String generateRandomCode(int length) {
        String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom RANDOM = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = RANDOM.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }
        return sb.toString();
    }

    @Transactional
    @Override
    public UserResponse createUser(CreateUserRequest request, String siteURL) throws MessagingException, UnsupportedEncodingException {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(generateUsernameFromEmail(request.getEmail()));
        Set<Role> roles = new HashSet<>();
        roleRepository.findByName(RoleEnum.USER.getName()).ifPresent(roles::add);
        user.setRoles(roles);
        String randomCode = generateRandomCode(64);
        user.setVerificationCode(randomCode);
        user.setStatus(UserStatusEnum.INACTIVE);
        User savedUser = userRepository.save(user);
        cartService.createCart(savedUser.getId());
        emailService.sendVerificationLink(savedUser, siteURL);
        return userMapper.toUserResponse(savedUser);
    }


    @Override
    public ProfileResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return this.toProfileResponse(user);
    }

    @Transactional
    @Override
    public UserResponse updateUser(Long userId, UpdateUserRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);

        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    @Transactional
    @Override
    public void banUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setStatus(UserStatusEnum.BLOCKED);
        userRepository.save(user);
    }

    @Transactional
    @Override
    public void unbanUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setStatus(UserStatusEnum.ACTIVE);
        userRepository.save(user);
    }

    @Override
    public PageResponse<?> getAllUsers(int pageNo, int pageSize) {
        Page<User> page = userRepository.findAll(PageRequest.of(pageNo, pageSize));
        List<UserResponse> users = page.map(user -> {
            UserResponse userResponse = userMapper.toUserResponse(user);
            Long balance = orderRepository.calculateTotalAmountSpentByUser(user.getId());
            userResponse.setBalance(balance != null ? balance : 0);
            return userResponse;
        }).toList();
        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(page.getTotalPages())
                .items(users)
                .build();
    }

    @Override
    public UserResponse getUser(Long userId) {
        return userMapper.toUserResponse(
                userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) {

    }

    @Transactional
    @Override
    public void changeStatus(Long userId, UserStatusEnum status) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setStatus(status);
        userRepository.save(user);
        log.info("User status has changed successfully, userId={}", userId);
    }

    @Override
    public boolean verifyUser(String token) {
        User user = userRepository.findByVerificationCode(token);

        if (user == null) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setStatus(UserStatusEnum.ACTIVE);
            userRepository.save(user);

            return true;
        }
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            System.out.println("username = " + username);
            return userRepository.findByUsername(username)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        }

        return null;
    }

    private ProfileResponse toProfileResponse(User user) {
        return ProfileResponse.builder()
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .mobileNo(user.getMobileNo())
                .profileImage(user.getProfileImage())
                .address(user.getAddresses() == null ? new ArrayList<>() :
                        user.getAddresses().stream()
                                .map(address -> AddressResponse.builder()
                                        .addressId(address.getId())
                                        .firstName(address.getFirstName())
                                        .lastName(address.getLastName())
                                        .address(address.getAddress() + ", " +
                                                address.getCity() + ", " +
                                                address.getState() + ", " +
                                                address.getCountry())
                                        .email(address.getEmail())
                                        .phoneNumber(address.getPhoneNumber())
                                        .isDefault(address.isDefault())
                                        .build())
                                .collect(Collectors.toList()))
                .roles(user.getRoles().stream()
                        .map(role -> RoleResponse.builder()
                                .name(role.getName())
                                .description(role.getDescription())
                                .build())
                        .collect(Collectors.toSet()))
                .status(user.getStatus())
                .build();
    }
}
