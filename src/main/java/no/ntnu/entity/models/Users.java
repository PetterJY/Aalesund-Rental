package no.ntnu.entity.models;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

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

  @Column(nullable = false)
  @ApiModelProperty("The phone number of the user")
  private String phoneNumber;

  public Users() {
    super(Role.USER);
  }

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