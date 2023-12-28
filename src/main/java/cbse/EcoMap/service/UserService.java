package cbse.EcoMap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.model.Country;
import cbse.EcoMap.model.Team;
import cbse.EcoMap.model.User;
import cbse.EcoMap.repository.UserRepository;

import java.time.Instant;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserById(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        // Throw an exception if the user is not found
        return optionalUser.orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }
    
    public User createDummyUser() {
        // Create a dummy user with some default values
        User dummyUser = new User();
        dummyUser.setName("Dummy User");
        dummyUser.setEmail("dummy@example.com");
        dummyUser.setPassword("dummyPassword");
        //dummyUser.setCountry(1);
        // Save the dummy user to the database
        return userRepository.save(dummyUser);
    }
    
//    public Country createDummyCountry() {
//        Country country = new Country();
//        country.setId(1L);
//        country.setDate_created(Instant.now());
//        country.setName("Dummy Country");
//        country.setXp_score(100);
//
//        // Create dummy teams
//        Team team1 = new Team();
//        team1.setId(1L);
//        team1.setName("Team A");
//        team1.setCountry(country);
//
//        Team team2 = new Team();
//        team2.setId(2L);
//        team2.setName("Team B");
//        team2.setCountry(country);
//
//        Set<Team> teams = new HashSet<>();
//        teams.add(team1);
//        teams.add(team2);
//
//        country.setTeams(teams);
//
//        // Create dummy users
//        User user1 = new User();
//        user1.setId(1L);
//        user1.setUsername("user1");
//        user1.setCountry(country);
//
//        User user2 = new User();
//        user2.setId(2L);
//        user2.setUsername("user2");
//        user2.setCountry(country);
//
//        Set<User> users = new HashSet<>();
//        users.add(user1);
//        users.add(user2);
//
//        country.setUsers(users);
//
//        return country;
//    }
//    
    
    public User findCleanupById(Long cleanupId) {
        // Implement logic to retrieve a cleanup by its ID
    	Optional<User> optionalUser = userRepository.findById(cleanupId);
        return optionalUser.orElse(null);
    }
}
