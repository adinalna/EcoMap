package cbse.EcoMap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.model.User;
import cbse.EcoMap.model.UserCleanup;
import cbse.EcoMap.repository.UserCleanupRepository;
import cbse.EcoMap.repository.CleanupRepository; // Add this import
import cbse.EcoMap.repository.UserRepository; // Add this import

@Service
public class UserCleanupService {

    private UserCleanupRepository userCleanupRepository;
    private CleanupRepository cleanupRepository; // Add this field
    private UserRepository userRepository; // Add this field

    @Autowired
    public UserCleanupService(
            UserCleanupRepository userCleanupRepository,
            CleanupRepository cleanupRepository,
            UserRepository userRepository) {
        this.userCleanupRepository = userCleanupRepository;
        this.cleanupRepository = cleanupRepository;
        this.userRepository = userRepository;
    }

    public UserCleanup createUserCleanup(UserCleanup userCleanUp) {
        try {
            UserCleanup savedUserCleanup = userCleanupRepository.save(userCleanUp);
            return savedUserCleanup;
        } catch (Exception e) {
            System.out.println("Error creating UserCleanup: " + e.getMessage());
            e.printStackTrace(); // Print the full exception stack trace
            throw e; // Re-throw the exception to propagate it up
        }
    }
    
    
    
   
  

}
