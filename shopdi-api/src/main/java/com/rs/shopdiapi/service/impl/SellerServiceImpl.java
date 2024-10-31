package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.RegisterSellerRequest;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.Role;
import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.SellerMapper;
import com.rs.shopdiapi.repository.RoleRepository;
import com.rs.shopdiapi.repository.SellerRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.SellerService;
import com.rs.shopdiapi.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SellerServiceImpl implements SellerService {
    SellerRepository sellerRepository;
    UserRepository userRepository;
    SellerMapper sellerMapper;
    RoleRepository roleRepository;

    @Override
    public Seller createSeller(Seller seller) {

        return null;
    }

    @Override
    public Seller addProducts(Integer sellerId, Product product) {
        return null;
    }

    @Override
    public Seller findByUsernameAndPassword(String username, String password) {
        return null;
    }


    @Override
    public Seller updateProductStatus(Integer sellerId, Integer productId) {
        return null;
    }

    @Override
    public List<Product> viewAllProductsBySeller(Integer sellerId) {
        return List.of();
    }

    @Override
    public List<Seller> viewAllSeller() {
        return List.of();
    }

    @Override
    public Seller getCurrentSeller() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No authenticated user found");
        }

        Object principal = authentication.getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            throw new RuntimeException("Cannot extract email from authentication");
        }


        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Seller seller = user.getSeller();

        if (seller == null) {
            throw new AppException(ErrorCode.SELLER_NOT_EXIST);
        }

        return seller;
    }

    @Transactional
    @Override
    public String sellerRegister(RegisterSellerRequest request, User user) {
        if(sellerRepository.existsByUser(user)) {
            throw new AppException(ErrorCode.SELLER_ALREADY_REGISTERED);
        }

        var sellerRoleOptional = roleRepository.findByName("SELLER");

        Role sellerRole;
        if (sellerRoleOptional.isEmpty()) {
            sellerRole = new Role();
            sellerRole.setName("SELLER");
            sellerRole.setDescription("Seller role");
            roleRepository.save(sellerRole);
        } else {
            sellerRole = sellerRoleOptional.get();
        }

        Set<Role> userRoles = user.getRoles();
        if(!userRoles.contains(sellerRole)) {
            userRoles.add(sellerRole);
            user.setRoles(userRoles);
        }

        Seller seller = Seller.builder()
                .shopName(request.getShopName())
                .email(request.getEmail())
                .location(request.getAddress() + ", " + request.getCityOrTown() + ", " + request.getStateOrDistrict())
                .contactNumber(request.getContactNumber())
                .user(user)
                .build();

        sellerRepository.save(seller);
        return "Seller registered successfully";
    }
}
