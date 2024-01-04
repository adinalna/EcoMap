package cbse.EcoMap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.model.Country;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.model.Team;
import cbse.EcoMap.model.User;
import cbse.EcoMap.model.UserCleanup;
import cbse.EcoMap.repository.UserRepository;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private static UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        // Implement logic to retrieve all cleanup events (e.g., from the database)
        return userRepository.findAll();
    }
    
    public User saveUpdatedUser(User foundUser) {
    	User savedUser = userRepository.save(foundUser);
    	return savedUser;
    }
    
    public User updateUser(Long userID, User updatedUser) {
        if (userRepository.existsById(userID)) {
        	updatedUser.setId(userID);
            return userRepository.save(updatedUser);
        } else {
            throw new IllegalArgumentException("User not found with ID: " + userID);
        }
    }

  
}
