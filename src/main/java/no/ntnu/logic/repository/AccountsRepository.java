package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.Accounts;

public interface AccountsRepository extends CrudRepository<Accounts, Long> {
}
