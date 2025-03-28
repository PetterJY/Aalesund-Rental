package no.ntnu.logic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.ExtraFeaturesRepository;

@RestController
public class ExtraFeaturesController {
  @Autowired
  private ExtraFeaturesRepository extraFeaturesRepository;
}
