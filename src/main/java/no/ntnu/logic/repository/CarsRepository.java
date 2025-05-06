package no.ntnu.logic.repository;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Cars;

public interface CarsRepository extends JpaRepository<Cars, Long> {
  List<Cars> findByProviderId(Long providerId);

  List<Cars> findByCarTypeInAndTransmissionInAndPassengersGreaterThanEqual(
      List<Cars.CarType> carTypeParam,
      List<Cars.Transmission> transmissionParam,
      int passengersParam,
      Pageable pageable);
}
