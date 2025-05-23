package no.ntnu.entity.models;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

/**
 * Represents an extra feature entity in the system.
 * This class is part of the entity layer and is used to map to the database.
 * It contains fields for the extra feature's ID, name, description, and associated cars.
 */
@Entity
public class ExtraFeatures {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(description = "The ID of the extra feature")
  private int id;

  @Column(nullable = false, length = 32)
  @Schema(description = "The name of the extra feature")
  private String name;

  @Column(length = 255)
  @Schema(description = "The description of the extra feature")
  private String description;

  @ManyToMany(mappedBy = "extraFeatures")
  @Schema(description = "The cars that have this extra feature")
  @JsonBackReference
  private Set<Cars> cars;
  
  public void setId(int id) {
    this.id = id;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public void setDescription(String description) {
    this.description = description;
  }

  public void setCars(Set<Cars> cars) {
    this.cars = cars;
  }
  
  public int getId() {
    return id;
  }

  public String getDescription() {
    return description;
  }

  public String getName() {
    return name;
  }
  
  public Set<Cars> getCars() {
    return cars;
  }
}