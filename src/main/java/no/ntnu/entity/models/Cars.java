package no.ntnu.entity.models;

import java.util.Set;
import io.swagger.annotations.ApiModelProperty;
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

@Entity
public class Cars {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  @JoinColumn(name = "provider_id", referencedColumnName = "id")
  @ApiModelProperty("The provider of the car")
  private Providers provider;

  @Column(nullable = false, unique = true)
  @ApiModelProperty("The plate number of the car")
  private String plateNumber;

  @Column(nullable = false)
  @ApiModelProperty("The brand of the car")
  private String carBrand;

  @Column(nullable = false)
  @ApiModelProperty("The model name of the car")
  private String modelName;

  @Column(nullable = false)
  @ApiModelProperty("The type of the car")
  private String carType;

  @Column(nullable = false)
  @ApiModelProperty("The price per day of the car")
  private int pricePerDay;

  @Column(nullable = false)
  @ApiModelProperty("The production year of the car")
  private int productionYear;

  @Column(nullable = false)
  @ApiModelProperty("The number of passengers the car can carry")
  private byte passengers;

  @Column(nullable = false)
  @ApiModelProperty("Whether the car is automatic or not")
  private boolean automatic;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  @ApiModelProperty("The energy source of the car")
  private EnergySource energySource;

  @Column(nullable = false)
  @ApiModelProperty("Whether the car is available or not")
  private boolean available;

  @ManyToMany
  @JoinTable(
    name = "cars_extra_features",
    joinColumns = @JoinColumn(name = "car_id"),
    inverseJoinColumns = @JoinColumn(name = "extra_feature_id")
  )
  @ApiModelProperty("The extra features of the car")
  private Set<ExtraFeatures> extraFeatures;

  /**
   * Enum for the energy source of the car.
   * Allowed values are GAS, DIESEL, HYBRID, ELECTRIC.
   */
  public enum EnergySource {
    GAS, DIESEL, HYBRID, ELECTRIC
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
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

  public String getCarType() {
    return carType;
  }

  public void setCarType(String carType) {
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

  public byte getPassengers() {
    return passengers;
  }

  public void setPassengers(byte passengers) {
    this.passengers = passengers;
  }

  public boolean isAutomatic() {
    return automatic;
  }

  public void setAutomatic(boolean automatic) {
    this.automatic = automatic;
  }

  public EnergySource getEnergySource() {
    return energySource;
  }

  public void setEnergySource(EnergySource energySource) {
    this.energySource = energySource;
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