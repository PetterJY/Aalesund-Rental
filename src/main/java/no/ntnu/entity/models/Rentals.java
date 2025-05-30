package no.ntnu.entity.models;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * Represents a rental entity in the system.
 * This class is part of the entity layer and is used to map to the database.
 * It contains fields for the rental's ID, renter, provider, car, start date,
 * end date, pickup location, drop-off location, total cost, and status.
 */
@Entity
public class Rentals {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(description = "The ID of the rental")
  private Long rentalId;

  @ManyToOne
  @JoinColumn(name = "renter_id", referencedColumnName = "id", nullable = false)
  @Schema(description = "The account of the renter")
  private Users renter;

  @ManyToOne
  @JoinColumn(name = "provider_id", referencedColumnName = "id", nullable = false)
  @Schema(description = "The provider of the rental")
  private Providers provider;

  @ManyToOne
  @JoinColumn(name = "car_id", referencedColumnName = "id", nullable = false)
  @Schema(description = "The car of the rental")
  private Cars car;

  @Column(nullable = false)
  @Schema(description = "The start date of the rental")
  private LocalDateTime startDate;

  @Column(nullable = false)
  @Schema(description = "The end date of the rental")
  private LocalDateTime endDate;

  @Column(nullable = false)
  @Schema(description = "The pickup location of the rental")
  private String pickupLocation;

  @Column(nullable = false)
  @Schema(description = "The drop-off location of the rental")
  private String dropoffLocation;

  @Column(nullable = false)
  @Schema(description = "The total cost of the rental")
  private Double totalCost;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  @Schema(description = "The status of the rental")
  private Status status = Status.PENDING;

  /**
   * The status of the rental.
   * PENDING: The rental is pending.
   * ACTIVE: The rental is active.
   * COMPLETED: The rental is completed.
   * CANCELLED: The rental is cancelled.
   */
  public enum Status {
    PENDING, ACTIVE, COMPLETED, CANCELLED
  }

  public Long getRentalId() {
    return rentalId;
  }
  // TODO: Change method name to getId?

  public void setRentalId(Long rentalId) {
    this.rentalId = rentalId;
  }
  // TODO: Change method name to setId?

  public Users getRenter() {
    return renter;
  }

  public void setRenter(Users renter) {
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

  public double getTotalCost() {
    return totalCost;
  }

  public void setTotalCost(Double totalCost) {
    this.totalCost = totalCost;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }
}
