package cbse.EcoMap.service;

import cbse.EcoMap.dto.LitterDto;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.repository.LitterRepository;
import cbse.EcoMap.repository.UserRepository;
//import cbse.EcoMap.security.UserDetailsImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class LitterService {

    private final LitterRepository litterRepository;
    private final UserRepository userRepository;

//    @Autowired
    public LitterService(LitterRepository litterRepository, UserRepository userRepository) {
        this.litterRepository = litterRepository;
        this.userRepository = userRepository;
    }

    public Litter createLitter() {
        Long currentUserId = 302L; // for testing
        
        Litter litter = new Litter();
        litter.setUser(userRepository.findById(currentUserId).orElse(null));
        return litterRepository.save(litter);
    }
    
    public List<LitterDto> getAllLittersWithMedia() {
        Sort sort = Sort.by(Sort.Direction.ASC, "dateCreated");
        List<Litter> litters = litterRepository.findAllWithMedia(sort);
        return litters.stream()
                .map(LitterDto::new)
                .collect(Collectors.toList());
    }
    
    public Optional<Litter> getLitterById(Long litterId) {
        return litterRepository.findById(litterId);
    }
    
    public List<Litter> getAllLittersByUserId(Long userId) {
        return litterRepository.findAllByUserId(userId);
    }

    public Litter updateLitter(Long litterId, Litter updatedLitter) {
        if (litterRepository.existsById(litterId)) {
            updatedLitter.setId(litterId);
            return litterRepository.save(updatedLitter);
        } else {
            throw new IllegalArgumentException("Litter not found with ID: " + litterId);
        }
    }



    public void deleteLitter(Long litterId) {
        litterRepository.deleteById(litterId);
    }
}


//private Long getCurrentUserId() {
//Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//if (authentication != null && authentication.isAuthenticated()) {
//  UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//  return userDetails.getId();
//} else {
//  throw new IllegalStateException("User not authenticated");
//}
//}