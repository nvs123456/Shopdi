package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.entity.Category;
import com.rs.shopdiapi.repository.CategoryRepository;
import com.rs.shopdiapi.service.CategoryService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;

    @PreAuthorize("hasRole('USER')")
    @Transactional
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PreAuthorize("hasRole('USER')")
    @Transactional
    @Override
    public Optional<Category> getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @Override
    public Category createCategory(String name) {
        return categoryRepository.save(
                Category.builder()
                .name(name)
                .build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @Override
    public void updateCategory(Category category, String name) {
        category.setName(name);
        categoryRepository.save(category);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @Override
    public void deleteCategory(Category category) {
        categoryRepository.delete(category);
    }


    @PreAuthorize("hasRole('USER')")
    @Transactional
    @Override
    public boolean isChildCategory(Category parent, Category category) {
        return category.getParent().equals(parent);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @Override
    public void addChildCategory(Category parent, Category child) {
        child.setParent(parent);
        categoryRepository.save(child);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @Override
    public void removeChildCategory(Category parent, Category child) {
        child.setParent(null);
        categoryRepository.save(child);
    }
}
