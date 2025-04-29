package no.ntnu.logic.repository;

import java.util.Optional;
import no.ntnu.entity.models.Users;
import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Providers;

public interface ProvidersRepository extends CrudRepository<Providers, Long> {
  Optional<Providers> findByEmail(String email);
}