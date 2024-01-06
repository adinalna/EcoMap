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
import cbse.EcoMap.model.Team;
import cbse.EcoMap.model.User;
import cbse.EcoMap.service.TeamService;
import cbse.EcoMap.service.UserService;

@RestController
@RequestMapping("/api/team")

public class TeamController {
	private final TeamService teamService;
    
    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping("/create")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> createTeam(@RequestBody Team team) {
        try {
            Team createdTeam = teamService.createTeam(team);
            return ResponseEntity.ok().body(createdTeam);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal Server Error"));
        }
    }

    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Team>> listTeams() {
        List<Team> teamList = teamService.getAllTeams();
        return ResponseEntity.ok().body(teamList);
    }
    
    @GetMapping("/filteredList")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Team>> filteredList(Long userID) {
        List<Team> teamList = teamService.filteredTeams(userID);
        return ResponseEntity.ok().body(teamList);
    }

    @GetMapping("/findSpecificByName")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> findSpecificByName(@RequestParam String teamName, @RequestParam Long userID) {
        Team foundTeam = teamService.findSpecificTeamByName(teamName, userID);
        if (foundTeam == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No such team found or already a member.");
        }
        return ResponseEntity.ok().body(foundTeam);
    }

    @GetMapping("/userTeams")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> getUserTeams(@RequestParam Long userId) {
		List<Team> teams = teamService.getTeamsByUserId(userId);
		return ResponseEntity.ok().body(teams);
	}

	@PostMapping("/unjoin")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> unjoinTeam(@RequestParam Long userId, @RequestParam Long teamId) {
		try {
			teamService.unjoinTeam(userId, teamId);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			// Handle exceptions
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error unjoining team: " + e.getMessage());
		}
	}
}
