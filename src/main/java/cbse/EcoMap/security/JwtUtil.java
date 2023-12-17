package cbse.EcoMap.security;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class JwtUtil {

    public static void main(String[] args) {
        try (AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(JwtTokenProvider.class)) {
            JwtTokenProvider jwtTokenProvider = context.getBean(JwtTokenProvider.class);
            jwtTokenProvider.init();

            String token = jwtTokenProvider.createToken(302L, "John Doe", "john@gmail.com");
            System.out.println("Generated Token: " + token);

            if (jwtTokenProvider.validateToken(token)) {
                Long userId = jwtTokenProvider.getUserIdFromToken(token);
                String name = jwtTokenProvider.getNameFromToken(token);
                String email = jwtTokenProvider.getEmailFromToken(token);

                System.out.println("Valid Token.");
                System.out.println("User ID: " + userId);
                System.out.println("Name: " + name);
                System.out.println("Email: " + email);
            } else {
                System.out.println("Invalid Token");
            }
        }
    }
}
