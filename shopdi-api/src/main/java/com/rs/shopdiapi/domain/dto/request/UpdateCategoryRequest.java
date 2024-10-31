package com.rs.shopdiapi.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateCategoryRequest {
    @NotNull(message = "Category ID is required")
    Long id;

    @NotNull
    @Size(min = 1, message = "Category name cannot be empty")
    String name;

    Long parentId;
}
