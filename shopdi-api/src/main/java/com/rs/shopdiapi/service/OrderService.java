package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.CreateOrderRequest;
import com.rs.shopdiapi.domain.dto.response.OrderResponse;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.entity.User;

import java.math.BigDecimal;
import java.util.List;

public interface OrderService {

    String createOrder(Long userId, CreateOrderRequest request);

    OrderResponse updateOrderStatus(Long orderId, String orderStatus);

    OrderResponse confirmOrder(Long orderId, Long orderItemId, Long sellerId);

    OrderResponse findOrderById(Long orderId);

    String cancelOrder(Long orderId);

    PageResponse<?> getAllOrders(int pageNo, int pageSize);

    PageResponse<?> getAllOrdersForSeller(Long sellerId, int pageNo, int pageSize);

    PageResponse<?> orderHistory(Long userId, int pageNo, int pageSize);
}
