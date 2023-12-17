package cbse.EcoMap.controller;

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
}