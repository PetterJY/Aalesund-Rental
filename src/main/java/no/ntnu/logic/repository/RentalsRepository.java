package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Rentals;

public interface RentalsRepository extends CrudRepository<Rentals, Long> {
}