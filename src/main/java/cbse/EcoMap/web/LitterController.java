package cbse.EcoMap.web;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cbse.EcoMap.dto.LitterDto;
import cbse.EcoMap.exception.ErrorResponse;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.service.LitterService;

@RestController
@RequestMapping("/api/litter")
public class LitterController {

    private final LitterService litterService;

    @Autowired
    public LitterController(LitterService litterService) {
        this.litterService = litterService;
    }

    @PostMapping
    public ResponseEntity<?> createLitter(@RequestBody Litter litter) {
        try {
            Litter createdLitter = litterService.createLitter();
            return ResponseEntity.ok().body(createdLitter);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal Server Error"));
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<LitterDto>> getAllLittersWithMedia() {
        List<LitterDto> allLitters = litterService.getAllLittersWithMedia();
        return ResponseEntity.ok().body(allLitters);
    }

    @GetMapping("/{litterId}")
    public ResponseEntity<?> getLitterById(@PathVariable Long litterId) {
        try {
            Optional<Litter> litter = litterService.getLitterById(litterId);
            return ResponseEntity.ok().body(litter);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal Server Error"));
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Litter>> getAllLittersByUserId(@PathVariable Long userId) {
        List<Litter> litters = litterService.getAllLittersByUserId(userId);
        return ResponseEntity.ok().body(litters);
    }

    @PutMapping("/{litterId}")
    public ResponseEntity<?> updateLitter(@PathVariable Long litterId, @RequestBody Litter litter) {
        try {
            Litter updatedLitter = litterService.updateLitter(litterId, litter);
            return ResponseEntity.ok().body(updatedLitter);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal Server Error"));
        }
    }

    @DeleteMapping("/{litterId}")
    public ResponseEntity<?> deleteLitter(@PathVariable Long litterId) {
        try {
            litterService.deleteLitter(litterId);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal Server Error"));
        }
    }
}