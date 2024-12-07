package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.BuyNowRequest;
import com.rs.shopdiapi.domain.dto.request.CreateOrderRequest;
import com.rs.shopdiapi.domain.dto.response.AddressResponse;
import com.rs.shopdiapi.domain.dto.response.OrderItemResponse;
import com.rs.shopdiapi.domain.dto.response.OrderResponse;
import com.rs.shopdiapi.domain.dto.response.PageResponse;
import com.rs.shopdiapi.domain.dto.response.SimpleOrderResponse;
import com.rs.shopdiapi.domain.entity.Address;
import com.rs.shopdiapi.domain.entity.Cart;
import com.rs.shopdiapi.domain.entity.CartItem;
import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.entity.OrderItem;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.User;
import com.rs.shopdiapi.domain.entity.Variant;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.domain.enums.OrderStatusEnum;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.mapper.OrderMapper;
import com.rs.shopdiapi.repository.AddressRepository;
import com.rs.shopdiapi.repository.CartRepository;
import com.rs.shopdiapi.repository.OrderItemRepository;
import com.rs.shopdiapi.repository.OrderRepository;
import com.rs.shopdiapi.repository.ProductRepository;
import com.rs.shopdiapi.repository.UserRepository;
import com.rs.shopdiapi.repository.VariantRepository;
import com.rs.shopdiapi.service.CartService;
import com.rs.shopdiapi.service.OrderService;
import com.rs.shopdiapi.service.RevenueService;
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
import java.util.Map;
import java.util.Objects;
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
    ProductRepository productRepository;
    OrderItemRepository orderItemRepository;
    CartRepository cartRepository;
    VariantRepository variantRepository;
    RevenueService revenueService;

    @Transactional
    @Override
    public String createOrder(Long userId, CreateOrderRequest request) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart.getCartItems().isEmpty()) {
            throw new AppException(ErrorCode.CART_EMPTY);
        }

        List<CartItem> selectedItems = cart.getCartItems().stream()
                .filter(item -> request.getSelectedCartItemIds().contains(item.getId()))
                .toList();

        if (request.getSelectedCartItemIds().isEmpty() || selectedItems.isEmpty()) {
            throw new AppException(ErrorCode.NO_ITEMS_SELECTED);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Address shippingAddress = user.getAddresses().stream()
                .filter(address -> address.getId().equals(request.getAddressId()))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));

        Map<Long, List<CartItem>> itemsBySeller = selectedItems.stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));

        itemsBySeller.forEach((sellerId, cartItems) -> {
            BigDecimal totalPrice = calculateTotalPrice(cartItems);

            Order order = Order.builder()
                    .user(user)
                    .shippingAddress(shippingAddress)
                    .totalPrice(totalPrice)
                    .orderStatus(OrderStatusEnum.PENDING)
                    .orderItems(new ArrayList<>())
                    .orderNotes(request.getOrderNotes())
                    .build();

            cartItems.forEach(cartItem -> {
                Variant selectedVariant = cartItem.getProduct().getVariants().stream()
                        .filter(variant -> {
                            if (cartItem.getVariant() == null || cartItem.getVariant().equals("[]")) {
                                return variant.getVariantDetail() == null;
                            }
                            return cartItem.getVariant().equals(variant.getVariantDetail());
                        })
                        .findFirst()
                        .orElseThrow(() -> new AppException(ErrorCode.VARIANT_NOT_FOUND));

                if (selectedVariant.getQuantity() < cartItem.getQuantity()) {
                    throw new AppException(ErrorCode.NOT_ENOUGH_STOCK);
                }
                selectedVariant.decreaseQuantity(cartItem.getQuantity());

                OrderItem orderItem = OrderItem.builder()
                        .order(order)
                        .product(cartItem.getProduct())
                        .seller(cartItem.getProduct().getSeller())
                        .variant(cartItem.getVariant())
                        .quantity(cartItem.getQuantity())
                        .price(cartItem.getPrice())
                        .build();

                order.getOrderItems().add(orderItem);
                variantRepository.save(selectedVariant);
            });

            orderRepository.save(order);
        });

        selectedItems.forEach(cartItem -> cart.getCartItems().remove(cartItem));
        cartService.updateCartSummary(cart.getId());

        return "Order created successfully for all sellers.";
    }

    @Override
    @Transactional
    public String buyNow(Long userId, Long productId, BuyNowRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        Variant selectedVariant = product.getVariants().stream()
                .filter(v -> v.getVariantDetail() == null || v.getVariantDetail().equals(request.getVariant()))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.VARIANT_NOT_FOUND));

        if (selectedVariant.getQuantity() < request.getQuantity()) {
            throw new AppException(ErrorCode.NOT_ENOUGH_STOCK);
        }

        selectedVariant.setQuantity(selectedVariant.getQuantity() - request.getQuantity());

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        OrderItem orderItem = OrderItem.builder()
                .product(product)
                .variant(request.getVariant())
                .quantity(request.getQuantity())
                .price(product.getPrice())
                .seller(product.getSeller())
                .build();

        BigDecimal totalPrice = product.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));

        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));

        Order order = Order.builder()
                .user(user)
                .shippingAddress(address)
                .totalPrice(totalPrice)
                .orderStatus(OrderStatusEnum.PENDING)
                .orderNotes(request.getOrderNotes())
                .orderItems(List.of(orderItem))
                .build();

        orderRepository.save(order);
        orderItem.setOrder(order);
        orderItemRepository.save(orderItem);
        variantRepository.save(selectedVariant);

        return "Order created successfully";
    }


    private BigDecimal calculateTotalPrice(List<CartItem> items) {
        return items.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }


    @Transactional
    @Override
    public OrderResponse updateOrderStatusBySeller(Long orderId, Long sellerId, OrderStatusEnum newStatus) {
        var order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        List<OrderItem> sellerOrderItems = order.getOrderItems().stream()
                .filter(orderItem -> orderItem.getSeller().getId().equals(sellerId))
                .toList();

        if (sellerOrderItems.isEmpty()) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        order.setOrderStatus(newStatus);
        orderRepository.save(order);

        return mapToOrderResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatusByBuyer(Long orderId, Long userId, OrderStatusEnum newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        if (!order.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        List<OrderItem> orderItems = order.getOrderItems();

        OrderStatusEnum currentStatus = order.getOrderStatus();
        if (newStatus.ordinal() < currentStatus.ordinal()) {
            throw new AppException(ErrorCode.INVALID_ORDER_STATUS);
        }

        if (newStatus.equals(OrderStatusEnum.CANCELLED)) {
            if (order.getOrderStatus() == OrderStatusEnum.PENDING
                    || order.getOrderStatus() == OrderStatusEnum.PROCESSING) {
                order.setOrderStatus(OrderStatusEnum.CANCELLED);
                return mapToOrderResponse(orderRepository.save(order));
            } else {
                throw new AppException(ErrorCode.ORDER_CANNOT_BE_CANCELLED);
            }
        }
        if (newStatus == OrderStatusEnum.DELIVERED) {
            orderItems.forEach(orderItem -> {
                BigDecimal itemRevenue = orderItem.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity()));
                revenueService.updateRevenue(orderItem.getSeller().getId(), itemRevenue);

                Product product = orderItem.getProduct();
                product.setSoldQuantity(product.getSoldQuantity() + orderItem.getQuantity());
                productRepository.save(product);
            });
        }
        order.setOrderStatus(newStatus);
        orderRepository.save(order);

        return mapToOrderResponse(order);
    }


    @Override
    public OrderResponse findOrderById(Long orderId) {
        var order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        return this.mapToOrderResponse(order);
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
    public PageResponse<?> getAllOrdersForSeller(Long sellerId, int pageNo, int pageSize, String sortBy,
            String sortOrder) {
        Sort sort = Sort.by(
                Sort.Order.asc("orderStatus"),
                sortOrder.equalsIgnoreCase("asc") ? Sort.Order.asc(sortBy) : Sort.Order.desc(sortBy));
        Page<Order> ordersPage = orderRepository.findOrdersBySellerId(sellerId, PageRequest.of(pageNo, pageSize, sort));

        List<OrderResponse> orderResponses = ordersPage.stream()
                .map(order -> {
                    List<OrderItemResponse> sellerOrderItems = order.getOrderItems().stream()
                            .filter(item -> Objects.equals(item.getSeller().getId(), sellerId))
                            .map(this::mapToOrderItemResponse)
                            .toList();
                    if (sellerOrderItems.isEmpty()) {
                        return null;
                    }

                    OrderResponse orderResponse = this.mapToOrderResponse(order);
                    orderResponse.setOrderItems(sellerOrderItems);
                    return orderResponse;
                })
                .filter(Objects::nonNull)
                .toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(ordersPage.getTotalPages())
                .items(orderResponses)
                .build();
    }


    @Override
    public PageResponse<?> orderHistory(Long userId, int pageNo, int pageSize, String sortBy, String sortOrder) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(sortOrder).orElse(Sort.Direction.DESC);

        Sort sort = Sort.by(direction, sortBy);
        Page<Order> ordersPage = orderRepository.findAllByUserId(userId, PageRequest.of(pageNo, pageSize, sort));

        List<SimpleOrderResponse> orderResponses = ordersPage.getContent().stream()
                .map(this::mapToSimpleOrderResponse)
                .toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(ordersPage.getTotalPages())
                .items(orderResponses)
                .build();
    }

    @Override
    public PageResponse<?> getOrdersByStatusForSeller(Long sellerId, OrderStatusEnum orderStatus, int pageNo,
            int pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Page<Order> ordersPage = orderRepository.findAllBySellerIdAndOrderStatus(sellerId, orderStatus,
                PageRequest.of(pageNo, pageSize, sort));

        List<OrderResponse> orderResponses = ordersPage.stream()
                .map(this::mapToOrderResponse)
                .toList();
        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .items(orderResponses)
                .build();
    }

    public OrderResponse mapToOrderResponse(Order order) {
        return OrderResponse.builder()
                .orderId(order.getId())
                .totalPrice(order.getTotalPrice())
                .orderStatus(order.getOrderStatus().name())
                .deliveryDate(order.getCreatedAt())
                .shippingAddress(this.mapToAddressResponse(order.getShippingAddress()))
                .orderItems(order.getOrderItems().stream()
                        .map(this::mapToOrderItemResponse)
                        .toList())
                .orderNotes(order.getOrderNotes())
                .build();
    }

    private AddressResponse mapToAddressResponse(Address address) {
        if (address == null)
            return null;
        return AddressResponse.builder()
                .addressId(address.getId())
                .firstName(address.getFirstName())
                .lastName(address.getLastName())
                .address(address.getAddress())
                .city(address.getCity())
                .state(address.getState())
                .country(address.getCountry())
                .phoneNumber(address.getPhoneNumber())
                .email(address.getEmail())
                .build();
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .orderItemId(orderItem.getId())
                .productId(orderItem.getProduct().getId())
                .productImage(orderItem.getProduct().getImageUrls() != null
                        && !orderItem.getProduct().getImageUrls().isEmpty()
                                ? orderItem.getProduct().getImageUrls().get(0)
                                : null)
                .productName(orderItem.getProduct().getProductName())
                .variant(orderItem.getVariant())
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .build();
    }

    private SimpleOrderResponse mapToSimpleOrderResponse(Order order) {
        return SimpleOrderResponse.builder()
                .orderId(order.getId())
                .orderStatus(order.getOrderStatus().name())
                .deliveryDate(String.valueOf(order.getCreatedAt()))
                .totalPrice(order.getTotalPrice())
                .totalItems(order.getOrderItems().stream().mapToInt(OrderItem::getQuantity).sum())
                .build();
    }
}
