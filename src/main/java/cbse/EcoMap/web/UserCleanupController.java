package cbse.EcoMap.web;

import java.util.HashMap;
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

import cbse.EcoMap.exception.ErrorResponse;
import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.model.User;
import cbse.EcoMap.model.UserCleanup;
import cbse.EcoMap.service.CleanupService;
import cbse.EcoMap.service.UserCleanupService;
import cbse.EcoMap.service.UserService;

@RestController
@RequestMapping("/api/usercleanup")
public class UserCleanupController {
	private final CleanupService cleanupService;
	private final UserService userService;
	private final UserCleanupService userCleanupService;

	@Autowired
	public UserCleanupController(CleanupService cleanupService, UserService userService,
			UserCleanupService userCleanupService) {
		this.cleanupService = cleanupService;
		this.userService = userService;
		this.userCleanupService = userCleanupService;
	}

	@GetMapping("/find")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> findUserAndCleanup(@RequestParam Long userId, @RequestParam Long cleanupId) {
		try {
			//System.out.println("Searching for User with ID: " + userId);
			//User user = userService.createDummyUser();
//			
			System.out.println("Searching for Cleanup with ID: " + cleanupId);
			Cleanup cleanup = cleanupService.findCleanupById(cleanupId);
			
			//System.out.println("Searching for User with ID: " + userId);
			//User user = userService.findCleanupById(userId);
			
			// Optionally, you can return the user and cleanup objects as a response
			Map<String, Object> result = new HashMap<>();
			result.put("cleanup", cleanup);
			//result.put("user", user);

			System.out.println("Search successful. Result: " + result);
			
			UserCleanup UC = new UserCleanup();
			UC.setCleanup(cleanup);
			//UC.setUser(userId);
			UserCleanup createdUserCleanup = userCleanupService.createUserCleanup(UC);
			

			return ResponseEntity.ok().body(result);
		} catch (Exception e) {
			// Handle errors and return an appropriate response
			System.err.println("Error during search: " + e.getMessage());
			e.printStackTrace(); // Print the full exception stack trace
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ErrorResponse("Internal Server Error"));
		}
	}
//    @PostMapping("/create")
//    @CrossOrigin(origins = "http://localhost:4200")
//    public ResponseEntity<?> createUserCleanup(@RequestBody UserCleanup userCleanup) {
//        try {
//            System.out.println("Received UserCleanup data: " + userCleanup.toString());
//            UserCleanup createdUserCleanup = userCleanupService.createUserCleanup(userCleanup);
//            return ResponseEntity.ok().body(createdUserCleanup);
//        } catch (IllegalArgumentException e) {
//            System.err.println("IllegalArgumentException: " + e.getMessage());
//            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid data: " + e.getMessage()));
//        } catch (Exception e) {
//            e.printStackTrace(); // Print the full exception stack trace
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
//        }
//    }

}
