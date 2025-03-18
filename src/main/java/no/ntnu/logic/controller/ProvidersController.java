package no.ntnu.logic.controller;

import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.ProvidersRepository;

@RestController
public class ProvidersController {
  private final ProvidersRepository providersRepository;

  public ProvidersController(ProvidersRepository providersRepository) {
    this.providersRepository = providersRepository;
  }
}
