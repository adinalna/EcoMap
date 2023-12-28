package cbse.EcoMap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
            // Save Cleanup and User entities if needed
            cleanupRepository.save(userCleanUp.getCleanup());
            userRepository.save(userCleanUp.getUser());

            // Save UserCleanup
            return userCleanupRepository.save(userCleanUp);
        } catch (Exception e) {
            e.printStackTrace(); // Print the full exception stack trace
            throw e; // Re-throw the exception to propagate it up
        }
    }
}
