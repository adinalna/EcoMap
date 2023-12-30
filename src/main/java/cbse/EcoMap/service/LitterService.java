package cbse.EcoMap.service;

import cbse.EcoMap.dto.LitterDto;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.repository.LitterRepository;
import cbse.EcoMap.repository.UserRepository;
//import cbse.EcoMap.security.UserDetailsImpl;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
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
    
    public List<Litter> getAllLittersInMonth(int year, Month month) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        System.out.println(startOfMonth + "this is startOfMonth");
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);
        
        Instant startDate = startOfMonth.atStartOfDay().toInstant(ZoneOffset.UTC);
        Instant endDate = endOfMonth.atTime(23, 59, 59).toInstant(ZoneOffset.UTC);
        return litterRepository.findByDateCreatedBetween(startDate, endDate);
    }
    
    public List<Litter> getAllLittersInDateRange(Instant startDate, Instant endDate) {
        // Assuming you have a method in your repository to fetch data in a date range
        return litterRepository.findByDateCreatedBetween(startDate, endDate);
    }
    
    public List<Litter> getAllLittersPastNDays(int days) {
        // Calculate start and end dates based on the number of days
        Instant endDate = Instant.now();
        Instant startDate = endDate.minus(days, ChronoUnit.DAYS);
        
        // Assuming you have a method in your repository to fetch data in a date range
        return litterRepository.findByDateCreatedBetween(startDate, endDate);
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