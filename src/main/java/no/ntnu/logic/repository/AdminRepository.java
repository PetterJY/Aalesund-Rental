package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Admins;

public interface AdminRepository extends CrudRepository<Admins, Long> {
}