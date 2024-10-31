package com.rs.shopdiapi.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Tag extends BaseEntity<Long> {
    @Column(nullable = false)
    String name;

    @Builder.Default
    @ManyToMany(mappedBy = "tags")
    List<Product> products = new ArrayList<>();

    public Tag(String name) {
        this.name = name;
    }
}
