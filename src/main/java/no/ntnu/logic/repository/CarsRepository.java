package no.ntnu.logic.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.entity.models.Cars;
import org.springframework.data.jpa.repository.Query;

public interface CarsRepository extends JpaRepository<Cars, Long> {
  List<Cars> findByProviderId(Long providerId);

  @Query("SELECT c FROM Cars c LEFT JOIN Rentals r " +
      "WHERE c.carType IN :carTypeParam " +
      "AND c.transmission IN :transmissionParam " +
      "AND c.passengers >= :passengersParam " +
      "AND c.energySource IN :energySourceParam " +
      "AND c.pricePerDay BETWEEN :minPricePerDayParam AND :maxPricePerDayParam " +
      "AND c.location IN :pickUpLocation " +
      "AND (r IS NULL OR (r.startDate NOT BETWEEN :startDateParam AND :endDateParam AND r.endDate NOT BETWEEN :startDateParam AND :endDateParam))")
  List<Cars> findFilteredCars (
      List<Cars.CarType> carTypeParam,
      List<Cars.Transmission> transmissionParam,
      int passengersParam,
      List<Cars.EnergySource> energySourceParam,
      int minPricePerDayParam,
      int maxPricePerDayParam,
      Cars.Location pickupLocation,
      LocalDateTime pickupDateParam,
      LocalDateTime dropoffDateParam,
      Pageable pageable);
}
