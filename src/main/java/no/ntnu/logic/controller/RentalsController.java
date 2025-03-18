package no.ntnu.logic.controller;

import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.RentalsRepository;

@RestController
public class RentalsController {
  private final RentalsRepository rentalsRepository;

  public RentalsController(RentalsRepository rentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }
}
