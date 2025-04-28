package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

import no.ntnu.entity.models.Accounts;

public interface AccountsRepository extends CrudRepository<Accounts, Long> {

  Optional<Accounts> findByUsername(String username);
}