package cbse.EcoMap.web;

import cbse.EcoMap.model.Media;
import cbse.EcoMap.service.MediaService;
import cbse.EcoMap.exception.ErrorResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;

    @Autowired
    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping
    public ResponseEntity<?> createMedia(@RequestBody Media media) {
        try {
            Media createdMedia = mediaService.createMedia(media);
            return ResponseEntity.ok().body(createdMedia);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid data: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }

    @PostMapping("/batch")
    public ResponseEntity<?> createMediaBatch(@RequestBody List<Media> mediaList) {
        try {
            List<Media> createdMediaList = mediaService.createMediaBatch(mediaList);
            return ResponseEntity.ok().body(createdMediaList);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid data: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Media>> getAllMedia() {
        List<Media> mediaList = mediaService.getAllMedia();
        return ResponseEntity.ok().body(mediaList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMediaById(@PathVariable Long id) {
        try {
            Media media = mediaService.getMediaById(id);
            return ResponseEntity.ok().body(media);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid ID: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editMedia(@PathVariable Long id, @RequestBody Media media) {
        try {
            Media editedMedia = mediaService.editMedia(id, media);
            return ResponseEntity.ok().body(editedMedia);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid data: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedia(@PathVariable Long id) {
        try {
            mediaService.deleteMedia(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid ID: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }
}