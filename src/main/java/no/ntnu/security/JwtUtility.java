package no.ntnu.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import no.ntnu.entity.CustomUserDetails;

/**
 * Utility class for handling JWT (JSON Web Token) operations.
 * Operations like token generation, validation, and parsing.
 */
@Component
public class JwtUtility {
  private static final Logger logger = 
      LoggerFactory.getLogger(JwtUtility.class.getSimpleName());
  
  @Value("${jwt_secret_key}")
  private String secretKey;  

  private static final String ROLE_KEY = "roles";

  /**
   * Generates a JWT token for the given user details.
   *
   * @param userDetails the user details to include in the token.
   * @return the generated JWT token.
   */
  public String generateToken(CustomUserDetails userDetails) {
    logger.info("Generating JWT token for username: {}", userDetails.getUsername());
    return Jwts.builder()
        .setSubject(userDetails.getUsername())
        .claim(ROLE_KEY, userDetails.getAuthorities())
        .claim("id", userDetails.getId())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
        .signWith(getSigningKey())
        .compact();
  }

  /**
   * Check if a token is valid for a given user.
   *
   * @param token       Token to validate
   * @param userDetails Object containing user details
   * @return True if the token matches the current user and is still valid
   */
  public boolean validateToken(String token, CustomUserDetails userDetails) throws JwtException {
    logger.info("Validating JWT token for username: {}", userDetails.getUsername());
    final String username = getUsernameFromToken(token);
    return userDetails != null
        && username.equals(userDetails.getUsername())
        && !isTokenExpired(token);
  }
  
  private SecretKey getSigningKey() {
    logger.debug("Retrieving signing key for JWT.");
    byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
    return new SecretKeySpec(keyBytes, 0, keyBytes.length, "HmacSHA256");
  }

  /**
   * Returns the username from the token.
   *
   * @param token the token to parse.
   * @return the username from the token.
   * @throws IllegalArgumentException if the token is invalid or expired.
   */
  public String getUsernameFromToken(String token) throws IllegalArgumentException {
    logger.debug("Extracting username from JWT token.");
    return Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

  /**
   * Returns the expiration date of the token.
   *
   * @param token the token to parse.
   * @return the expiration date of the token.
   * @throws IllegalArgumentException if the token is invalid or expired.
   */
  public Date getExpirationDateFromToken(String token) throws IllegalArgumentException {
    return Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getExpiration();
  }

  public boolean isTokenExpired(String token) {
    return getExpirationDateFromToken(token).before(new Date());
  }
}