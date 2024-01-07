package cbse.EcoMap.service;

import cbse.EcoMap.dto.LitterDto;
import cbse.EcoMap.dto.CountryLitterCountDto;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.repository.CountryRepository;
import cbse.EcoMap.repository.LitterRepository;
import cbse.EcoMap.repository.UserRepository;
//import cbse.EcoMap.security.UserDetailsImpl;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.Lombok;
import org.springframework.data.domain.Sort;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class LitterService {

    private final LitterRepository litterRepository;
    private final UserRepository userRepository;
    private final CountryRepository countryRepository;

    //    @Autowired
    public LitterService(LitterRepository litterRepository, UserRepository userRepository, CountryRepository countryRepository) {
        this.litterRepository = litterRepository;
        this.userRepository = userRepository;
        this.countryRepository = countryRepository;
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

    public List<LitterDto> getAllLittersByCountries() {
        Sort sort = Sort.by(Sort.Direction.ASC, "countryId");
        List<Litter> litters = litterRepository.findAllByCountries(sort);
        return litters.stream()
                .map(LitterDto::new)
                .collect(Collectors.toList());
    }

    public List<CountryLitterCountDto> getLitterCountByCountry() {
        List<Object[]> counts = litterRepository.countLittersByCountry();
        return counts.stream()
                .map(obj -> {
                    Integer countryId = (Integer) obj[0];
                    String countryName = countryRepository.findCountryNameById(countryId.longValue());
                    Long litterCount = (Long) obj[1];
                    Long userCount = (Long) obj[2];
                    return new CountryLitterCountDto(countryId, countryName, litterCount, userCount);
                })
                .sorted(Comparator.comparing(CountryLitterCountDto::getLitterCount).reversed())
                .collect(Collectors.toList());
    }

    public List<CountryLitterCountDto> getLitterCountByCountries(Integer n) {
        List<Object[]> counts = litterRepository.countLittersByCountry();
        return counts.stream()
                .map(obj -> {
                    Integer countryId = (Integer) obj[0];
                    String countryName = countryRepository.findCountryNameById(countryId.longValue());
                    Long litterCount = (Long) obj[1];
                    Long userCount = (Long) obj[2];
                    return new CountryLitterCountDto(countryId, countryName, litterCount, userCount);
                })
                .sorted(Comparator.comparing(CountryLitterCountDto::getLitterCount).reversed())
                .limit(n)
                .collect(Collectors.toList());
    }
    
    public Optional<Litter> getLitterById(Long litterId) {
        return litterRepository.findById(litterId);
    }
    
    public List<Litter> getAllLittersByUserId(Long userId) {
        return litterRepository.findAllByUserId(userId);
    }

    public List<Litter> getAllLittersByCountryId(Integer countryId) {
        return litterRepository.findAllByCountryId(countryId);
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