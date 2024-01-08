//package cbse.EcoMap.filters;
//
//import java.io.File;
//import java.io.IOException;
//import java.net.InetAddress;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Component;
//
//import com.maxmind.geoip2.DatabaseReader;
//import com.maxmind.geoip2.model.CityResponse;
//
//import jakarta.servlet.Filter;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.FilterConfig;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.ServletRequest;
//import jakarta.servlet.ServletResponse;
//import jakarta.servlet.annotation.WebFilter;
//import jakarta.servlet.http.HttpServletRequest;
//
//@Component
//@WebFilter(urlPatterns = "/*")
//public class IPAddressFilter implements Filter {
//	
//	Logger LOGGER = LoggerFactory.getLogger(IPAddressFilter.class);
//	
//	private DatabaseReader databaseReader;
//
//    @Override
//    public void init(FilterConfig filterConfig) throws ServletException {
//        try {
//            // Load the GeoIP2 database from a file (you need to download this from MaxMind)
//            File database = new File("C:\\Users\\user\\Downloads\\GeoLite2-Country_20231222\\GeoLite2-Country_20231222\\GeoLite2-Country.mmdb");
//            this.databaseReader = new DatabaseReader.Builder(database).build();
//        } catch (IOException e) {
//            throw new ServletException("Error initializing GeoIP database", e);
//        }
//    }
//
//	@Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//		// Cast ServletRequest to HttpServletRequest
//        HttpServletRequest httpRequest = (HttpServletRequest) request;
//
//        // Use HttpServletRequest's getHeader method
//        String ipAddress = httpRequest.getHeader("X-Forwarded-For");
//        if (ipAddress == null || ipAddress.isEmpty()) {
//            ipAddress = request.getRemoteAddr();
//        }
//        
//     // Get country information from GeoIP database
//        String country = getCountryFromIpAddress(ipAddress);
//
//        // Store or use the country information as needed
//        System.out.println("Request from country: " + country);
//
//        // Store or use the IP address as needed
//        LOGGER.info(ipAddress);
//
//        // Continue with the request chain
//        chain.doFilter(request, response);
//    }
//	
//	private String getCountryFromIpAddress(String ipAddress) throws IOException {
//        try {
//            System.out.println("try block 1");
//
//        	// Convert the IP address string to InetAddress
//            InetAddress address = InetAddress.getByName(ipAddress);
//            System.out.println("InetAddress" + address);
//
//            // Get CityResponse from the GeoIP database
//            CityResponse cityResponse = databaseReader.city(address);
//            
//            System.out.println("try block");
//
//            // Get the country name from the CityResponse
//            return cityResponse.getCountry().getName();
//        } catch (Exception e) {
//            // Handle exceptions, such as if the IP address is not found in the database
//            return "Unknown";
//        }
//    }
//}
