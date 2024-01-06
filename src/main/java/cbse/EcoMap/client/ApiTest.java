package cbse.EcoMap.client;

import com.fasterxml.jackson.databind.JsonNode;

public class ApiTest {

    void testReverse() throws Exception {
        GeocodeMapsApiClient geocodeMapsApiClient = new GeocodeMapsApiClient();

        // Replace these coordinates with the ones you want to test
        double latitude = 40.730901162924205;
        double longitude = -73.99734020233154;

        JsonNode jsonData = geocodeMapsApiClient.Reverse(latitude, longitude);

        // Get the whole JSON data
        System.out.println("Whole JSON data:");
        System.out.println(jsonData.toString());

        // Extract specific fields
        JsonNode addressNode = jsonData.path("address");
        String city = (addressNode != null) ? addressNode.path("city").asText() : null;
        String state = (addressNode != null) ? addressNode.path("state").asText() : null;
        String postcode =  (addressNode != null) ? addressNode.path("postcode").asText() : null;
        String country = (addressNode != null) ? addressNode.path("country").asText() : null;     	

        // Print extracted fields
        System.out.println("City: " + city);
        System.out.println("State: " + state);
        System.out.println("Postcode: " + postcode);
        System.out.println("Country: " + country);
    }
}
