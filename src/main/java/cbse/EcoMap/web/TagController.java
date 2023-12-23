package cbse.EcoMap.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cbse.EcoMap.dto.TagDto;
import cbse.EcoMap.service.TagService;

@RestController
@RequestMapping("/api/tag")
public class TagController {
	
    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TagDto>> getAllTags() {
        List<TagDto> allTags = tagService.getAllTags();
        return ResponseEntity.ok().body(allTags);
    }
}