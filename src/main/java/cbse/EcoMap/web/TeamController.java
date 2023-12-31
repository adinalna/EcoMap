package cbse.EcoMap.web;

import cbse.EcoMap.model.Team;
import cbse.EcoMap.repository.TeamRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Change to Port 4200
@RestController
@RequestMapping("/api")

public class TeamController {


	    private final Logger log = LoggerFactory.getLogger(TeamController.class);
	    private TeamRepository teamRepository;

	    public TeamController(TeamRepository teamRepository) {
	        this.teamRepository = teamRepository;
	    }

	    @GetMapping("/teams")
	    Collection<Team> teams() {
	        return teamRepository.findAll();
	    }

	    @GetMapping("/team/{id}")
	    ResponseEntity<?> getTeam(@PathVariable Long id) {
	        Optional<Team> team = teamRepository.findById(id);
	        return team.map(response -> ResponseEntity.ok().body(response))
	                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	    }

	    @PostMapping("/team")
	    ResponseEntity<Team> createTeam(@Valid @RequestBody Team team) throws URISyntaxException {
	        log.info("Request to create team: {}", team);
	        Team result = teamRepository.save(team);
	        return ResponseEntity.created(new URI("/api/team/" + result.getId()))
	                .body(result);
	    }

	    @PutMapping("/team/{id}")
	    ResponseEntity<Team> updateTeam(@Valid @RequestBody Team team) {
	        log.info("Request to update team: {}", team);
	        Team result = teamRepository.save(team);
	        return ResponseEntity.ok().body(result);
	    }
	    
	    @DeleteMapping("/team/{id}")
	    public ResponseEntity<?> deleteTeam(@PathVariable Long id) {
	        log.info("Request to delete team: {}", id);
	        teamRepository.deleteById(id);
	        return ResponseEntity.ok().build();
	    }
}
