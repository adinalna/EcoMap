package cbse.EcoMap.security;

import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Base64;

public class KeyGenerator {

    public static void main(String[] args) {
        // Generate a secure key for HMAC-SHA512 algorithm
        Key secureKey = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS512);

        byte[] secureKeyBytes = secureKey.getEncoded();
        String base64EncodedKey = Base64.getEncoder().encodeToString(secureKeyBytes);

        System.out.println("Key Length: " + (secureKeyBytes.length * 8) + " bits");
        System.out.println("Key: " + base64EncodedKey);
    }
}
