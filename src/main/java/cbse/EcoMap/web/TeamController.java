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
	    ResponseEntity<?> getGroup(@PathVariable Long id) {
	        Optional<Team> team = teamRepository.findById(id);
	        return team.map(response -> ResponseEntity.ok().body(response))
	                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	    }

	    @PostMapping("/group")
	    ResponseEntity<Team> createGroup(@Valid @RequestBody Team group) throws URISyntaxException {
	        log.info("Request to create group: {}", group);
	        Team result = teamRepository.save(group);
	        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
	                .body(result);
	    }

	    @PutMapping("/group/{id}")
	    ResponseEntity<Team> updateGroup(@Valid @RequestBody Team team) {
	        log.info("Request to update group: {}", team);
	        Team result = teamRepository.save(team);
	        return ResponseEntity.ok().body(result);
	    }
	    
	    @DeleteMapping("/group/{id}")
	    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
	        log.info("Request to delete group: {}", id);
	        teamRepository.deleteById(id);
	        return ResponseEntity.ok().build();
	    }
}
