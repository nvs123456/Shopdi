package com.rs.shopdiapi.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.rs.shopdiapi.domain.enums.ProductStatusEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Product extends BaseEntity<Long> {
    String productName;

    @Column(columnDefinition = "TEXT")
    String description;
    BigDecimal price;
    String brand;

    @Column(nullable = false)
    @Builder.Default
    int soldQuantity = 0;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    @JsonBackReference
    Seller seller;
    @Enumerated(EnumType.STRING)
    ProductStatusEnum status;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    Set<Variant> variants = new HashSet<>();

    @ElementCollection
    List<String> imageUrls = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Review> reviews = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    Category category;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "product_tag",
            joinColumns = @JoinColumn(name = "product_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "tag_id", nullable = false)
    )
    Set<Tag> tags = new HashSet<>();
    public void setVariants(Set<Variant> variants) {
        if(this.variants == null) {
            this.variants = new HashSet<>();
            this.variants.addAll(variants);
            return;
        }
        this.variants.clear();
        this.variants.addAll(variants);
    }
}