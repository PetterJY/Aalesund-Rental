package no.ntnu.logic.controller;

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

import io.swagger.annotations.ApiOperation;

import no.ntnu.entity.dto.AuthenticationResponse;
import no.ntnu.entity.dto.LoginRequest;
import no.ntnu.security.JwtUtility;

/**
 * Class responsible for handling:
 * login requests, authentication, and other authentication-related endpoints.
 */
@RequestMapping("/auth")
public class AuthenticationController {
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
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
          loginRequest.getEmail(),
          loginRequest.getPassword()));
    } catch (BadCredentialsException e) {
      return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
    }
    final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
    final String jwt = jwtUtility.generateToken(userDetails);
    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<?> refreshToken() {
    //TODO: Implement this
    return null;
  }
}
