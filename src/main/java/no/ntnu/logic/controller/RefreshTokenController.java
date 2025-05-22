package no.ntnu.logic.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.validation.Valid;
import no.ntnu.entity.CustomUserDetails;
import no.ntnu.entity.dto.LoginDetails;
import no.ntnu.entity.dto.RefreshTokenDetails;
import no.ntnu.logic.service.RefreshTokenService;
import no.ntnu.security.JwtUtility;


/**
 * Class responsible for handling:
 * login requests, authentication, and other authentication-related endpoints.
 */
@RestController
@Tag(name = "Refresh Token API", description = "API for managing refresh tokens")
@RequestMapping("api/auth")
public class RefreshTokenController {
  private static final Logger logger =
      LoggerFactory.getLogger(RefreshTokenController.class.getSimpleName());

  private final AuthenticationManager authenticationManager;
  private final UserDetailsService userDetailsService;
  private final JwtUtility jwtUtility;
  private final RefreshTokenService refreshTokenService;

  /**
   * Constructor for RefreshTokenController.
   *
   * @param authenticationManager The authentication manager for handling authentication.
   * @param userDetailsService The user details service for loading user details.
   * @param jwtUtility The JWT utility for generating and validating tokens.
   * @param refreshTokenService The refresh token service for managing refresh tokens.
   */
  @Autowired
  public RefreshTokenController(
      AuthenticationManager authenticationManager,
      UserDetailsService userDetailsService,
      JwtUtility jwtUtility,
      RefreshTokenService refreshTokenService) {
    this.authenticationManager = authenticationManager;
    this.userDetailsService = userDetailsService;
    this.jwtUtility = jwtUtility;
    this.refreshTokenService = refreshTokenService;
  }

  /**
   * Handles login requests by authenticating the user and generating a JWT token.
   *
   * @param loginRequest The login request containing email and password.
   * @return A response entity containing the JWT token or an error message.
   */
  @PostMapping("/login")
  @Operation(
      summary = "Handles login requests.",
      description = "Authenticates the user and generates a JWT token.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Login successful"),
      @ApiResponse(responseCode = "401", description = "Invalid email or password"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<?> login(
      @Parameter(
          description = "Login request containing email and password",
          required = true)
      @RequestBody LoginDetails loginRequest) {
      logger.info("Login request received for: {}", loginRequest.getEmail());
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
          loginRequest.getEmail(),
          loginRequest.getPassword()));
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
   * @param refreshTokenDetails The refresh token to validate.
   * @return A response entity containing the new access token or an error message.
   */
  @PostMapping("/refresh-token")
  @Operation(
      summary = "Handles refresh token requests.",
      description = "Validates the refresh token and generates a new access token.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Refresh token valid, new access token generated"),
      @ApiResponse(responseCode = "401", description = "Invalid refresh token"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<?> refreshToken(
      @Parameter(description = "Refresh token details containing the refresh token", required = true)
      @Valid @RequestBody RefreshTokenDetails refreshTokenDetails) {
    logger.info("Refresh token request received.");

    String refreshToken = refreshTokenDetails.getRefreshToken();

    if (!refreshTokenService.isValidRefreshToken(refreshToken)) {
      logger.error("Invalid refresh token.");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token.");
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
   * @param refreshTokenDetails The refresh token to revoke.
   * @return A response entity indicating the logout status.
   */
  @DeleteMapping("/revoke-token")
  @Operation(
      summary = "Handles logout requests.",
      description = "Invalidates the refresh token and logs out the user.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Token revoked successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid refresh token"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<?> revoke(@Valid @RequestBody RefreshTokenDetails refreshTokenDetails) {
    logger.info("Request to revoke token received.");
    String refreshToken = refreshTokenDetails.getRefreshToken();

    if (refreshToken == null || refreshToken.isEmpty()) {
      logger.error("Refresh token is missing.");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("Refresh token is required.");
    }

    refreshTokenService.revokeRefreshToken(refreshToken);
    logger.info("Refresh token invalidated.");
    return ResponseEntity.ok("Token revoked.");
  }
}