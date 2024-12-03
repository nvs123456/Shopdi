package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.entity.Seller;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.OrderItemRepository;
import com.rs.shopdiapi.repository.SellerRepository;
import com.rs.shopdiapi.service.RevenueService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class RevenueServiceImpl implements RevenueService {
    OrderItemRepository orderItemRepository;
    SellerRepository sellerRepository;

    @Override
    public BigDecimal calculateRevenue(Long sellerId) {
        return orderItemRepository.calculateRevenueBySeller(sellerId);
    }

    @Override
    @Transactional
    public void updateRevenue(Long sellerId, BigDecimal orderTotal) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

        seller.setRevenue(seller.getRevenue().add(orderTotal));
        sellerRepository.save(seller);
    }

    @Override
    @Transactional
    public void refundRevenue(Long sellerId, BigDecimal refundAmount) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.SELLER_NOT_EXIST));

        seller.setRevenue(seller.getRevenue().subtract(refundAmount));
        sellerRepository.save(seller);
    }
}
