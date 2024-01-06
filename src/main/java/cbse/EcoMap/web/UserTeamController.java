package cbse.EcoMap.web;

import cbse.EcoMap.repository.TeamRepository;
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
import cbse.EcoMap.model.Team;
import cbse.EcoMap.model.User;
import cbse.EcoMap.model.UserTeam;
import cbse.EcoMap.service.TeamService;
import cbse.EcoMap.service.UserTeamService;
import cbse.EcoMap.service.UserService;

@RestController
@RequestMapping("/api/userteam")
public class UserTeamController {
	private final TeamService teamService;
	private final UserService userService;
	private final UserTeamService userTeamService;
    private UserRepository userRepository;

	@Autowired
	public UserTeamController(TeamService teamService, UserService userService,
			UserTeamService userTeamService, UserRepository userRepository) {
		this.teamService = teamService;
		this.userService = userService;
		this.userTeamService = userTeamService;
		this.userRepository = userRepository;
	}

	@GetMapping("/find")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> findUserAndTeam(@RequestParam Long userId, @RequestParam Long teamId) {
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
	        
			Team team = teamService.findTeamById(teamId);
			Map<String, Object> result = new HashMap<>();
			result.put("team", team);
			result.put("user", foundUser);
			
	
			UserTeam userTeam = UserTeam.builder()
	                .team(team)
	                .user(foundUser)
	                .role("Member") // Set the role accordingly
	                .date_created(Instant.now())
	                .build();		
			 
			 UserTeam createdUserTeam = userTeamService.createUserTeam(userTeam);

			 return ResponseEntity.ok().body(createdUserTeam);
		} catch (Exception e) {
			// Handle errors and return an appropriate response
			System.err.println("Error during search: " + e.getMessage());
			e.printStackTrace(); // Print the full exception stack trace
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ErrorResponse("Internal Server Error"));
		}
	}
}