package cbse.EcoMap.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@PropertySource("classpath:application.properties")
@Component
public class GeocodeMapsApiClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(GeocodeMapsApiClient.class);

    @Value("${geocode.api.url}")
    private String baseUrl;

    public void Reverse(double latitude, double longitude) {
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
            } else {
                LOGGER.error("Failed to fetch data. Status code: {}", response.getStatusCode());
            }
        } catch (Exception e) {
            LOGGER.error("An error occurred during the API request", e);
        }
    }
}
