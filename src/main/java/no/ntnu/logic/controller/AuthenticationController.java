package no.ntnu.logic.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.dto.AuthenticationResponse;
import no.ntnu.entity.dto.LoginRequest;
import no.ntnu.security.JwtUtility;

/**
 * Class responsible for handling:
 * login requests, authentication, and other authentication-related endpoints.
 */
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
  private static final Logger logger = 
      LoggerFactory.getLogger(AuthenticationController.class.getSimpleName());

  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private UserDetailsService userDetailsService;
  @Autowired
  private JwtUtility jwtUtility;
  
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
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    logger.info("Login request received for: {}", loginRequest.getEmail());
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
          loginRequest.getEmail(),
          loginRequest.getPassword()));
    } catch (BadCredentialsException e) {
      logger.error("Bad credentials for: {}", loginRequest.getEmail(), e);
      return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
    } 
    final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
    final String jwt = jwtUtility.generateToken(userDetails);
    logger.info("JWT token generated for: {}", loginRequest.getEmail());
    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<?> refreshToken() {
    //TODO: Implement this
    return null;
  }
}
