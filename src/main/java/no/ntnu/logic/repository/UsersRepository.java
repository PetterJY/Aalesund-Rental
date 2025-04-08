package no.ntnu.logic.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Users;

public interface UsersRepository extends CrudRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
}