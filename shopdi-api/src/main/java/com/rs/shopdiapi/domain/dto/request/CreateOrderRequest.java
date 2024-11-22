package com.rs.shopdiapi.domain.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderRequest {
    Long addressId;
    List<Long> selectedCartItemIds;
    @Getter
    public static class ItemsOfSeller{
        Long sellerId;
        List<Long> selectedCartItemIdsOfSeller;
    }
}
