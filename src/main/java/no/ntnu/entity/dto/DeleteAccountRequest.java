package no.ntnu.entity.dto;

import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.NotBlank;

/**
 * DeleteAccountRequest is a data transfer object that represents
 * the request of deleting a user's own account.
 * It contains the user's email and password.
 */
public class DeleteAccountRequest {
  @NotBlank(message = "Email is required")
  @ApiModelProperty("The email of the user")
  private String email;

  @NotBlank(message = "Password is required")
  @ApiModelProperty("The password of the user")
  private String password;

  public String getEmail() {
    return email;
  }


  public String getPassword() {
    return password;
  }
}