package cbse.EcoMap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cbse.EcoMap.model.Team;
import cbse.EcoMap.model.User;
import cbse.EcoMap.model.UserTeam;
import cbse.EcoMap.repository.UserTeamRepository;
import cbse.EcoMap.repository.TeamRepository;
import cbse.EcoMap.repository.UserRepository;

@Service
public class UserTeamService {

    private UserTeamRepository userTeamRepository;
    private TeamRepository teamRepository;
    private UserRepository userRepository;

    @Autowired
    public UserTeamService(
            UserTeamRepository userTeamRepository,
            TeamRepository teamRepository,
            UserRepository userRepository) {
        this.userTeamRepository = userTeamRepository;
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    public UserTeam createUserTeam(UserTeam userTeam) {
        try {
            UserTeam savedUserTeam = userTeamRepository.save(userTeam);
            return savedUserTeam;
        } catch (Exception e) {
            System.out.println("Error creating UserTeam: " + e.getMessage());
            e.printStackTrace(); // Print the full exception stack trace
            throw e; // Re-throw the exception to propagate it up
        }
    }
}