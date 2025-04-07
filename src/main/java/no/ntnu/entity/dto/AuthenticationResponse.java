package no.ntnu.entity.dto;

/**
 * A class representing the response for authentication containing a JWT token.
 */
public class AuthenticationResponse {
  private final String jwt;

  public AuthenticationResponse(String jwt) {
    this.jwt = jwt;
  }

  public String getJwt() {
    return jwt;
  }
}