package cbse.EcoMap.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class GeocodeMapsApiClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(GeocodeMapsApiClient.class);

    private String baseUrl = "https://geocode.maps.co";

    public JsonNode Reverse(double latitude, double longitude) throws Exception {
        try {
            // Build the URL with endpoint and query parameters
            String apiUrl = UriComponentsBuilder.fromHttpUrl(baseUrl)
                    .path("/reverse")
                    .queryParam("lat", latitude)
                    .queryParam("lon", longitude)
                    .build().toUriString();

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                String data = response.getBody();
                LOGGER.info("Received data: {}", data);
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.readTree(data);
            } else {
                LOGGER.error("Failed to fetch data. Status code: {}", response.getStatusCode());
                throw new RuntimeException("Failed to fetch data. Status code: " + response.getStatusCode());
            }
        } catch (Exception e) {
            LOGGER.error("An error occurred during the API request", e);
            throw e; // Rethrow the exception for higher-level error handling
        }
    }

    public String getBaseUrl() {
        return baseUrl;
    }
}