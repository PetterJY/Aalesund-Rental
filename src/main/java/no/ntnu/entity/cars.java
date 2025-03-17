package no.ntnu.entity;

import java.util.Set;

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
  private Providers provider;

  @Column(nullable = false, unique = true)
  private String plateNumber;

  @Column(nullable = false)
  private String carBrand;

  @Column(nullable = false)
  private String modelName;

  @Column(nullable = false)
  private String carType;

  @Column(nullable = false)
  private int pricePerDay;

  @Column(nullable = false)
  private int productionYear;

  @Column(nullable = false)
  private byte passengers;

  @Column(nullable = false)
  private boolean automatic;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private EnergySource energySource;

  @Column(nullable = false)
  private boolean available;

  @ManyToMany
  @JoinTable(
    name = "cars_extra_features",
    joinColumns = @JoinColumn(name = "car_id"),
    inverseJoinColumns = @JoinColumn(name = "extra_feature_id")
  )
  private Set<ExtraFeatures> extraFeatures;

  public enum EnergySource {
    GAS, DIESEL, HYBRID, ELECTRIC
  }

  public int getId() {
    return id;
  }
}