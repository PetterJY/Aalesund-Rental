package no.ntnu.entity.dto;

import java.util.Set;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import no.ntnu.entity.models.Cars;

/**
 * CarDetails is a data transfer object.
 * It represents the registration request for a car.
 */
public class CarDetails {

  @NotNull(message = "Provider ID is required")
  private Long providerId;

  @NotBlank(message = "Plate number is required")
  @Size(min = 4, max = 10, message = "Plate number must be between 1 and 10 characters")
  private String plateNumber;

  @NotBlank(message = "Car brand is required")
  private String carBrand;

  @NotBlank(message = "Model name is required")
  private String modelName;

  @NotBlank(message = "Car type is required")
  private Cars.CarType carType;

  @NotNull(message = "Price per day is required")
  @Positive(message = "Price per day must be a positive value")
  private int pricePerDay;

  @NotNull(message = "Production year is required")
  @Min(value = 1900, message = "Production year must be at least 1900")
  @Max(value = 2100, message = "Production year must not exceed 2100")
  private int productionYear;

  @NotNull(message = "Number of passengers is required")
  @Min(value = 1, message = "Number of passengers must be at least 1")
  @Max(value = 24, message = "Number of passengers must not exceed 24")
  private Byte passengers;

  @NotNull(message = "Transmission-type field is required")
  private Cars.Transmission transmission;

  @NotNull(message = "Energy source is required")
  private Cars.EnergySource energySource;

  private Boolean available;

  private Set<Long> extraFeatureIds;

  public Long getProviderId() {
    return providerId;
  }

  public String getPlateNumber() {
    return plateNumber;
  }

  public String getCarBrand() {
    return carBrand;
  }

  public String getModelName() {
    return modelName;
  }

  public Cars.CarType getCarType() {
    return carType;
  }

  public int getPricePerDay() {
    return pricePerDay;
  }

  public int getProductionYear() {
    return productionYear;
  }

  public Byte getPassengers() {
    return passengers;
  }

  public Cars.Transmission getTransmission() {
    return transmission;
  }

  public Cars.EnergySource getEnergySource() {
    return energySource;
  }

  public Boolean isAvailable() {
    return available;
  }

  public void setAvailable(Boolean available) {
    this.available = available;
  }

  public Set<Long> getExtraFeatureIds() {
    return extraFeatureIds;
  }
}