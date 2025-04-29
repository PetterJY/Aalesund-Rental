package no.ntnu.entity.dto;

import java.util.Set;

import jakarta.validation.constraints.NotNull;

/**
 * ExtraFeaturesRequest is a data transfer object.
 * It represents a request for extra features in the system.
 */
public class ExtraFeaturesRequest {
  @NotNull(message = "ID is required")
  private int id;

  @NotNull(message = "Name is required")
  private String name;

  @NotNull(message = "Description is required")
  private String description;

  private Set<Long> cars;

  public void setId(int id) {
    this.id = id;
  }
  public int getId() {
    return id;
  }

  public void setName(String name) {
    this.name = name;
  }
  public String getName() {
    return name;
  }

  public void setDescription(String description) {
    this.description = description;
  }
  public String getDescription(){
    return description;
  }

  public void setCars(Set<Long> cars) {
    this.cars = cars;
  }
  public Set<Long> getCars() {
    return cars;
  }
}
