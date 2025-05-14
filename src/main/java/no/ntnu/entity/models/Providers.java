package no.ntnu.entity.models;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

/**
 * Represents a provider entity in the system.
 * This class is part of the entity layer and is used to map to the database.
 * It contains fields for the provider's ID, email, company name, and associated account.
 */
@Entity
public class Providers extends Accounts {
  @Column(nullable = false)
  @ApiModelProperty("The name of the company of the provider")
  private String companyName;

  @Column(nullable = false)
  @ApiModelProperty("The phone number of the provider's business")
  private String phoneNumber;

  public Providers() {
    super(Role.ROLE_PROVIDER);
  }

  public String getCompanyName() {
    return companyName;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }
}