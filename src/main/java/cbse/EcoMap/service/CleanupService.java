package cbse.EcoMap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cbse.EcoMap.model.Cleanup;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.model.Media;
import cbse.EcoMap.repository.CleanupRepository;

@Service
public class CleanupService {
	private final CleanupRepository cleanupRepository;

	@Autowired
	public CleanupService(CleanupRepository cleanupRepository) {
		this.cleanupRepository = cleanupRepository;
	}

	public Cleanup createCleanup(Cleanup cleanUp) {
		return cleanupRepository.save(cleanUp);
	}
}