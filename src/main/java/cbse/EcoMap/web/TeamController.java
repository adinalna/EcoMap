package cbse.EcoMap.web;

import cbse.EcoMap.dto.TeamDto;
import cbse.EcoMap.model.Team;
import cbse.EcoMap.service.TeamService;

import org.modelmapper.ModelMapper;
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
import java.util.stream.Collectors;
import java.util.List;

@RestController
@RequestMapping("/api")

public class TeamController {


	private final Logger log = LoggerFactory.getLogger(TeamController.class);
    private final TeamService teamService;
    private final ModelMapper modelMapper;

    public TeamController(TeamService teamService, ModelMapper modelMapper) {
        this.teamService = teamService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/teams")
    public ResponseEntity<TeamDto> createTeam(@Valid @RequestBody TeamDto teamDto) {
        log.info("Request to create team: {}", teamDto);
        Team team = modelMapper.map(teamDto, Team.class);
        Team result = teamService.createOrUpdateTeam(team);
        TeamDto responseBody = modelMapper.map(result, TeamDto.class);
        return ResponseEntity.created(URI.create("/api/teams/" + result.getId())).body(responseBody);
    }

    // Additional endpoints can go here
    @GetMapping("/teams/public")
    public ResponseEntity<List<TeamDto>> getPublicTeams() {
        List<Team> publicTeams = teamService.findAllPublicTeams();
        List<TeamDto> publicTeamDtos = publicTeams.stream()
                .map(team -> modelMapper.map(team, TeamDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(publicTeamDtos);
    }
}