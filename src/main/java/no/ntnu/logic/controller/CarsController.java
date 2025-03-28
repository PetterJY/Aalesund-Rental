package no.ntnu.logic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.CarsRepository;

@RestController
public class CarsController {
  @Autowired
  private CarsRepository carsRepository;
}
