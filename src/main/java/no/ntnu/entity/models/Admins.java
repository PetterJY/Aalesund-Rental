package no.ntnu.entity.models;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Represents an admin entity in the system.
 * This class is part of the entity layer and is used to map to the database.
 * It contains fields for the admin's ID, name, and associated account.
 */
@Entity
public class Admins extends Accounts {

  @Column(nullable = false)
  @ApiModelProperty("The name of the admin")
  private String name;

  public Admins() {
    super(Role.ADMIN);
  }
  
  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}