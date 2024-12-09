package com.rs.shopdiapi.controller;


import com.rs.shopdiapi.domain.dto.request.TagRequest;
import com.rs.shopdiapi.domain.dto.response.ApiResponse;
import com.rs.shopdiapi.service.TagService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tags")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class TagController {
    @Autowired
    private TagService tagService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ApiResponse<?> createTag(@RequestBody TagRequest tagRequest) {
        return ApiResponse.builder()
                .result(tagService.createTag(tagRequest))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{tagId}")
    public ApiResponse<?> updateTag(@PathVariable Long tagId, @RequestBody TagRequest tagRequest) {
        return ApiResponse.builder()
                .result(tagService.updateTag(tagId, tagRequest))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{tagId}")
    public void deleteTag(@PathVariable Long tagId) {
        tagService.deleteTag(tagId);
    }

    @GetMapping
    public ApiResponse<?> getAllTags() {
        return ApiResponse.builder()
                .result(tagService.getAllTag())
                .build();
    }
}
