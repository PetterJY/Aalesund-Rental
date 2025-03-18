package no.ntnu.logic.controller;

import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.CarsRepository;

@RestController
public class CarsController {
  private final CarsRepository carsRepository;

  public CarsController(CarsRepository carsRepository) {
    this.carsRepository = carsRepository;
  }
}
