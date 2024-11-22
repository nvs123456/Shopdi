package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.CreateOrderRequest;
import com.rs.shopdiapi.domain.dto.response.OrderResponse;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.CartItem;
import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.entity.OrderItem;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.domain.enums.OrderItemStatusEnum;
import com.rs.shopdiapi.domain.enums.OrderStatusEnum;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.OrderMapper;
import com.rs.shopdiapi.repository.AddressRepository;
import com.rs.shopdiapi.repository.CartRepository;
import com.rs.shopdiapi.repository.OrderItemRepository;
import com.rs.shopdiapi.repository.OrderRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.service.CartItemService;
import com.rs.shopdiapi.service.CartService;
import com.rs.shopdiapi.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OrderServiceImpl implements OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;
    CartService cartService;
    AddressRepository addressRepository;
    UserRepository userRepository;
    CartItemService cartItemService;
    OrderItemRepository orderItemRepository;
    CartRepository cartRepository;

    @Transactional
    @Override
    public OrderResponse createOrder(Long userId, CreateOrderRequest request) {
        var cart = cartRepository.findByUserId(userId);

        if (cart.getCartItems().isEmpty()) {
            throw new AppException(ErrorCode.CART_EMPTY);
        }
        
        List<CartItem> selectedItems = cart.getCartItems().stream()
                .filter(cartItem -> request.getSelectedCartItemIds().contains(cartItem.getId()))
                .toList();

        if (selectedItems.isEmpty()) {
            throw new AppException(ErrorCode.NO_ITEMS_SELECTED);
        }

        BigDecimal totalPrice = selectedItems.stream()
                .map(item -> item.getDiscountedPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalDiscountedPrice = selectedItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Address shippingAddress = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));

        Order order = Order.builder()
                .user(userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)))
                .totalPrice(totalPrice)
                .totalDiscountedPrice(totalDiscountedPrice)
                .shippingAddress(shippingAddress)
                .build();

        selectedItems.forEach(cartItem -> {
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(cartItem.getProduct())
                    .seller(cartItem.getProduct().getSeller())
                    .variant(cartItem.getVariant())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getPrice())
                    .discountPercent(cartItem.getDiscountPercent())
                    .discountedPrice(cartItem.getDiscountedPrice())
                    .build();
            order.getOrderItems().add(orderItem);
        });

        Order savedOrder = orderRepository.save(order);

        // selectedItems.forEach(cartItem -> cartItemService.deleteCartItem(userId, cartItem.getId()));
        // cartRepository.save(cart);

        return orderMapper.toOrderResponse(savedOrder);
    }


    @Transactional
    @Override
    public OrderResponse updateOrderStatus(Long orderId, String orderStatus) {
        var order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        try {
            OrderStatusEnum newStatus = OrderStatusEnum.valueOf(orderStatus.toUpperCase());
            order.setOrderStatus(newStatus);
            return orderMapper.toOrderResponse(orderRepository.save(order));
        } catch (IllegalArgumentException e) {
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS);
        }
    }

    @Override
    public OrderResponse confirmOrder(Long orderId, Long orderItemId, Long sellerId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        OrderItem orderItem = order.getOrderItems().stream()
                .filter(item -> item.getId().equals(orderItemId))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        if (!orderItem.getSeller().getId().equals(sellerId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        orderItem.setOrderItemStatus(OrderItemStatusEnum.CONFIRMED);

        boolean allItemsConfirmed = order.getOrderItems().stream()
                .allMatch(item -> item.getSeller().getId().equals(sellerId) || item.getOrderItemStatus() == OrderItemStatusEnum.CONFIRMED);

        if (allItemsConfirmed) {
            order.setOrderStatus(OrderStatusEnum.PROCESSING);
        }

        orderRepository.save(order);
        return orderMapper.toOrderResponse(orderRepository.save(order));
    }

    @Override
    public OrderResponse findOrderById(Long orderId) {
        var order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return orderMapper.toOrderResponse(order);
    }

    @Transactional
    @Override
    public Order cancelOrder(Long orderId) {
        var order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        if (order.getOrderStatus() == OrderStatusEnum.PENDING || order.getOrderStatus() == OrderStatusEnum.PROCESSING) {
            order.setOrderStatus(OrderStatusEnum.CANCELLED);
            return orderRepository.save(order);
        }

        throw new AppException(ErrorCode.ORDER_CANNOT_BE_CANCELLED);
    }

    @Override
    public PageResponse<?> getAllOrders(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("createdAt").descending());
        Page<Order> ordersPage = orderRepository.findAllExcludingStatus(OrderStatusEnum.PENDING, pageable);
        List<OrderResponse> orderResponses = ordersPage.stream()
                .map(orderMapper::toOrderResponse)
                .toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(ordersPage.getTotalPages())
                .items(orderResponses)
                .build();
    }

    @Override
    public PageResponse<?> getAllOrdersForSeller(Long sellerId, int pageNo, int pageSize) {
        Sort sort = Sort.by(Sort.Order.asc("orderStatus"), Sort.Order.desc("createdAt"));
        Page<Order> ordersPage = orderRepository.findAllBySellerId(sellerId, PageRequest.of(pageNo, pageSize, sort));

        List<OrderResponse> orderResponses = ordersPage.stream()
                .map(orderMapper::toOrderResponse)
                .toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(ordersPage.getTotalPages())
                .items(orderResponses)
                .build();
    }


    @Override
    public PageResponse<?> orderHistory(Long userId, int pageNo, int pageSize) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Page<Order> ordersPage = orderRepository.findAllByUserId(userId, PageRequest.of(pageNo, pageSize, sort));

        List<OrderResponse> orderResponses = ordersPage.stream()
                .map(orderMapper::toOrderResponse)
                .toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(ordersPage.getTotalPages())
                .items(orderResponses)
                .build();
    }


}
