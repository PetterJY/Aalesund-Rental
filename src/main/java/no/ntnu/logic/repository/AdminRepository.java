package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.Admin;

public interface AdminRepository extends CrudRepository<Admin, Long> {
}