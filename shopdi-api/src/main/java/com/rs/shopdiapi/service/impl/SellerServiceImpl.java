package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.RegisterSellerRequest;
import com.rs.shopdiapi.domain.dto.request.UpdateSellerRequest;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.SellerResponse;
import com.rs.shopdiapi.domain.dto.response.SimpleSellerResponse;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.Role;
import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.OrderItemRepository;
import com.rs.shopdiapi.repository.RoleRepository;
import com.rs.shopdiapi.repository.SellerRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.SellerService;
import com.rs.shopdiapi.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SellerServiceImpl implements SellerService {
    SellerRepository sellerRepository;
    UserRepository userRepository;
    RoleRepository roleRepository;
    UserService userService;
    OrderItemRepository orderItemRepository;


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
    public PageResponse<?> getAllSeller(int pageNo, int pageSize) {
        Page<Seller> page = sellerRepository.findAll(PageRequest.of(0, 10));
        List<SimpleSellerResponse> sellers = page.map(this::toSimpleSellerResponse).toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(page.getTotalPages())
                .items(sellers)
                .build();
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

    @Transactional
    @Override
    public SellerResponse updateSellerProfile(Long sellerId, UpdateSellerRequest request) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

        User user = userService.getCurrentUser();
        if (!seller.getUser().getId().equals(user.getId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        seller.setShopName(request.getShopName());
        seller.setEmail(request.getEmail());
        seller.setLocation(request.getLocation());
        seller.setContactNumber(request.getContactNumber());
        seller.setAbout(request.getAbout());

        Seller updatedSeller = sellerRepository.save(seller);

        return SellerResponse.builder()
                .sellerId(updatedSeller.getId())
                .shopName(updatedSeller.getShopName())
                .email(updatedSeller.getEmail())
                .location(updatedSeller.getLocation())
                .contactNumber(updatedSeller.getContactNumber())
                .about(updatedSeller.getAbout())
                .coverImage(seller.getCoverImage())
                .profileImage(seller.getProfileImage())
                .username(updatedSeller.getUser().getUsername())
                .build();
    }

    @Override
    public SellerResponse getSellerProfile(Long sellerId) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

        return SellerResponse.builder()
                .sellerId(seller.getId())
                .shopName(seller.getShopName())
                .email(seller.getEmail())
                .location(seller.getLocation())
                .contactNumber(seller.getContactNumber())
                .about(seller.getAbout())
                .coverImage(seller.getCoverImage())
                .profileImage(seller.getProfileImage())
                .username(seller.getUser().getUsername())
                .build();
    }

    private SimpleSellerResponse toSimpleSellerResponse(Seller seller) {
        return SimpleSellerResponse.builder()
                .id(seller.getId())
                .shopName(seller.getShopName())
                .profileImage(seller.getProfileImage())
                .status(seller.getUser().getStatus().toString())
                .totalProducts(seller.getProducts().size())
                .totalRevenue(orderItemRepository.calculateRevenueBySeller(seller.getId()))
                .build();
    }
}
