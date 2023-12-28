package cbse.EcoMap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.repository.CleanupRepository;

@Service
public class CleanupService {
    private final CleanupRepository cleanupRepository;

    @Autowired
    public CleanupService(CleanupRepository cleanupRepository) {
        this.cleanupRepository = cleanupRepository;
    }

    public Cleanup createCleanup(Cleanup cleanUp) {
        try {
            return cleanupRepository.save(cleanUp);
        } catch (Exception e) {
            e.printStackTrace(); // Print the full exception stack trace
            throw e; // Re-throw the exception to propagate it up
        }
    }

    public List<Cleanup> getAllCleanups() {
        // Implement logic to retrieve all cleanup events (e.g., from the database)
        return cleanupRepository.findAll();
    }

    public Cleanup findCleanupById(Long cleanupId) {
        // Implement logic to retrieve a cleanup by its ID
    	Optional<Cleanup> optionalCleanup = cleanupRepository.findById(cleanupId);
        return optionalCleanup.orElse(null);
    }
}
