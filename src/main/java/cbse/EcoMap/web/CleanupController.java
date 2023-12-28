package cbse.EcoMap.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import cbse.EcoMap.exception.ErrorResponse;
import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.model.User;
import cbse.EcoMap.service.CleanupService;
import cbse.EcoMap.service.UserService;

@RestController
@RequestMapping("/api/cleanup")
public class CleanupController {
    private final CleanupService cleanupService;
    
    @Autowired
    public CleanupController(CleanupService cleanupService) {
        this.cleanupService = cleanupService;
    }

    @PostMapping("/create")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> createCleanup(@RequestBody Cleanup cleanup) {
        try {
            System.out.println("Received Cleanup data: " + cleanup.toString());
            Cleanup createdCleanup = cleanupService.createCleanup(cleanup);
            return ResponseEntity.ok().body(createdCleanup);
        } catch (IllegalArgumentException e) {
            System.err.println("IllegalArgumentException: " + e.getMessage());
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid data: " + e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace(); // Print the full exception stack trace
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }

    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Cleanup>> listCleanups() {
        List<Cleanup> cleanupList = cleanupService.getAllCleanups();
        return ResponseEntity.ok().body(cleanupList);
    }
    
    

}

