package no.ntnu.logic.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Cars;

public interface CarsRepository extends CrudRepository<Cars, Long> {
  public List<Cars> findByProviderId(Long providerId);
}
