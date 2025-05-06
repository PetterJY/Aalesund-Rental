package no.ntnu.entity.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * ProviderRegisterRequest is a data transfer object.
 * It represents the registration request from a provider.
 * It contains the provider's company name, email, role, and password.
 */
public class ProviderDetails {
  @NotBlank(message = "Company name is required")
  private String companyName;

  @NotBlank(message = "Email is required")
  @Email(message = "Email must be valid")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 8, message = "Password must contain at least 8 characters")
  private String password;

  @NotBlank(message = "Phone number is required")
  @Size(min = 8, message = "Phone number must contain at least 8 characters")
  private String phoneNumber;

  public String getCompanyName() {
    return companyName;
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