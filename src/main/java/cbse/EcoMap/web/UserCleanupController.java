package cbse.EcoMap.web;

import cbse.EcoMap.repository.CleanupRepository;
import cbse.EcoMap.repository.UserRepository;

import java.time.Instant;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
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
    private UserRepository userRepository; // Add this field

	@Autowired
	public UserCleanupController(CleanupService cleanupService, UserService userService,
			UserCleanupService userCleanupService, UserRepository userRepository) {
		this.cleanupService = cleanupService;
		this.userService = userService;
		this.userCleanupService = userCleanupService;
		this.userRepository = userRepository;
	}

	@GetMapping("/find")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> findUserAndCleanup(@RequestParam Long userId, @RequestParam Long cleanupId) {
		try {
			List<User> userList = userService.getAllUsers();

	        // Find the user with the specified ID
	        User foundUser = null;
	        for (User user : userList) {
	            if (user.getId().equals(userId)) {
	                foundUser = user;
	                break;
	            }
	        }
	        
			Cleanup cleanup = cleanupService.findCleanupById(cleanupId);
			Map<String, Object> result = new HashMap<>();
			result.put("cleanup", cleanup);
			result.put("user", foundUser);
			
	
			UserCleanup userCleanup = UserCleanup.builder()
	                .cleanup(cleanup)
	                .user(foundUser)
	                .role("Member") // Set the role accordingly
	                .date_created(Instant.now())
	                .build();
//				
			 
			 UserCleanup createdUserCleanup = userCleanupService.createUserCleanup(userCleanup);
//			 
			 
//			 User user = userRepository.findById(userId).orElseThrow();
//			 
//			 Set<UserCleanup> userCleanups = new HashSet<>();
//			 userCleanups.add(createdUserCleanup);
//			 user.setUserCleanups(userCleanups);
			
//			User user = userRepository.findById(userId).orElseThrow();
//			UserCleanup createdUserCleanup = userCleanupService.createUserCleanup(userCleanup);
//			user.getUserCleanups().add(createdUserCleanup); // Add the new UserCleanup to the set
//			User u1 = userRepository.save(user);
//			 
//			 User u1 = userRepository.save(user);
//			 Set<Cleanup> list = foundUser.getCleanups();
//			 list.add(cleanup);
//			 foundUser.setCleanups(list);
			 
//			 userRepository.save(foundUser);
			 //			 User updated = userService.saveUpdatedUser(foundUser); 
			 
//			 Set<UserCleanup> UClist = foundUser.getUserCleanups();
//			 UClist.add(createdUserCleanup);
//			 foundUser.setUserCleanups(UClist);
////			 Set<Cleanup> list = foundUser.getCleanups();
//			 list.add(cleanup);
//			
////			 
//			 User newSaved = userService.updateUser((long) 1,foundUser);
////			 
//	         System.out.println("UserCleanup created: " + createdUserCleanup);

			 return ResponseEntity.ok().body(createdUserCleanup);
		} catch (Exception e) {
			// Handle errors and return an appropriate response
			System.err.println("Error during search: " + e.getMessage());
			e.printStackTrace(); // Print the full exception stack trace
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ErrorResponse("Internal Server Error"));
		}
	}
	
//	@GetMapping("/list")
//    @CrossOrigin(origins = "http://localhost:4200")
//    public ResponseEntity<List<UserCleanup>> list() {
//        List<User> userList = userService.getAllUsers();
//        return ResponseEntity.ok().body(userList);
//    }

}
