package no.ntnu.entity.models;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.PrePersist;

/**
 * Represents an account entity in the system.
 * This class is part of the entity layer and is used to map to the database.
 * It contains fields for the account's ID, role, password, and creation time.
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Accounts {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(description = "The ID of the account")
  private Long id;

  @Column(nullable = false, unique = true)
  @Schema(description = "The email of the account")
  private String email;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  @Schema(description = "The role of the account")
  private final Role role;

  @Column(nullable = false)
  @Schema(description = "The password of the account")
  private String password;

  @Column(nullable = false)
  @Schema(description = "The creation time of the account")
  private LocalDateTime createdAt;

  @Column(nullable = false)
  @Schema(description = "Boolean indicating if the account is deleted")
  private boolean isDeleted = false;
  
  /**
   * Default constructor for the Accounts class.
   * Initializes the role to ROLE_USER.
   */
  public Accounts() {
    this.role = Role.ROLE_USER;
  }

  /**
   * Enum representing the different roles an account can have.
   * ROLE_ADMIN: Represents an administrator account.
   * ROLE_PROVIDER: Represents a provider account.
   * ROLE_USER: Represents a regular user account.
   */
  public enum Role {
    ROLE_ADMIN, ROLE_PROVIDER, ROLE_USER
  }


  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
  }

  public Accounts(Role role) {
    this.role = role;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }


  public Role getRole() {
    return this.role;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

    public LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public boolean isDeleted() {
    return this.isDeleted;
  }

  public void setDeleted(boolean isDeleted) {
    this.isDeleted = isDeleted;
  }
}