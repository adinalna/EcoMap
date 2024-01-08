package cbse.EcoMap.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cbse.EcoMap.dto.LitterTagDto;
import cbse.EcoMap.dto.TagDto;
import cbse.EcoMap.exception.ErrorResponse;
import cbse.EcoMap.model.LitterTag;
import cbse.EcoMap.model.Media;
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
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<TagDto>> getAllTags() {
        List<TagDto> allTags = tagService.findtAllTags();
        return ResponseEntity.ok().body(allTags);
    }
    @GetMapping("/litterType/all")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<LitterTagDto>> getAllLitterTags() {
        List<LitterTagDto> allLitterTags = tagService.findAllLitterTags();
        return ResponseEntity.ok().body(allLitterTags);
    }
    
    @GetMapping("/user/{userId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<TagDto>> getTagsByUserId(@PathVariable Long userId) {
        List<TagDto> allTags = tagService.findTagsByUserId(userId);
        return ResponseEntity.ok().body(allTags);
    }
    
    @GetMapping("/unused/{litterId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<TagDto>> getUnusedTagsByLitterId(@PathVariable Long litterId) {
        List<TagDto> unusedTags = tagService.findUnusedTagsByLitterId(litterId);
        return ResponseEntity.ok(unusedTags);
    }
    
    @PostMapping("/batch")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> createTagBatch(@RequestParam Long userId, @RequestBody List<LitterTag> litterTagList) {
        try {
            List<LitterTag> newLitterTags = tagService.createMediaBatch(litterTagList);
            return ResponseEntity.status(HttpStatus.CREATED).body(newLitterTags);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid data: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }
    
    @PostMapping("/count/update/batch")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> editTagCountBatch(@RequestBody List<LitterTagDto> litterTagList) {
        try {
            List<LitterTagDto> updatedLitterTagDtos = tagService.updateTagCountBatch(litterTagList);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedLitterTagDtos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid data: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }
    
    @PostMapping("/delete/batch")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> deleteTagBatch(@RequestBody List<Long> tagIds) {
        try {
            tagService.deleteTagBatch(tagIds);
            return ResponseEntity.status(HttpStatus.OK).body("Tags successfully deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(new ErrorResponse("Error deleting tags: " + e.getMessage()));
        }
    }
    
    @PostMapping("/litter-tag/create/batch/{litterId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> createLitterTags(@PathVariable Long litterId, @RequestBody List<TagDto> tagDtos) {
        try {
            List<LitterTagDto> createdLitterTags = tagService.createLitterTags(litterId, tagDtos);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdLitterTags);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid data: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Internal Server Error: " + e.getMessage());
        }
    }

    @GetMapping("/trending/ever")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<TagDto> getMostUsedTag() {
        return tagService.findMostUsedTag();
    }

    @GetMapping("/trending/week")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<TagDto> getMostUsedTagLastWeek() {
        return tagService.findMostUsedTagLastWeek();
    }

    @GetMapping("/trending/month")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<TagDto> getMostUsedTagLastMonth() {
        return tagService.findMostUsedTagLastMonth();
    }

    @GetMapping("/trending/year")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<TagDto> getMostUsedTagLastYear() {
        return tagService.findMostUsedTagLastYear();
    }

    @GetMapping("/trending/all")
    @CrossOrigin(origins = "http://localhost:4200")
    public Map<String, List<TagDto>> getMostUsedTagsAll() {
        return tagService.findMostUsedTagsAll();
    }
}