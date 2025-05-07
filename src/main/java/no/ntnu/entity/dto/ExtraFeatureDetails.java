package no.ntnu.entity.dto;

import java.util.Set;

import jakarta.validation.constraints.NotNull;

/**
 * ExtraFeaturesRequest is a data transfer object.
 * It represents a request for extra features in the system.
 */
public class ExtraFeatureDetails {
  @NotNull(message = "ID is required")
  private int id;

  @NotNull(message = "Name is required")
  private String name;

  @NotNull(message = "Description is required")
  private String description;

  private Set<Long> cars;

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription(){
    return description;
  }

  public Set<Long> getCars() {
    return cars;
  }
}
