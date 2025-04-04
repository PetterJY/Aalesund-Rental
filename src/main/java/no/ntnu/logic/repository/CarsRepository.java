package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Cars;

public interface CarsRepository extends CrudRepository<Cars, Long> {
}
