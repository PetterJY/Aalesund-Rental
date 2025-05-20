package no.ntnu.logic.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;
import no.ntnu.entity.CustomUserDetails;
import no.ntnu.entity.dto.LoginDetails;
import no.ntnu.entity.dto.RefreshTokenDetails;
import no.ntnu.entity.models.Accounts;
import no.ntnu.logic.service.RefreshTokenService;
import no.ntnu.security.JwtUtility;

/**
 * Class responsible for handling:
 * login requests, authentication, and other authentication-related endpoints.
 */
@RestController
@RequestMapping("/auth")
public class RefreshTokenController {
  private static final Logger logger = 
      LoggerFactory.getLogger(RefreshTokenController.class.getSimpleName());

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private JwtUtility jwtUtility;

  @Autowired
  private RefreshTokenService refreshTokenService;
  
  /**
   * Handles login requests by authenticating the user and generating a JWT token.
   *
   * @param loginRequest The login request containing email and password.
   * @return A response entity containing the JWT token or an error message.
   */
  @PostMapping("/login")
  @ApiOperation(
      value = "Handles login requests.", 
      notes = "Authenticates the user and generates a JWT token.")
  public ResponseEntity<?> login(@RequestBody LoginDetails loginRequest) {
    logger.info("Login request received for: {}", loginRequest.getEmail());
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
          loginRequest.getEmail(),
          loginRequest.getPassword()));
    } catch (BadCredentialsException e) {
      logger.error("Bad credentials for: {}", loginRequest.getEmail(), e);
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body("Invalid email or password.");
    } 
    final CustomUserDetails userDetails = (CustomUserDetails) 
        userDetailsService.loadUserByUsername(loginRequest.getEmail());    
    final String accessToken = jwtUtility.generateAccessToken(userDetails);
    final String refreshToken = refreshTokenService.generateRefreshToken(userDetails);
    logger.info("JWT tokens generated for: {}", loginRequest.getEmail());
    return ResponseEntity.ok(Map.of("accessToken", accessToken, "refreshToken", refreshToken));
  }

  /**
   * Handles refresh token requests by validating the refresh token and generating a new access token.
   *
   * @param refreshToken The refresh token to validate.
   * @return A response entity containing the new access token or an error message.
   */
  @PostMapping("/refresh-token")
  @ApiOperation(
      value = "Handles refresh token requests.",
      notes = "Validates the refresh token and generates a new access token.")
  public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenDetails refreshTokenDetails) {
    logger.info("Refresh token request received.");

    String refreshToken = refreshTokenDetails.getRefreshToken();

    if (refreshToken == null || refreshToken.isEmpty()) {
      logger.error("Refresh token is missing.");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("Refresh token is required.");
    }

    if (!refreshTokenService.validateRefreshToken(refreshToken)) {
      logger.error("Invalid refresh token.");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body("Invalid refresh token.");
    } 
    
    final CustomUserDetails userDetails = (CustomUserDetails) 
        userDetailsService.loadUserByUsername(jwtUtility.getUsernameFromToken(refreshToken));

    final String newAccessToken = jwtUtility.generateAccessToken(userDetails);

    logger.info("Generated new access token.");

    return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
  }

  /**
   * Handles logout requests by revoking the refresh token.
   *
   * @param refreshToken The refresh token to revoke.
   * @return A response entity indicating the logout status.
   */
  @DeleteMapping("/revoke-token")
  @ApiOperation(
      value = "Handles logout requests.", 
      notes = "Invalidates the refresh token and logs out the user.")
  public ResponseEntity<?> revoke(@Valid @RequestBody RefreshTokenDetails refreshTokenDetails) {
    logger.info("Request to revoke token received.");

    String refreshToken = refreshTokenDetails.getRefreshToken();

    if (refreshToken == null || refreshToken.isEmpty()) {
      logger.error("Refresh token is missing.");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("Refresh token is required.");
    }

    try {
      refreshTokenService.revokeRefreshToken(refreshToken);
      logger.info("Refresh token invalidated.");
      return ResponseEntity.ok("Token revoked.");
    } catch (Exception e) {
      logger.error("Error invalidating refresh token.", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Error logging out.");
    }
  }
}