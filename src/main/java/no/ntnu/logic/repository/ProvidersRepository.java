package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Providers;

public interface ProvidersRepository extends CrudRepository<Providers, Long> {
}