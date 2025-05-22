package no.ntnu.entity.models;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

/**
 * Represents an admin entity in the system.
 * This class is part of the entity layer and is used to map to the database.
 * It contains fields for the admin's ID, name, and associated account.
 */
@Entity
public class Admins extends Accounts {

  @Column(nullable = false)
  @Schema(description = "The name of the admin")
  private String name;

  public Admins() {
    super(Role.ROLE_ADMIN);
  }
  
  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}