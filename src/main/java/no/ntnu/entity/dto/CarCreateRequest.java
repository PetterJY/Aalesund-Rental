package no.ntnu.entity.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.util.Set;
import no.ntnu.entity.models.Cars;

/**
 * CarCreateRequest is a data transfer object.
 * It represents the registration request for a car.
 */
public class CarCreateRequest {

  @NotNull(message = "Provider ID is required")
  private Long providerId;

  @NotBlank(message = "Plate number is required")
  @Size(max = 20, message = "Plate number must not exceed 20 characters")
  private String plateNumber;

  @NotBlank(message = "Car brand is required")
  private String carBrand;

  @NotBlank(message = "Model name is required")
  private String modelName;

  @NotBlank(message = "Car type is required")
  private String carType;

  @NotNull(message = "Price per day is required")
  @Positive(message = "Price per day must be a positive value")
  private Integer pricePerDay;

  @NotNull(message = "Production year is required")
  @Positive(message = "Production year must be a positive value")
  private Integer productionYear;

  @NotNull(message = "Number of passengers is required")
  @Positive(message = "Number of passengers must be a positive value")
  private Byte passengers;

  @NotNull(message = "Automatic field is required")
  private Boolean automatic;

  @NotBlank(message = "Energy source is required")
  private Cars.EnergySource energySource;

  @NotNull(message = "Availability status is required")
  private Boolean available;

  @NotNull(message = "Extra features are required")
  private Set<Long> extraFeatureIds;


  public Long getProviderId() {
    return providerId;
  }

  public void setProviderId(Long providerId) {
    this.providerId = providerId;
  }

  public String getPlateNumber() {
    return plateNumber;
  }

  public void setPlateNumber(String plateNumber) {
    this.plateNumber = plateNumber;
  }

  public String getCarBrand() {
    return carBrand;
  }

  public void setCarBrand(String carBrand) {
    this.carBrand = carBrand;
  }

  public String getModelName() {
    return modelName;
  }

  public void setModelName(String modelName) {
    this.modelName = modelName;
  }

  public String getCarType() {
    return carType;
  }

  public void setCarType(String carType) {
    this.carType = carType;
  }

  public Integer getPricePerDay() {
    return pricePerDay;
  }

  public void setPricePerDay(Integer pricePerDay) {
    this.pricePerDay = pricePerDay;
  }

  public Integer getProductionYear() {
    return productionYear;
  }

  public void setProductionYear(Integer productionYear) {
    this.productionYear = productionYear;
  }

  public Byte getPassengers() {
    return passengers;
  }

  public void setPassengers(Byte passengers) {
    this.passengers = passengers;
  }

  public Boolean isAutomatic() {
    return automatic;
  }

  public void setAutomatic(Boolean automatic) {
    this.automatic = automatic;
  }

  public Cars.EnergySource getEnergySource() {
    return energySource;
  }

  public void setEnergySource(Cars.EnergySource energySource) {
    this.energySource = energySource;
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

  public void setExtraFeatureIds(Set<Long> extraFeatureIds) {
    this.extraFeatureIds = extraFeatureIds;
  }
}