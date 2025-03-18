package no.ntnu.logic.controller;

import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.ExtraFeaturesRepository;

@RestController
public class ExtraFeaturesController {
  private final ExtraFeaturesRepository extraFeaturesRepository;

  public ExtraFeaturesController(ExtraFeaturesRepository extraFeaturesRepository) {
    this.extraFeaturesRepository = extraFeaturesRepository;
  }
}
