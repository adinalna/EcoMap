package cbse.EcoMap.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cbse.EcoMap.dto.TagDto;
import cbse.EcoMap.model.Tag;
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
        List<TagDto> allTags = tagService.findtAllTags();
        return ResponseEntity.ok().body(allTags);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TagDto>> getTagsByUserId(@PathVariable Long userId) {
        List<TagDto> allTags = tagService.findTagsByUserId(userId);
        return ResponseEntity.ok().body(allTags);
    }
    
    @GetMapping("/unused/{litterId}")
    public ResponseEntity<List<TagDto>> getUnusedTagsByLitterId(@PathVariable Long litterId) {
        List<TagDto> unusedTags = tagService.findUnusedTagsByLitterId(litterId);
        return ResponseEntity.ok(unusedTags);
    }
    
    @GetMapping("/mostUsed")
    public Tag getMostUsedTag() {
        return tagService.findMostUsedTag();
    }

    @GetMapping("/mostUsedLastWeek")
    public Tag getMostUsedTagLastWeek() {
        return tagService.findMostUsedTagLastWeek();
    }

    @GetMapping("/mostUsedLastMonth")
    public Tag getMostUsedTagLastMonth() {
        return tagService.findMostUsedTagLastMonth();
    }

    @GetMapping("/mostUsedLastYear")
    public Tag getMostUsedTagLastYear() {
        return tagService.findMostUsedTagLastYear();
    }

    @GetMapping("/mostUsedAll")
    public Map<String, Tag> getMostUsedTagsAll() {
        return tagService.findMostUsedTagsAll();
    }
}