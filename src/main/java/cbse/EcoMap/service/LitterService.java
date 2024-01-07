package cbse.EcoMap.service;

import cbse.EcoMap.client.GeocodeMapsApiClient;
import cbse.EcoMap.dto.LitterDto;
import cbse.EcoMap.dto.CountryLitterCountDto;
import cbse.EcoMap.model.Litter;
import cbse.EcoMap.model.Country;
import cbse.EcoMap.model.User;
import cbse.EcoMap.repository.CountryRepository;
import cbse.EcoMap.repository.LitterRepository;
import cbse.EcoMap.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import cbse.EcoMap.repository.CountryRepository;
//import cbse.EcoMap.security.UserDetailsImpl;

import java.util.Comparator;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.Lombok;
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
        System.out.print("locationX" + locationX);

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
    
    public List<LitterDto> getAllLittersByUserId(Long userId) {
    	Sort sort = Sort.by(Sort.Direction.ASC, "dateCreated");
    	List<Litter> litters = litterRepository.findAllByUserId(userId, sort);
    	return litters.stream()
                .map(LitterDto::new)
                .collect(Collectors.toList());
    }

    public void deleteLitterById(Long litterId) {
        Litter litter = litterRepository.findById(litterId)
            .orElseThrow(() -> new EntityNotFoundException("Litter not found with id: " + litterId));

        litterRepository.delete(litter);
    }

    public Litter updateLitterPickupStatus(Long litterId, Boolean pickedUp) {
        Optional<Litter> optionalLitter = litterRepository.findById(litterId);
        if (optionalLitter.isPresent()) {
            Litter litter = optionalLitter.get();
            litter.setPickedUp(pickedUp);
            return litterRepository.save(litter);
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

        Sort sort = Sort.by(Sort.Direction.ASC, "dateCreated");
        return litterRepository.findByDateCreatedBetween(startDate, endDate, sort);
    }

    public List<Litter> getAllLittersInDateRange(Instant startDate, Instant endDate) {
        // Assuming you have a method in your repository to fetch data in a date range
    	Sort sort = Sort.by(Sort.Direction.ASC, "dateCreated");
        return litterRepository.findByDateCreatedBetween(startDate, endDate, sort);
    }

    public List<Litter> getAllLittersPastNDays(int days) {
        // Calculate start and end dates based on the number of days
        Instant endDate = Instant.now();
        Instant startDate = endDate.minus(days, ChronoUnit.DAYS);

    	System.out.println("This is endDate" + endDate);
    	System.out.println("This is endDate" + startDate);

    	Sort sort = Sort.by(Sort.Direction.ASC, "dateCreated");
        // Assuming you have a method in your repository to fetch data in a date range
        return litterRepository.findByDateCreatedBetween(startDate, endDate, sort);
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