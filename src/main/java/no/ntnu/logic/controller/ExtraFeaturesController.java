package no.ntnu.logic.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import no.ntnu.entity.dto.ExtraFeatureDetails;
import no.ntnu.entity.models.ExtraFeatures;
import no.ntnu.logic.service.ExtraFeaturesService;

/**
 * Controller for managing extra-feature-related operations.
 */
@RestController
@Tag(name = "Extra Features API", description = "API for managing extra-feature resources")
@RequestMapping("api/extra-features")
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
  @Operation(
      summary = "Returns all extra features.",
      description = "Returns a list of all available extra features")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Extra features found"),
        @ApiResponse(responseCode = "204", description = "No extra features found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<List<ExtraFeatures>> getAllExtraFeatures() {
    try {
    logger.info("Fetching all extra features");
    List<ExtraFeatures> extraFeatures = extraFeaturesService.findAll();
    if (extraFeatures.isEmpty()) {
        logger.warn("No extra features found");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    logger.debug("Fetched {} extra features", extraFeatures.size());
    return ResponseEntity.status(HttpStatus.OK).body(extraFeatures);
    } catch (Exception e) {
        logger.error("Error fetching extra features: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Returns an extra-feature by its ID.
   *
   * @param id The ID of the extra feature.
   * @return The extra feature with the specified ID.
   */
  @GetMapping("/{id}")
  @Operation(
      summary = "Get an extra feature by its ID",
      description = "Retrieves the extra feature with the specified ID")
  public ResponseEntity<ExtraFeatures> getExtraFeatureById(
        @Parameter(
            description = "ID of the extra feature to be fetched",
            required = true)
      @PathVariable Long id) {
    try {
    logger.info("Fetching extra feature with id: {}", id);
    ExtraFeatures extraFeature = extraFeaturesService.findById(id);
    if (extraFeature == null) {
        logger.debug("Extra feature with id {} not found", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    logger.debug("Fetched extra feature: {}", extraFeature);
    return ResponseEntity.status(HttpStatus.OK).body(extraFeature);
    } catch (Exception e) {
        logger.error("Error fetching extra feature: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  /**
   * Creates a new extra-feature.
   *
   * @param extraFeature The extra feature to create.
   * @return The created extra feature.
   */
  @PostMapping
  @Operation(
      summary = "Creates a new extra feature.",
      description = "The newly created extra feature is returned.")
  @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Extra feature created"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<ExtraFeatures> createExtraFeature(
        @Parameter(
            description = "Details of the extra feature to be created",
            required = true)
      @RequestBody ExtraFeatureDetails extraFeature) {
    try {
    logger.info("Creating new extra feature");
    ExtraFeatures createdExtraFeature = new ExtraFeatures();
    createdExtraFeature.setName(extraFeature.getName());
    createdExtraFeature.setDescription(extraFeature.getDescription());
    extraFeaturesService.save(createdExtraFeature);
    logger.debug("Created extra feature: {}", createdExtraFeature);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdExtraFeature);
    } catch (Exception e) {
        logger.error("Error creating extra feature: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
  }

  /**
   * Updates an existing extra-feature.
   *
   * @param id The ID of the extra feature to update.
   * @param extraFeatureDetails The updated details of the extra feature.
   * @return The updated extra feature.
   */
  @PutMapping("/{id}")
  @Operation(
      summary = "Updates an extra feature by its ID.",
      description = "If the extra feature is not found, a 404 error is returned.")
  @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Extra feature updated"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "404", description = "Extra feature not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<ExtraFeatures> updateExtraFeature(
        @Parameter(
            description = "ID of the extra feature to be updated",
            required = true,
            example = "123")
      @PathVariable Long id,
        @Parameter(
            description = "Updated details of the extra feature",
            required = true)
        @RequestBody ExtraFeatureDetails extraFeatureDetails) {
    try {
    logger.info("Updating extra feature with id: {}", id);
    ExtraFeatures extraFeature = extraFeaturesService.findById(id);
    if (extraFeature == null) {
        logger.debug("Extra feature with id {} not found", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    extraFeature.setName(extraFeatureDetails.getName());
    extraFeature.setDescription(extraFeatureDetails.getDescription());
    ExtraFeatures updatedExtraFeature = extraFeaturesService.save(extraFeature);
    logger.debug("Updated extra feature: {}", updatedExtraFeature);
    return ResponseEntity.status(HttpStatus.OK).body(updatedExtraFeature);
    } catch (Exception e) {
        logger.error("Error updating extra feature: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  /**
   * Deletes an extra-feature by its ID.
   *
   * @param id The ID of the extra feature to delete.
   * @return Response entity with status NO_CONTENT.
   */
  @DeleteMapping("/{id}")
  @Operation(
      summary = "Deletes an extra feature by its ID.",
      description = "If the extra feature is not found, a 404 error is returned.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Extra feature deleted"),
            @ApiResponse(responseCode = "404", description = "Extra feature not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<Void> deleteExtraFeature(
        @Parameter(
            description = "ID of the extra feature to be deleted",
            required = true,
            example = "123")
      @PathVariable Long id) {
    try {
    logger.info("Deleting extra feature with id: {}", id);
    extraFeaturesService.deleteById(id);
    logger.debug("Deleted extra feature with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    } catch (Exception e) {
        logger.error("Error deleting extra feature: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}