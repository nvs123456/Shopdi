package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.entity.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, Address shippingAddress);

    void deleteOrder(Long orderId);

    Order updateOrder(Order order, Long orderId);

    Order findOrderById(Long orderId);

    Order placedOrder(Long orderId);

    Order confirmedOrder(Long orderId);

    Order shippedOrder(Long orderId);

    Order deliveredOrder(Long orderId);

    Order cancelOrder(Long orderId);

    List<Order> getAllOrders();


    PageResponse<?> orderHistory(Long userId, int page, int size);
}
