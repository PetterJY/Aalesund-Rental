package no.ntnu.entity.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * RefreshTokenDetails is a data transfer object.
 * It represents the details of a refresh token.
 */
public class RefreshTokenDetails {
  @NotBlank(message = "Token is required")
  private String refreshToken;

  public String getRefreshToken() {
    return refreshToken;
  }
}