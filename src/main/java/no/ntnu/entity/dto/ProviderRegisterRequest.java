package no.ntnu.entity.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * ProviderRegisterRequest is a data transfer object.
 * It represents the registration request from a provider.
 * It contains the provider's company name, email, role, and password.
 */
public class ProviderRegisterRequest {
  @NotBlank(message = "Company name is required")
  private String companyName;

  @NotBlank(message = "Email is required")
  @Email(message = "Email must be valid")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 8, message = "Password must contain at least 8 characters")
  private String password;

  @NotBlank(message = "Role is required")
  private String role = "provider";
  
  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }
  
  public String getCompanyName() {
    return companyName;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
    
  public String getEmail() {
    return email;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public void setPassword(String password) {
    this.password = password;
  }
  
  public String getPassword() {
    return password;
  }
}