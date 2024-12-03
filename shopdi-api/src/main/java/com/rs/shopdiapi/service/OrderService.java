package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.BuyNowRequest;
import com.rs.shopdiapi.domain.dto.request.CreateOrderRequest;
import com.rs.shopdiapi.domain.dto.response.OrderResponse;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.OrderItemStatusEnum;
import com.rs.shopdiapi.domain.enums.OrderStatusEnum;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.util.List;

public interface OrderService {

    String createOrder(Long userId, CreateOrderRequest request);

    String buyNow(Long userId, Long productId, BuyNowRequest request);

    OrderResponse updateOrderStatusBySeller(Long orderId, Long sellerId, OrderItemStatusEnum newStatus);

    OrderResponse updateOrderStatusByBuyer(Long orderId, Long userId, OrderStatusEnum newStatus);

    OrderResponse findOrderById(Long orderId);

    PageResponse<?> getAllOrders(int pageNo, int pageSize);

    PageResponse<?> getAllOrdersForSeller(Long sellerId, int pageNo, int pageSize);

    PageResponse<?> orderHistory(Long userId, int pageNo, int pageSize);
}
