package no.ntnu.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class ExtraFeatures {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(nullable = false, length = 32)
  private String name;

  @Column(length = 255)
  private String description;

  @ManyToMany(mappedBy = "extraFeatures")
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