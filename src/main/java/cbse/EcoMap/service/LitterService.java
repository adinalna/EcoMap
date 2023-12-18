package cbse.EcoMap.service;

import cbse.EcoMap.model.Litter;
import cbse.EcoMap.repository.LitterRepository;
import cbse.EcoMap.repository.UserRepository;
//import cbse.EcoMap.security.UserDetailsImpl;

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
        Long currentUserId = 302L;
        
        Litter litter = new Litter();
        litter.setUser(userRepository.findById(currentUserId).orElse(null));
        return litterRepository.save(litter);
    }

//    private Long getCurrentUserId() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.isAuthenticated()) {
//            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//            return userDetails.getId();
//        } else {
//            throw new IllegalStateException("User not authenticated");
//        }
//    }
}