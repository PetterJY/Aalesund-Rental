package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Users;

public interface UsersRepository extends CrudRepository<Users, Long> {


}