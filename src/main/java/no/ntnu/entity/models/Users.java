package no.ntnu.entity.models;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

/**
 * Represents a user entity in the system.
 * This class is part of the entity layer and is used to map to the database.
 * It contains fields for the user's ID, first name, last name, email, and associated account.
 */
@Entity
public class Users extends Accounts {

  @Column(nullable = false)
  @ApiModelProperty("The first name of the user")
  private String firstName;

  @Column(nullable = false)
  @ApiModelProperty("The last name of the user")
  private String lastName;

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
}