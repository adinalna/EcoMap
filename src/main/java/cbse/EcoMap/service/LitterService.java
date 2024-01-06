package cbse.EcoMap.service;

import cbse.EcoMap.client.GeocodeMapsApiClient;
import cbse.EcoMap.dto.LitterDto;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.model.Country;
import cbse.EcoMap.model.User;
import cbse.EcoMap.repository.LitterRepository;
import cbse.EcoMap.repository.UserRepository;
import cbse.EcoMap.repository.CountryRepository;
//import cbse.EcoMap.security.UserDetailsImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;

@Service
public class LitterService {

    private final LitterRepository litterRepository;
    private final UserRepository userRepository;
    private final CountryRepository countryRepository;

    @Autowired
    public LitterService(LitterRepository litterRepository, UserRepository userRepository, CountryRepository countryRepository) {
        this.litterRepository = litterRepository;
        this.userRepository = userRepository;
        this.countryRepository = countryRepository;
    }
    public Litter createLitter() {
        Long currentUserId = 1L; // for testing
        Litter litter = new Litter();
        litter.setUser(userRepository.findById(currentUserId).orElse(null));
        return litterRepository.save(litter);
    }

    public Litter createLitter(double locationY, double locationX) {
        Long currentUserId = 1L; // for testing
        GeocodeMapsApiClient geocodeMapsApiClient = new GeocodeMapsApiClient();
        JsonNode jsonData = null;

        System.out.print("locationY" + locationY);
        System.out.print("location i X" + locationX);

        try {
            jsonData = geocodeMapsApiClient.Reverse(locationY, locationX);
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(jsonData.toString());

        // Create Litter using Lombok Builder
        Litter litter = Litter.builder()
                .requestResponse(jsonData.toString())
                .address(getTextOrNull(jsonData, "display_name"))
                .city(getTextOrNull(jsonData.path("address"), "city"))
                .state(getTextOrNull(jsonData.path("address"), "state"))
                .postcode(getTextOrNull(jsonData.path("address"), "postcode"))
                .country(getCountry(jsonData.path("address")))
                .user(getUser(currentUserId))
                .pickedUp(false)
                .build();

        return litterRepository.save(litter);
    }
    
    private Country getCountry(JsonNode addressNode) {
        if (addressNode != null) {
            String countryName = addressNode.path("country").asText();
            return Optional.ofNullable(countryRepository.findByName(countryName)).orElse(null);
        }
        return null;
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
    
    private String getTextOrNull(JsonNode node, String fieldName) {
        return node.has(fieldName) ? node.path(fieldName).asText() : null;
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
    
    public List<LitterDto> getAllLittersByUserId(Long userId) {
    	Sort sort = Sort.by(Sort.Direction.ASC, "dateCreated");
    	List<Litter> litters = litterRepository.findAllByUserId(userId, sort);
    	return litters.stream()
                .map(LitterDto::new)
                .collect(Collectors.toList());
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