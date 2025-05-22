package no.ntnu.logic.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import no.ntnu.entity.models.Cars;
import org.springframework.data.jpa.repository.Query;

public interface CarsRepository extends JpaRepository<Cars, Long> {
  List<Cars> findByProviderId(Long providerId);

@Query("SELECT DISTINCT c FROM Cars c " +
    "WHERE c.carType IN :carTypeParam " +
    "AND c.transmission IN :transmissionParam " +
    "AND c.passengers >= :passengersParam " +
    "AND c.energySource IN :energySourceParam " +
    "AND c.pricePerDay BETWEEN :minPricePerDayParam AND :maxPricePerDayParam " +
    "AND c.location = :pickupLocation " +
    "AND c.available = true " +
    "AND NOT EXISTS (" +
    "    SELECT r FROM Rentals r " +
    "    WHERE r.car = c " +
    "    AND r.status NOT IN ('COMPLETED', 'CANCELLED') " +
    "    AND r.startDate <= :dropoffDateParam " +
    "    AND r.endDate >= :pickupDateParam" +
    ") " +
    "AND (c.carBrand LIKE CONCAT('%', :search, '%') " +
    "OR c.modelName LIKE CONCAT('%', :search, '%') " +
    "OR CONCAT(c.carBrand, ' ', c.modelName) LIKE CONCAT('%', :search, '%')" +
    "OR CONCAT(c.modelName, ' ', c.carBrand) LIKE CONCAT('%', :search, '%'))")
List<Cars> findFilteredCars(
    List<Cars.CarType> carTypeParam,
    List<Cars.Transmission> transmissionParam,
    int passengersParam,
    List<Cars.EnergySource> energySourceParam,
    String search,
    int minPricePerDayParam,
    int maxPricePerDayParam,
    Cars.Location pickupLocation,
    LocalDateTime pickupDateParam,
    LocalDateTime dropoffDateParam,
    Pageable pageable);
}
