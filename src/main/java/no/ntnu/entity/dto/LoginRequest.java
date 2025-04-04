package no.ntnu.entity.dto;

import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.NotBlank;

/**
 * LoginRequest is a data transfer object that represents the login request from a user.
 * It contains the user's email and password.
 */
public class LoginRequest {
	@NotBlank(message = "Email is required")
	@ApiModelProperty("The email of the user")
  private String email;

	@NotBlank(message = "Password is required")
	@ApiModelProperty("The password of the user")
  private String password;

  public String getEmail() {
		return email;
  }

  public void setEmail(String email) {
		this.email = email;
  }

  public String getPassword() {
		return password;
  }

  public void setPassword(String password) {
		this.password = password;
  }
}