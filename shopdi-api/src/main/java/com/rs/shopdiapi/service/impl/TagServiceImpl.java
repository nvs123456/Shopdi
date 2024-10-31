package com.rs.shopdiapi.service.impl;

import com.rs.shopdiapi.domain.dto.request.TagRequest;
import com.rs.shopdiapi.domain.entity.Product;
import com.rs.shopdiapi.domain.entity.Tag;
import com.rs.shopdiapi.domain.enums.ErrorCode;
import com.rs.shopdiapi.exception.AppException;
import com.rs.shopdiapi.repository.TagRepository;
import com.rs.shopdiapi.service.TagService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepository tagRepository;

    @Transactional
    public Tag createTag(TagRequest request) {
        if (tagRepository.existsByName(request.getTagName())) {
            throw new AppException(ErrorCode.TAG_ALREADY_EXISTS);
        }

        Tag newTag = Tag.builder()
                .name(request.getTagName())
                .products(List.of())
                .build();
        return tagRepository.save(newTag);
    }

    @Transactional
    public Tag updateTag(Long tagId, TagRequest request) {
        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new AppException(ErrorCode.TAG_NOT_FOUND));
        tag.setName(request.getTagName());
        return tagRepository.save(tag);
    }

    @Transactional
    public String deleteTag(Long tagId) {
        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new AppException(ErrorCode.TAG_NOT_FOUND));
        tagRepository.delete(tag);
        return "Tag deleted successfully";
    }

    @Override
    public List<Tag> getAllTag() {
        return tagRepository.findAll();
    }
}
