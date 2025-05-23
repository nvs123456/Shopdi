package com.rs.shopdiapi.domain.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PageResponse<T> {
    int pageNo;
    int pageSize;
    int totalPages;
    T items;
}
