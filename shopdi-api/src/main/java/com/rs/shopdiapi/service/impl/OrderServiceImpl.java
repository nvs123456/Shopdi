package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.response.OrderResponse;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.AddressRepository;
import com.rs.shopdiapi.repository.OrderItemRepository;
import com.rs.shopdiapi.repository.OrderRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.CartService;
import com.rs.shopdiapi.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OrderServiceImpl implements OrderService {
    OrderRepository orderRepository;
    CartService cartService;
    AddressRepository addressRepository;
    UserRepository userRepository;
    OrderItemRepository orderItemRepository;

    @Override
    public Order createOrder(User user, Address shippingAddress) {
        return null;
    }

    @Override
    public Order findOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
    }

    @Override
    public Order placedOrder(Long orderId) {
        return null;
    }

    @Override
    public Order confirmedOrder(Long orderId) {
        return null;
    }

    @Override
    public Order shippedOrder(Long orderId) {
        return null;
    }

    @Override
    public Order deliveredOrder(Long orderId) {
        return null;
    }

    @Override
    public Order cancelOrder(Long orderId) {
        return null;
    }

    @Override
    public List<Order> getAllOrders() {
        return List.of();
    }


    @Override
    public PageResponse<?> orderHistory(Long userId, int page, int size) {
        Page<Order> ordersPage = orderRepository.findAllByUserId(userId, PageRequest.of(page, size));

        return null;
    }

    @Override
    public void deleteOrder(Long orderId) {

    }

    @Override
    public Order updateOrder(Order order, Long orderId) {
        return null;
    }

//    public OrderResponse checkoutOrder(CheckoutRequest request, User user) {
//        Address shippingAddress;
//
//        if (request.isUseDefaultShippingAddress()) {
//            shippingAddress = user.getShippingAddress();
//        } else {
//            Address newAddress = addressRepository.save(request.getNewShippingAddress());
//            shippingAddress = newAddress;
//        }
//
//        // Tạo đơn hàng với địa chỉ giao hàng đã xác định
//        Order order = new Order();
//        order.setShippingAddress(shippingAddress);
//        order.setUser(user);
//        // Các xử lý tiếp theo của đơn hàng
//        orderRepository.save(order);
//
//        return new OrderResponse(order);
//    }
}
