package no.ntnu.entity.models;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

/**
 * Represents a user entity in the system.
 * This class is part of the entity layer and is used to map to the database.
 * It contains fields for the user's ID, first name, last name, email, and associated account.
 */
@Entity
public class Users extends Accounts {

  @Column(nullable = false)
  @Schema(description = "The first name of the user")
  private String firstName;

  @Column(nullable = false)
  @Schema(description = "The last name of the user")
  private String lastName;

  @Column(nullable = false)
  @Schema(description = "The phone number of the user")
  private String phoneNumber;

  @ManyToMany
  @JoinTable(
    name = "user_favourites",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "car_id")
  )
  private Set<Cars> favouriteCars;
  
  public Users() {
    super(Role.ROLE_USER);
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

  public Set<Cars> getFavouriteCars() {
    return favouriteCars;
  }

  public void setFavouriteCars(Set<Cars> favouriteCars) {
    this.favouriteCars = favouriteCars;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }
}