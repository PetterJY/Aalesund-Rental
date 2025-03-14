package no.ntnu.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CarsExtraFeatures {
  @EmbeddedId
  private CarsExtraFeaturesId id;

  @ManyToOne
  @JoinColumn(name = "car_id", insertable = false, updatable = false)
  private Cars car;

  @ManyToOne
  @JoinColumn(name = "extra_feature_id", insertable = false, updatable = false)
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
  }

  public ExtraFeatures getExtraFeature() {
    return extraFeature;
  }

  public void setExtraFeature(ExtraFeatures extraFeature) {
    this.extraFeature = extraFeature;
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

    if (carId != that.carId) return false;
    return extraFeatureId == that.extraFeatureId;
  }

  @Override
  public int hashCode() {
    int result = carId;
    result = 31 * result + extraFeatureId;
    return result;
  }
}