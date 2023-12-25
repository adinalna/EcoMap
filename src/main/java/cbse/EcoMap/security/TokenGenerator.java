package cbse.EcoMap.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TokenGenerator implements CommandLineRunner {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public TokenGenerator(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void run(String... args) {
        Long userId = 302L;
        String name = "John Doe";
        String email = "john@gmail.com";

        String token = jwtTokenProvider.createToken(userId, name, email);
        System.out.println("Generated Token: " + token);

        if (jwtTokenProvider.validateToken(token)) {
            Long validatedUserId = jwtTokenProvider.getUserIdFromToken(token);
            String validatedName = jwtTokenProvider.getNameFromToken(token);
            String validatedEmail = jwtTokenProvider.getEmailFromToken(token);

            System.out.println("Valid Token.");
            System.out.println("User ID: " + validatedUserId);
            System.out.println("Name: " + validatedName);
            System.out.println("Email: " + validatedEmail);
        } else {
            System.out.println("Invalid Token");
        }
    }
}
