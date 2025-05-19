package no.ntnu.entity.dto;

import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.NotBlank;

/**
 * AccountDetails is a data transfer object that holds the password of an account.
 * Is implemented when a user wants to delete their account.
 */
public class DeleteAccountRequest {
  @NotBlank(message = "Password is required")
  @ApiModelProperty("The password of the user")
  private String password;

  public String getPassword() {
    return password;
  }
}