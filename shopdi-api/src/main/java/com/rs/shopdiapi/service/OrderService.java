package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.BuyNowRequest;
import com.rs.shopdiapi.domain.dto.request.CreateOrderRequest;
import com.rs.shopdiapi.domain.dto.response.OrderResponse;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.enums.OrderStatusEnum;

public interface OrderService {

    String createOrder(Long userId, CreateOrderRequest request);

    String buyNow(Long userId, Long productId, BuyNowRequest request);

    OrderResponse updateOrderStatusBySeller(Long orderId, Long sellerId, OrderStatusEnum newStatus);

    OrderResponse updateOrderStatusByBuyer(Long orderId, Long userId, OrderStatusEnum newStatus);

    OrderResponse findOrderById(Long orderId);

    PageResponse<?> getAllOrders(int pageNo, int pageSize);

    PageResponse<?> getAllOrdersForSeller(Long sellerId, int pageNo, int pageSize, String sortBy, String sortOrder);

    PageResponse<?> orderHistory(Long userId, int pageNo, int pageSize, String sortBy, String sortOrder);
}
