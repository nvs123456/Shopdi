package com.rs.shopdiapi.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

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
    @JoinColumn(name = "user_id")
    @JsonIgnore
    User user;
}
