package no.ntnu.logic.repository;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Cars;

public interface CarsRepository extends CrudRepository<Cars, Long> {
  List<Cars> findByProviderId(Long providerId);

  List<Cars> findByCarTypeInAndTransmissionInAndPassengersGreaterThanEqual(List<String> carTypeParam, List<Cars.Transmission> transmissionParam, int passengersParam,
                                                                           Pageable pageable);
}
