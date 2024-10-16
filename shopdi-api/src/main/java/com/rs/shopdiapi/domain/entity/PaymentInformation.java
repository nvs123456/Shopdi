package com.rs.shopdiapi.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
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
@Embeddable
public class PaymentInformation {
    @Column(name = "cardholder_name")
    String cardholderName;

    @Column(name = "card_number")
    String cardNumber;

    @Column(name = "expiry_date")
    String expiryDate;

    String cvv;
}
