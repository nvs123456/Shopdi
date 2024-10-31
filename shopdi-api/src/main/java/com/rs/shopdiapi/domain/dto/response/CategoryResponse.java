package com.rs.shopdiapi.domain.dto.response;

import com.rs.shopdiapi.domain.entity.Category;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    Long id;
    String name;
    Long parentId;
    String parentName;
    List<ChildCategoryResponse> childCategories;
}
