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
public class Users {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ApiModelProperty("The ID of the user")
  private Long id;

  @Column(nullable = false)
  @ApiModelProperty("The first name of the user")
  private String firstName;

  @Column(nullable = false)
  @ApiModelProperty("The last name of the user")
  private String lastName;

  @Column(nullable = false, unique = true)
  @ApiModelProperty("The email of the user")
  private String email; 

  @OneToOne(cascade = CascadeType.ALL) 
  @JoinColumn(name = "id")
  @MapsId
  @ApiModelProperty("The account associated with the user")
  private Accounts account;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Accounts getAccount() {
    return account;
  }

  public void setAccount(Accounts account) {
    this.account = account;
  }
}