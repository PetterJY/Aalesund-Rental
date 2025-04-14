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
import no.ntnu.entity.models.Providers;
import no.ntnu.logic.service.ProvidersService;

/**
 * Controller for managing provider-related operations.
 */
@RestController
@RequestMapping("/providers")
public class ProvidersController {

  private final ProvidersService providersService;
  private static final Logger logger 
      = LoggerFactory.getLogger(ProvidersController.class.getSimpleName());

  @Autowired
  public ProvidersController(ProvidersService providersService) {
    this.providersService = providersService;
  }

  /**
   * Returns all providers.
   *
   * @return List of all providers.
   */
  @GetMapping
  @ApiOperation(value = "Returns all providers.")
  public ResponseEntity<List<Providers>> getAllProviders() {
    logger.info("Fetching all providers");
    List<Providers> providers = providersService.findAll();
    logger.debug("Fetched {} providers", providers.size());
    return ResponseEntity.status(HttpStatus.OK).body(providers);
  }

  /**
   * Returns a provider by its ID.
   *
   * @param id The ID of the provider.
   * @return The provider with the specified ID.
   */
  @GetMapping("/{id}")
  @ApiOperation(value = "Returns a provider by its ID.", 
      notes = "If the provider is not found, a 404 error is returned.")
  public ResponseEntity<Providers> getProviderById(@PathVariable Long id) {
    logger.info("Fetching provider with id: {}", id);
    Providers provider = providersService.findById(id);
    logger.debug("Fetched provider: {}", provider);
    return ResponseEntity.status(HttpStatus.OK).body(provider);
  }

  /**
   * Creates a new provider.
   *
   * @param provider The provider to create.
   * @return The created provider.
   */
  @PostMapping
  @ApiOperation(value = "Creates a new provider.", 
      notes = "The newly created provider is returned.")
  public ResponseEntity<Providers> createProvider(@RequestBody Providers provider) {
    logger.info("Creating new provider");
    Providers createdProvider = providersService.save(provider);
    logger.debug("Created provider: {}", createdProvider);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdProvider);
  }

  /**
   * Updates an existing provider.
   *
   * @param id The ID of the provider to update.
   * @param providerDetails The updated provider details.
   * @return The updated provider.
   */
  @PutMapping("/{id}")
  @ApiOperation(value = "Updates a provider by its ID.", 
      notes = "If the provider is not found, a 404 error is returned.")
  public ResponseEntity<Providers> updateProvider(
      @PathVariable Long id, @RequestBody Providers providerDetails) {
    logger.info("Updating provider with id: {}", id);
    Providers provider = providersService.findById(id);
    provider.setCompanyName(providerDetails.getCompanyName());
    provider.setEmail(providerDetails.getEmail());
    // TODO: Add phone number?
    // TODO: Add validation for details && handle exceptions
    Providers updatedProvider = providersService.save(provider);
    logger.debug("Updated provider: {}", updatedProvider);
    return ResponseEntity.status(HttpStatus.OK).body(updatedProvider);
  }

  /**
   * Deletes a provider by its ID.
   *
   * @param id The ID of the provider to delete.
   * @return A response entity with no content.
   */
  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes a provider by its ID.", 
      notes = "If the provider is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteProvider(@PathVariable Long id) {
    logger.info("Deleting provider with id: {}", id);
    providersService.deleteById(id);
    logger.debug("Deleted provider with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}