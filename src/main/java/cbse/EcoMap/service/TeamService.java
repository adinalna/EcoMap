package cbse.EcoMap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
		return teamRepository.findAll();
	}

	public Team findTeamById(Long teamId) {
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
	        filteredList.removeIf(team -> !team.getIsPublic());

	           
	        return filteredList;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return Collections.emptyList();
	    }
	}
	
	public Team findSpecificTeamByName(String teamName, Long userId) {
		List<Team> teams = teamRepository.findByName(teamName);
		if (!teams.isEmpty()) {
			Team team = teams.get(0);
			boolean isMember = userTeamRepository.findByUserId(userId).stream()
							  .anyMatch(ut -> ut.getTeam().getId().equals(team.getId()));
			if (isMember) {
				return null;
			}
			return team;
		}
		return null;
	}	

	public List<Team> getTeamsByUserId(Long userId) {
		return userTeamRepository.findByUserId(userId).stream()
				.map(UserTeam::getTeam)
				.collect(Collectors.toList());
	}

	public void unjoinTeam(Long userId, Long teamId) {
		List<UserTeam> userTeams = userTeamRepository.findByUserId(userId);
		userTeams.stream()
				.filter(userTeam -> userTeam.getTeam().getId().equals(teamId))
				.findFirst()
				.ifPresent(userTeamRepository::delete);
	}
}
