package no.ntnu.entity.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.Email;

/**
 * RegisterRequest is a data transfer object that represents the registration request from a user.
 * It contains the user's first name, last name, role, email, and password.
 */
public class RegisterRequest {
	@NotBlank(message = "First name is required")
	@Size(min = 2, max = 30, message = "First name must be between 2 and 30 characters")
	@ApiModelProperty("The first name of the user")
  private String firstName;

	@NotBlank(message = "Last name is required")
	@Size(min = 6, max = 30, message = "Last name must be between 6 and 30 characters")
	@ApiModelProperty("The last name of the user")
  private String lastName;

	@NotBlank(message = "Role is required")
	@ApiModelProperty("The role of the user (e.g., admin, provider, renter)")
  private String role;

	@NotBlank(message = "Email is required")
	@Email(message = "Email must be valid")
  private String email;
	
	@NotBlank(message = "Password is required")
	@Size(min = 6, max = 30, message = "Password must be between 6 and 30 characters")
	@ApiModelProperty("The password of the user")
  private String password;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

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