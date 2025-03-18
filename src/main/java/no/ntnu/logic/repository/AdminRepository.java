package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.Admin;

public interface AdminRepository extends CrudRepository<Admin, Long> {
}