package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.request.CreateCategoryRequest;
import com.rs.shopdiapi.domain.dto.response.CategoryResponse;
import com.rs.shopdiapi.domain.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CreateCategoryRequest request);

    CategoryResponse toCategoryResponse(Category category);
}
