package no.ntnu.entity.models;

import java.util.Set;

import io.swagger.annotations.ApiModelProperty;
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
  @ApiModelProperty("The ID of the extra feature")
  private int id;

  @Column(nullable = false, length = 32)
  @ApiModelProperty("The name of the extra feature")
  private String name;

  @Column(length = 255)
  @ApiModelProperty("The description of the extra feature")
  private String description;

  @ManyToMany(mappedBy = "extraFeatures")
  @ApiModelProperty("The cars that have this extra feature")
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