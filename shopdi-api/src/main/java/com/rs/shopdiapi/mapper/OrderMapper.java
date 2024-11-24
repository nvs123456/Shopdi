package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.request.CreateOrderRequest;
import com.rs.shopdiapi.domain.dto.response.OrderResponse;
import com.rs.shopdiapi.domain.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderResponse toOrderResponse(Order order);

    Order toOrder(CreateOrderRequest request);

//    void updateOrder(@MappingTarget Order order, OrderRequest orderRequest);
}
