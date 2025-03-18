package no.ntnu.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Rentals {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long rentalId;

  @ManyToOne
  @JoinColumn(name = "renter_id", referencedColumnName = "id")
  private Accounts renter;

  @ManyToOne
  @JoinColumn(name = "provider_id", referencedColumnName = "id")
  private Providers provider;

  @ManyToOne
  @JoinColumn(name = "car_id", referencedColumnName = "id")
  private Cars car;

  @Column(nullable = false)
  private LocalDateTime startDate;

  @Column(nullable = false)
  private LocalDateTime endDate;

  @Column(nullable = false)
  private String pickupLocation;

  @Column(nullable = false)
  private String dropoffLocation;

  @Column(nullable = false)
  private int totalCost;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private Status status = Status.PENDING;

  public enum Status {
    PENDING, ACTIVE, COMPLETED, CANCELED
  }

  public Long getRentalId() {
    return rentalId;
  }

  public void setRentalId(Long rentalId) {
    this.rentalId = rentalId;
  }

  public Accounts getRenter() {
    return renter;
  }

  public void setRenter(Accounts renter) {
    this.renter = renter;
  }

  public Providers getProvider() {
    return provider;
  }

  public void setProvider(Providers provider) {
    this.provider = provider;
  }

  public Cars getCar() {
    return car;
  }

  public void setCar(Cars car) {
    this.car = car;
  }

  public LocalDateTime getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDateTime startDate) {
    this.startDate = startDate;
  }

  public LocalDateTime getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDateTime endDate) {
    this.endDate = endDate;
  }

  public String getPickupLocation() {
    return pickupLocation;
  }

  public void setPickupLocation(String pickupLocation) {
    this.pickupLocation = pickupLocation;
  }

  public String getDropoffLocation() {
    return dropoffLocation;
  }

  public void setDropoffLocation(String dropoffLocation) {
    this.dropoffLocation = dropoffLocation;
  }

  public int getTotalCost() {
    return totalCost;
  }

  public void setTotalCost(int totalCost) {
    this.totalCost = totalCost;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }
}
