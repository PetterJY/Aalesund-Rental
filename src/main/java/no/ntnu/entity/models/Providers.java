package no.ntnu.entity.models;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

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

  public String getCompanyName() {
    return companyName;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }
}
