package cbse.EcoMap.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.annotation.PostConstruct;
import java.util.Date;

@PropertySource("classpath:application.properties")
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    private byte[] encodedSecretKey;

    private static final long EXPIRATION_TIME = 864_000_000; // 10 days
    
    private final UserDetailsServiceImpl userDetailsService;

    public JwtTokenProvider(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    public void init() {
        encodedSecretKey = secretKey.getBytes();
    }

    public String createToken(Long userId, String name, String email) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("userId", userId)
                .claim("name", name)
                .claim("email", email)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Keys.hmacShaKeyFor(encodedSecretKey), SignatureAlgorithm.HS512)
                .compact();
    }
    
    public String createToken(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        Long userId = userDetails.getId();
        String name = userDetails.getName();
        String email = userDetails.getEmail();

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("userId", userId)
                .claim("name", name)
                .claim("email", email)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Keys.hmacShaKeyFor(encodedSecretKey), SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(encodedSecretKey)).build().parseClaimsJws(token).getBody();
    }

    public Long getUserIdFromToken(String token) {
        return getClaimsFromToken(token).get("userId", Long.class);
    }

    public String getNameFromToken(String token) {
        return getClaimsFromToken(token).get("name", String.class);
    }

    public String getEmailFromToken(String token) {
        return getClaimsFromToken(token).get("email", String.class);
    }

    public boolean validateToken(String token) {
        try {
            getClaimsFromToken(token);
            return true;
        } catch (Exception e) {
            // Invalid token
            return false;
        }
    }
    
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = getUserDetailsFromToken(token);

        if (userDetails != null) {
            return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
        }

        return null;
    }

    private UserDetails getUserDetailsFromToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            Long userId = claims.get("userId", Long.class);
            String name = claims.get("name", String.class);
            String email = claims.get("email", String.class);

            return userDetailsService.loadUserByUsername(String.valueOf(userId));
        } catch (Exception e) {
            // Invalid token or user details cannot be retrieved
            return null;
        }
    }
}
