package no.ntnu.logic.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.ExtraFeatures;
import no.ntnu.entity.exceptions.ExtraFeatureNotFoundException;
import no.ntnu.logic.repository.ExtraFeaturesRepository;

@Service
public class ExtraFeaturesService {

  private static final Logger logger = LoggerFactory.getLogger(ExtraFeaturesService.class);
  private final ExtraFeaturesRepository extraFeaturesRepository;

  @Autowired
  public ExtraFeaturesService(ExtraFeaturesRepository extraFeaturesRepository) {
    logger.info("ExtraFeaturesService initialized");
    this.extraFeaturesRepository = extraFeaturesRepository;
  }

  public List<ExtraFeatures> findAll() {
    logger.info("Fetching all extra features");
    return (List<ExtraFeatures>) extraFeaturesRepository.findAll();
  }

  public ExtraFeatures findById(Long id) throws ExtraFeatureNotFoundException {
    logger.info("Fetching extra feature with id: {}", id);
    return extraFeaturesRepository.findById(id)
      .orElseThrow(() -> new ExtraFeatureNotFoundException("Extra feature not found with id: " + id));
  }

  public ExtraFeatures save(ExtraFeatures extraFeature) {
    logger.info("Saving extra feature with id: {}", extraFeature.getId());
    return extraFeaturesRepository.save(extraFeature);
  }

  public void deleteById(Long id) throws ExtraFeatureNotFoundException {
    logger.info("Deleting extra feature with id: {}", id);
    if (!extraFeaturesRepository.existsById(id)) {
      throw new ExtraFeatureNotFoundException("Extra feature not found with id: " + id);
    }
    extraFeaturesRepository.deleteById(id);
  }
}