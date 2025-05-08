package no.ntnu.entity.dto;

import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * UserDetails is a data transfer object that represents the registration request from a user.
 * It contains the user's first name, last name, email, and password.
 */
public class UserDetails {
	@NotBlank(message = "First name is required")
	@Size(min = 2, max = 30, message = "First name must be between 2 and 30 characters")
	@ApiModelProperty("The first name of the user")
  private String firstName;

	@NotBlank(message = "Last name is required")
	@Size(min = 2, max = 30, message = "Last name must be between 2 and 30 characters")
	@ApiModelProperty("The last name of the user")
  private String lastName;

	@NotBlank(message = "Email is required")
	@Email(message = "Email must be valid")
  private String email;
	
	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password must contain at least 8 characters")
	@ApiModelProperty("The password of the user")
  private String password;

	@NotBlank(message = "Phone number is required")
	@Size(min = 8,message = "Phone number must contain at least 8 characters")
	@ApiModelProperty("The phone number of the user")
	private String phoneNumber;

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}
}