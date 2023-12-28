package cbse.EcoMap.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cbse.EcoMap.exception.ErrorResponse;
import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.service.CleanupService;


@RestController
@RequestMapping("/api/cleanup")
public class CleanupController {
	private final CleanupService cleanupService;

    @Autowired
    public CleanupController(CleanupService cleanupService) {
        this.cleanupService = cleanupService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createMedia(@RequestBody Cleanup cleanup) {
        try {
        	Cleanup createdCleanup = cleanupService.createCleanup(cleanup);
            return ResponseEntity.ok().body(createdCleanup);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid data: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }
}
