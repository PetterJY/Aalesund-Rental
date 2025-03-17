package no.ntnu.entity;

import jakarta.persistence.*;

@Entity
public class CarsExtraFeatures {
  @EmbeddedId
  private CarsExtraFeaturesId id = new CarsExtraFeaturesId();

  @ManyToOne
  @MapsId("carId") // Links carId from CarsExtraFeaturesId
  @JoinColumn(name = "car_id")
  private Cars car;

  @ManyToOne
  @MapsId("extraFeatureId") // Links extraFeatureId from CarsExtraFeaturesId
  @JoinColumn(name = "extra_feature_id")
  private ExtraFeatures extraFeature;

  public CarsExtraFeaturesId getId() {
    return id;
  }

  public void setId(CarsExtraFeaturesId id) {
    this.id = id;
  }

  public Cars getCar() {
    return car;
  }

  public void setCar(Cars car) {
    this.car = car;
    this.id.setCarId(car.getId()); // Sync ID
  }

  public ExtraFeatures getExtraFeature() {
    return extraFeature;
  }

  public void setExtraFeature(ExtraFeatures extraFeature) {
    this.extraFeature = extraFeature;
    this.id.setExtraFeatureId(extraFeature.getId()); // Sync ID
  }
}

@Embeddable
class CarsExtraFeaturesId implements java.io.Serializable {
  private int carId;
  private int extraFeatureId;

  public int getCarId() {
    return carId;
  }

  public void setCarId(int carId) {
    this.carId = carId;
  }

  public int getExtraFeatureId() {
    return extraFeatureId;
  }

  public void setExtraFeatureId(int extraFeatureId) {
    this.extraFeatureId = extraFeatureId;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    CarsExtraFeaturesId that = (CarsExtraFeaturesId) o;
    return carId == that.carId && extraFeatureId == that.extraFeatureId;
  }

  @Override
  public int hashCode() {
    return 31 * carId + extraFeatureId;
  }
}
