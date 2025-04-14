package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.models.ExtraFeatures;
import no.ntnu.logic.service.ExtraFeaturesService;

/**
 * Controller for managing extra-feature-related operations.
 */
@RestController
@RequestMapping("/extra-features")
public class ExtraFeaturesController {

  private final ExtraFeaturesService extraFeaturesService;
  private static final Logger logger 
      = LoggerFactory.getLogger(ExtraFeaturesController.class.getSimpleName());

  @Autowired
  public ExtraFeaturesController(ExtraFeaturesService extraFeaturesService) {
    this.extraFeaturesService = extraFeaturesService;
  }

  /**
   * Returns all extra-features.
   *
   * @return List of all extra features.
   */
  @GetMapping
  @ApiOperation(value = "Returns all extra features.")
  public ResponseEntity<List<ExtraFeatures>> getAllExtraFeatures() {
    logger.info("Fetching all extra features");
    List<ExtraFeatures> extraFeatures = extraFeaturesService.findAll();
    logger.debug("Fetched {} extra features", extraFeatures.size());
    return ResponseEntity.status(HttpStatus.OK).body(extraFeatures);
  }

  /**
   * Returns an extra-feature by its ID.
   *
   * @param id The ID of the extra feature.
   * @return The extra feature with the specified ID.
   */
  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an extra feature by its ID.", 
      notes = "If the extra feature is not found, a 404 error is returned.")
  public ResponseEntity<ExtraFeatures> getExtraFeatureById(@PathVariable Long id) {
    logger.info("Fetching extra feature with id: {}", id);
    ExtraFeatures extraFeature = extraFeaturesService.findById(id);
    logger.debug("Fetched extra feature: {}", extraFeature);
    return ResponseEntity.status(HttpStatus.OK).body(extraFeature);
  }

  /**
   * Creates a new extra-feature.
   *
   * @param extraFeature The extra feature to create.
   * @return The created extra feature.
   */
  @PostMapping
  @ApiOperation(value = "Creates a new extra feature.", 
      notes = "The newly created extra feature is returned.")
  public ResponseEntity<ExtraFeatures> createExtraFeature(@RequestBody ExtraFeatures extraFeature) {
    logger.info("Creating new extra feature");
    ExtraFeatures createdExtraFeature = extraFeaturesService.save(extraFeature);
    logger.debug("Created extra feature: {}", createdExtraFeature);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdExtraFeature);
  }

  /**
   * Updates an existing extra-feature.
   *
   * @param id The ID of the extra feature to update.
   * @param extraFeatureDetails The updated details of the extra feature.
   * @return The updated extra feature.
   */
  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an extra feature by its ID.", 
      notes = "If the extra feature is not found, a 404 error is returned.")
  public ResponseEntity<ExtraFeatures> updateExtraFeature(
      @PathVariable Long id, @RequestBody ExtraFeatures extraFeatureDetails) {
    logger.info("Updating extra feature with id: {}", id);
    ExtraFeatures extraFeature = extraFeaturesService.findById(id);
    extraFeature.setName(extraFeatureDetails.getName());
    extraFeature.setDescription(extraFeatureDetails.getDescription());
    // TODO: Add validation for details && handle exceptions
    ExtraFeatures updatedExtraFeature = extraFeaturesService.save(extraFeature);
    logger.debug("Updated extra feature: {}", updatedExtraFeature);
    return ResponseEntity.status(HttpStatus.OK).body(updatedExtraFeature);
  }

  /**
   * Deletes an extra-feature by its ID.
   *
   * @param id The ID of the extra feature to delete.
   * @return Response entity with status NO_CONTENT.
   */
  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an extra feature by its ID.", 
      notes = "If the extra feature is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteExtraFeature(@PathVariable Long id) {
    logger.info("Deleting extra feature with id: {}", id);
    extraFeaturesService.deleteById(id);
    logger.debug("Deleted extra feature with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}