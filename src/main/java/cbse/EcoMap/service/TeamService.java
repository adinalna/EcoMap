package cbse.EcoMap.service;

import java.util.List;
import cbse.EcoMap.model.Team;
import cbse.EcoMap.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public Team createOrUpdateTeam(Team team) {
        // Additional logic before saving can go here
        return teamRepository.save(team);
    }

    public List<Team> findAllPublicTeams() {
        return teamRepository.findByIsPublicTrue();
    }
    // Additional service methods can go here
}