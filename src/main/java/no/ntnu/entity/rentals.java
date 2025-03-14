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
}
