package com.rs.shopdiapi.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Category extends BaseEntity<Long> {

    @Column(name = "name", nullable = false)
    String name;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    Category parent;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "categories")
    Set<Product> products;

    @OneToMany(mappedBy = "parent")
    Set<Category> childCategories;
}
