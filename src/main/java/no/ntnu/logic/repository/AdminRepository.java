package no.ntnu.logic.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Admins;

public interface AdminRepository extends CrudRepository<Admins, Long> {

  Optional<Admins> findByName(String name);
}