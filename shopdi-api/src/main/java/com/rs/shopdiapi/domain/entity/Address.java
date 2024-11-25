package com.rs.shopdiapi.domain.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Pattern;
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
public class Address extends BaseEntity<Long> {
    String firstName;
    String lastName;
    String companyName;
    String address;
    String country;
    String state;
    String city;
    String zipCode;
    String email;

    @Pattern(regexp = "(^0[3|5|7|8|9][0-9]{8}$)", message = "Enter valid 10 digit mobile number")
    String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @OneToMany(mappedBy = "shippingAddress", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Order> orders = new ArrayList<>();
}
