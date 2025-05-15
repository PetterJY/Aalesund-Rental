package no.ntnu.logic.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.entity.models.Cars;
import org.springframework.data.jpa.repository.Query;

public interface CarsRepository extends JpaRepository<Cars, Long> {
  List<Cars> findByProviderId(Long providerId);

  @Query("SELECT DISTINCT c FROM Cars c LEFT JOIN Rentals r on c = r.car " +
      "WHERE c.carType IN :carTypeParam " +
      "AND c.transmission IN :transmissionParam " +
      "AND c.passengers >= :passengersParam " +
      "AND c.energySource IN :energySourceParam " +
      "AND c.pricePerDay BETWEEN :minPricePerDayParam AND :maxPricePerDayParam " +
      "AND c.location = :pickupLocation " +
      "AND (r IS NULL OR NOT (r.startDate < :dropoffDateParam AND r.endDate > :pickupDateParam)) " +
      "AND (:searchWords IS NULL OR " +
      " (UPPER(c.carBrand) LIKE UPPER(CONCAT('%', :searchWords, '%')) OR " +
      "  UPPER(c.modelName) LIKE UPPER(CONCAT('%', :searchWords, '%')))) ")
  List<Cars> findFilteredCars(
      List<Cars.CarType> carTypeParam,
      List<Cars.Transmission> transmissionParam,
      int passengersParam,
      List<Cars.EnergySource> energySourceParam,
      String searchWords,
      int minPricePerDayParam,
      int maxPricePerDayParam,
      Cars.Location pickupLocation,
      LocalDateTime pickupDateParam,
      LocalDateTime dropoffDateParam,
      Pageable pageable);
}
