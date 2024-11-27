package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.domain.dto.request.CreateUserRequest;
import com.rs.shopdiapi.domain.dto.request.UpdateUserRequest;
import com.rs.shopdiapi.domain.dto.response.UserResponse;
import com.rs.shopdiapi.domain.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(CreateUserRequest request);

    UserResponse toUserResponse(User user);

    void updateUser(@MappingTarget User user, UpdateUserRequest request);
}
