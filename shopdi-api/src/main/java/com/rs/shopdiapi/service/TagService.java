package com.rs.shopdiapi.service;

import com.rs.shopdiapi.domain.dto.request.TagRequest;
import com.rs.shopdiapi.domain.entity.Tag;

import java.util.List;

public interface TagService {
    Tag createTag(TagRequest request);

    Tag updateTag(Long tagId, TagRequest request);

    String deleteTag(Long tagId);

    List<Tag> getAllTag();
}
