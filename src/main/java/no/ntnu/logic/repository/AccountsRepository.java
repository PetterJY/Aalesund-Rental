package no.ntnu.logic.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Accounts;

public interface AccountsRepository extends CrudRepository<Accounts, Long> {
  Optional<Accounts> findByEmail(String email);
}