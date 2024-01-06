package cbse.EcoMap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import cbse.EcoMap.model.Team;
import cbse.EcoMap.model.User;
import cbse.EcoMap.model.UserTeam;
import cbse.EcoMap.repository.TeamRepository;
import cbse.EcoMap.repository.UserTeamRepository;

@Service
public class TeamService {
	private final TeamRepository teamRepository;
	private UserTeamRepository userTeamRepository;

	@Autowired
	public TeamService(TeamRepository teamRepository, UserTeamRepository userTeamRepository) {
		this.teamRepository = teamRepository;
		this.userTeamRepository = userTeamRepository;
	}

	public Team createTeam(Team team) throws IllegalArgumentException {
        if (teamRepository.existsByName(team.getName())) {
            throw new IllegalArgumentException("A team with this name already exists.");
        }
        return teamRepository.save(team);
    }

	public List<Team> getAllTeams() {
		// Implement logic to retrieve all teams (e.g., from the database)
		return teamRepository.findAll();
	}

	public Team findTeamById(Long teamId) {
		// Implement logic to retrieve a cleanup by its ID
		Optional<Team> optionalTeam = teamRepository.findById(teamId);
		return optionalTeam.orElse(null);
	}

	public List<Team> filteredTeams(Long userID) {
	    try {
	        List<UserTeam> UClist = userTeamRepository.findAll();     	
	        List<Team> foundList = new ArrayList<>();
	        List<Team> filteredList = teamRepository.findAll();
	        if (!UClist.isEmpty()) {
	            for (UserTeam current : UClist) {
	            	if (current.getUser().getId().equals(userID)) {
	            		foundList.add(current.getTeam());
	            	}
	                
	            }
	            if(!foundList.isEmpty()) {
	            	filteredList.removeAll(foundList);
		        }
	            
	        }
	        
	        // Remove Private Cleanup using removeIf
	        filteredList.removeIf(team -> !team.getIsPublic());

	           
	        return filteredList;
	    } catch (Exception e) {
	        // Handle exceptions appropriately, log or throw as needed
	        e.printStackTrace();
	        return Collections.emptyList(); // Or handle the error and return an appropriate response
	    }
	}
	
	// public Team findSpecificTeam(Long teamId, Long userId) {
	// 	Optional<Team> optionalTeam = teamRepository.findById(teamId);
	// 	if (optionalTeam.isPresent()) {
	// 		Team team = optionalTeam.get();
	// 		boolean isMember = userTeamRepository.findByUserId(userId).stream()
	// 						  .anyMatch(ut -> ut.getTeam().getId().equals(teamId));
	// 		if (isMember) {
	// 			return null; // User is already a member
	// 		}
	// 		return team;
	// 	}
	// 	return null;
	// }
	
	public Team findSpecificTeamByName(String teamName, Long userId) {
		List<Team> teams = teamRepository.findByName(teamName);
		if (!teams.isEmpty()) {
			Team team = teams.get(0); // Assuming name uniqueness, otherwise handle list
			boolean isMember = userTeamRepository.findByUserId(userId).stream()
							  .anyMatch(ut -> ut.getTeam().getId().equals(team.getId()));
			if (isMember) {
				return null; // User is already a member
			}
			return team;
		}
		return null;
	}	
}
