package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAllCategories();

    Optional<Category> getCategoryById(Long categoryId);

    Category createCategory(String name);

    void updateCategory(Category category, String name);

    void deleteCategory(Category category);

    boolean isChildCategory(Category parent, Category category);

    void addChildCategory(Category parent, Category child);

    void removeChildCategory(Category parent, Category child);
}
