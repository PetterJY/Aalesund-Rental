package no.ntnu.entity.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import no.ntnu.entity.models.Rentals;
 /**
 * RentalRequest is a data transfer object.
 * It represents the registration request for a rental.
 */

 
public class RentalRequest {
  @NotNull(message = "Renter ID is required")
  private Long renterId;

  @NotNull(message = "Provider ID is required")
  private Long providerId;

  @NotNull(message = "Car ID is required")
  private int carId;

  @NotNull(message = "Start date is required")
  private LocalDateTime startDate;

  @NotNull(message = "End date is required")
  private LocalDateTime endDate;

  @NotNull(message = "Pickup location is required")
  private String pickupLocation;

  @NotNull(message = "Drop-off location is required")
  private String dropoffLocation;

  @NotNull(message = "Total cost is required")
  private Double totalCost;

  @NotNull(message = "Status is required")
  private Rentals.Status status;

  public Long getRenterId() {
    return renterId;
  }

  public void setRenterId(Long renterId) {
    this.renterId = renterId;
  }

  public Long getProviderId() {
    return providerId;
  }

  public void setProviderId(Long providerId) {
    this.providerId = providerId;
  }

  public int getCarId() {
    return carId;
  }

  public void setCarId(int carId) {
    this.carId = carId;
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

  public Double getTotalCost() {
    return totalCost;
  }

  public void setTotalCost(Double totalCost) {
    this.totalCost = totalCost;
  }

  public Rentals.Status getStatus() {
    return status;
  }

  public void setStatus(Rentals.Status status) {
    this.status = status;
  }
 }