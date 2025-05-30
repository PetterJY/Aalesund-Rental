package no.ntnu.entity.models;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

/**
 * Represents a car entity in the system.
 * This class is part of the entity layer and is used to map to the database.
 * It contains fields for the car's ID, provider, plate number, brand, model name,
 * type, price per day, production year, number of passengers, automatic/manual transmission,
 * energy source, availability status, and extra features.
 */
@Entity
public class Cars {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JoinColumn(name = "provider_id", referencedColumnName = "id")
  @Schema(description = "The provider of the car")
  private Providers provider;

  @Column(nullable = false, unique = true)
  @Schema(description = "The plate number of the car")
  private String plateNumber;

  @Column(nullable = false)
  @Schema(description = "The brand of the car")
  private String carBrand;

  @Column(nullable = false)
  @Schema(description = "The model name of the car")
  private String modelName;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  @Schema(description = "The type of the car")
  private CarType carType;

  @Column(nullable = false)
  @Schema(description = "The price per day of the car")
  private int pricePerDay;

  @Column(nullable = false)
  @Schema(description = "The production year of the car")
  private int productionYear;

  @Column(nullable = false)
  @Schema(description = "The number of passengers the car can carry")
  private int passengers;

  @Column(nullable = false)
  @Schema(description = "Whether the car is available or not")
  private boolean available;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  @Schema(description = "Whether the car's transmission type is automatic or manual")
  private Transmission transmission;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  @Schema(description = "The energy source of the car")
  private EnergySource energySource;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  @Schema(description = "The location of the car")
  private Location location;

  @ManyToMany
  @JoinTable(
    name = "cars_extra_features",
    joinColumns = @JoinColumn(name = "car_id"),
    inverseJoinColumns = @JoinColumn(name = "extra_feature_id")
  )
  @Schema(description = "The extra features of the car")
  @JsonManagedReference
  private Set<ExtraFeatures> extraFeatures;

  /**
   * Enum for the type of car.
   * Allowed values are SEDAN, HATCHBACK, SUV, TRUCK, COUPE, CONVERTIBLE,
   * LUXURY, MINIVAN, SPORTS, CROSSOVER, STATION_WAGON.
   */
  public enum CarType {
    SEDAN, HATCHBACK, SUV, TRUCK, COUPE, CONVERTIBLE, LUXURY, MINIVAN, SPORTS, CROSSOVER, STATION_WAGON;
  }

  /**
   * Enum for the energy source of the car.
   * Allowed values are GAS, DIESEL, HYBRID, ELECTRIC.
   */
  public enum EnergySource {
    GAS, DIESEL, HYBRID, ELECTRIC;
  }

  /**
   * Enum for the transmission type of the car.
   * Allowed values are AUTOMATIC, MANUAL.
   */
  public enum Transmission {
    AUTOMATIC, MANUAL;
  }

  /**
   * Enum for the location of the car.
   * Allowed values are OSLO, BERGEN, STAVANGER, TRONDHEIM, DRAMMEN,
   * LILLEHAMMER, ÅLESUND, TROMSØ. (May be extended in the future)
   */
  public enum Location {
    OSLO, BERGEN, STAVANGER, TRONDHEIM, DRAMMEN, LILLEHAMMER, ÅLESUND, TROMSØ;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Providers getProvider() {
    return provider;
  }

  public void setProvider(Providers provider) {
    this.provider = provider;
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

  public CarType getCarType() {
    return carType;
  }

  public void setCarType(CarType carType) {
    this.carType = carType;
  }

  public int getPricePerDay() {
    return pricePerDay;
  }

  public void setPricePerDay(int pricePerDay) {
    this.pricePerDay = pricePerDay;
  }

  public int getProductionYear() {
    return productionYear;  
  }

  public void setProductionYear(int productionYear) {
    this.productionYear = productionYear;
  }

  public int getPassengers() {
    return passengers;
  }

  public void setPassengers(byte passengers) {
    this.passengers = passengers;
  }

  public Transmission getTransmission() {
    return transmission;
  }

  public void setTransmission(Transmission transmission) {
    this.transmission = transmission;
  }

  public EnergySource getEnergySource() {
    return energySource;
  }

  public void setEnergySource(EnergySource energySource) {
    this.energySource = energySource;
  }

  public Location getLocation() {
    return location;
  }

  public void setLocation(Location location) {
    this.location = location;
  }

  public boolean isAvailable() {
    return available;
  }

  public void setAvailable(boolean available) {
    this.available = available;
  }

  public Set<ExtraFeatures> getExtraFeatures() {
    return extraFeatures;
  }

  public void setExtraFeatures(Set<ExtraFeatures> extraFeatures) {
    this.extraFeatures = extraFeatures;
  }
}