package no.ntnu.logic.controller;

import java.util.List;
import java.util.Optional;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import no.ntnu.entity.ExtraFeatures;
import no.ntnu.logic.repository.ExtraFeaturesRepository;

@RestController
@RequestMapping("/extra-features")
public class ExtraFeaturesController {
  @Autowired
  private final ExtraFeaturesRepository extraFeaturesRepository;


  public ExtraFeaturesController(ExtraFeaturesRepository extraFeaturesRepository) {
    this.extraFeaturesRepository = extraFeaturesRepository;
  }

  /**
   * Returns all extra features.
   *
   * @return all the extra features.
   */
  @GetMapping
  @ApiOperation(value = "Returns all extra features.")
  public List<ExtraFeatures> getAllExtraFeatures() {
    return (List<ExtraFeatures>) extraFeaturesRepository.findAll();
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an extra feature by its ID.", notes = "If the extra feature is not found, a 404 error is returned.")
  public ResponseEntity<ExtraFeatures> getExtraFeatureById(@PathVariable long id) {
    Optional<ExtraFeatures> extraFeature = extraFeaturesRepository.findById(id);
    return extraFeature.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  @ApiOperation(value = "Creates a new extra feature.", notes = "The newly created extra feature is returned.")
  public ExtraFeatures createExtraFeature(@RequestBody ExtraFeatures extraFeature) {
    return extraFeaturesRepository.save(extraFeature);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an extra feature by its ID.", notes = "If the extra feature is not found, a 404 error is returned.")
  public ResponseEntity<ExtraFeatures> updateExtraFeature(@PathVariable long id, @RequestBody ExtraFeatures extraFeatureDetails) {
    Optional<ExtraFeatures> extraFeature = extraFeaturesRepository.findById(id);
    if (extraFeature.isPresent()) {
      ExtraFeatures updatedExtraFeature = extraFeature.get();
      updatedExtraFeature.setName(extraFeatureDetails.getName());
      updatedExtraFeature.setDescription(extraFeatureDetails.getDescription());
      updatedExtraFeature.setCars(extraFeatureDetails.getCars());
      return ResponseEntity.ok(extraFeaturesRepository.save(updatedExtraFeature));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an extra feature by its ID.", notes = "If the extra feature is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteExtraFeature(@PathVariable long id) {
    if (extraFeaturesRepository.existsById(id)) {
      extraFeaturesRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}