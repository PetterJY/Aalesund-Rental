package no.ntnu.logic.service;

import java.util.List;
import no.ntnu.entity.exceptions.ExtraFeatureNotFoundException;
import no.ntnu.entity.models.ExtraFeatures;
import no.ntnu.logic.repository.ExtraFeaturesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing extra features.
 */
@Service
public class ExtraFeaturesService {

  private static final Logger logger = LoggerFactory.getLogger(ExtraFeaturesService.class);
  private final ExtraFeaturesRepository extraFeaturesRepository;

  /**
   * Constructor for ExtraFeaturesService.
   *
   * @param extraFeaturesRepository the repository for extra features
   */
  @Autowired
  public ExtraFeaturesService(ExtraFeaturesRepository extraFeaturesRepository) {
    logger.info("ExtraFeaturesService initialized");
    this.extraFeaturesRepository = extraFeaturesRepository;
  }

  /**
   * Fetches all extra features.
   *
   * @return a list of all extra features
   */
  public List<ExtraFeatures> findAll() {
    logger.info("Fetching all extra features");
    return (List<ExtraFeatures>) extraFeaturesRepository.findAll();
  }

  /**
   * Fetches an extra feature by its ID.
   *
   * @param id the ID of the extra feature
   * @return the extra feature with the given ID
   * @throws ExtraFeatureNotFoundException if the extra feature is not found
   */
  public ExtraFeatures findById(Long id) throws ExtraFeatureNotFoundException {
    logger.info("Fetching extra feature with id: {}", id);
    return extraFeaturesRepository.findById(id)
      .orElseThrow(() -> new ExtraFeatureNotFoundException(
        "Extra feature not found with id: " + id));
  }

  /**
   * Saves an extra feature.
   *
   * @param extraFeature the extra feature to save
   * @return the saved extra feature
   */
  public ExtraFeatures save(ExtraFeatures extraFeature) {
    logger.info("Saving extra feature with id: {}", extraFeature.getId());
    return extraFeaturesRepository.save(extraFeature);
  }

  /**
   * Deletes an extra feature by its ID.
   *
   * @param id the ID of the extra feature to delete
   * @throws ExtraFeatureNotFoundException if the extra feature is not found
   */
  public void deleteById(Long id) throws ExtraFeatureNotFoundException {
    logger.info("Deleting extra feature with id: {}", id);
    if (!extraFeaturesRepository.existsById(id)) {
      throw new ExtraFeatureNotFoundException("Extra feature not found with id: " + id);
    }
    extraFeaturesRepository.deleteById(id);
  }
}