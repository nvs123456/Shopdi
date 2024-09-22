package com.rs.shopdiapi.mapper;

import com.rs.shopdiapi.dto.request.UserCreationRequest;
import com.rs.shopdiapi.dto.request.UserUpdateRequest;
import com.rs.shopdiapi.dto.response.UserResponse;
import com.rs.shopdiapi.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
