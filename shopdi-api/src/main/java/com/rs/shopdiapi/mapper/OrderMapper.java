package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.request.CreateOrderRequest;
import com.rs.shopdiapi.domain.dto.response.OrderResponse;
import com.rs.shopdiapi.domain.dto.response.ProductResponse;
import com.rs.shopdiapi.domain.entity.Order;
import com.rs.shopdiapi.domain.entity.OrderItem;
import com.rs.shopdiapi.domain.entity.Product;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface OrderMapper {
    //@Mapping(target = "billingAddress", source = "")
    @Mapping(target = "shippingAddress", source = "shippingAddress")
    @Mapping(target = "orderId", source = "id")
    @Mapping(target = "status", source = "orderStatus")
    @Mapping(target = "date", source = "createdAt")
    @Mapping(target = "total", source = "totalPrice")
    @Mapping(target = "productCount", expression = "java(order.getOrderItems() != null ? order.getOrderItems().size() : 0)")
 //   @Mapping(target = "products", expression = "java(order.getOrderItems().stream().map(item -> productMapper.toProductResponse(item.getProduct())).toList())")
    OrderResponse toOrderResponse(Order order);

    Order toOrder(CreateOrderRequest request);
}