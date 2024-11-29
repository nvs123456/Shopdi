package com.rs.shopdiapi.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BuyNowRequest {
    @NotNull(message = "Variant is required")
    String variant;

    @NotNull(message = "Quantity is required")
    Integer quantity;

    @NotNull(message = "Address ID is required")
    Long addressId;

    String orderNotes;
}
