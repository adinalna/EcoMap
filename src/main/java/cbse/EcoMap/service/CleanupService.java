package cbse.EcoMap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.model.User;
import cbse.EcoMap.model.UserCleanup;
import cbse.EcoMap.repository.CleanupRepository;
import cbse.EcoMap.repository.UserCleanupRepository;

@Service
public class CleanupService {
	private final CleanupRepository cleanupRepository;
	private UserCleanupRepository userCleanupRepository;

	@Autowired
	public CleanupService(CleanupRepository cleanupRepository, UserCleanupRepository userCleanupRepository) {
		this.cleanupRepository = cleanupRepository;
		this.userCleanupRepository = userCleanupRepository;
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

	public List<Cleanup> filteredCleanups(Long userID) {
	    try {
	        List<UserCleanup> UClist = userCleanupRepository.findAll();     	
	        List<Cleanup> foundList = new ArrayList<>();
	        List<Cleanup> filteredList = cleanupRepository.findAll();
	        if (!UClist.isEmpty()) {
	            for (UserCleanup current : UClist) {
	            	if (current.getUser().getId().equals(userID)) {
	            		foundList.add(current.getCleanup());
	            	}
	                
	            }
	            if(!foundList.isEmpty()) {
	            	filteredList.removeAll(foundList);
		        }
	            
	        }
	        
	        
	        // Remove Private Cleanup using removeIf
	        filteredList.removeIf(cleanup -> !cleanup.getIsPublic());

	           
	        return filteredList;
	    } catch (Exception e) {
	        // Handle exceptions appropriately, log or throw as needed
	        e.printStackTrace();
	        return Collections.emptyList(); // Or handle the error and return an appropriate response
	    }
	}

    
}
