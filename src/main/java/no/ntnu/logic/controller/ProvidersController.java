package no.ntnu.logic.controller;

import java.util.List;

import no.ntnu.logic.service.AccountsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import no.ntnu.entity.dto.ProviderDetails;
import no.ntnu.entity.models.Providers;
import no.ntnu.logic.service.ProvidersService;

/**
 * Controller for managing provider-related operations.
 */
@RestController
@Tag(name = "Providers API", description = "API for managing provider resources")
@RequestMapping("/providers")
public class ProvidersController {

  private final ProvidersService providersService;
  private final AccountsService accountsService;

  private static final Logger logger
      = LoggerFactory.getLogger(ProvidersController.class.getSimpleName());

  @Autowired
  public ProvidersController(ProvidersService providersService, AccountsService accountsService) {
    this.providersService = providersService;
    this.accountsService = accountsService;
  }

  /**
   * Returns all providers.
   *
   * @return List of all providers.
   */
  @GetMapping
  @Operation(
      summary = "Get all providers",
      description = "Retrieves a list of all registered providers in the system")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "List of providers retrieved successfully"),
      @ApiResponse(responseCode = "204", description = "No providers found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<List<Providers>> getAllProviders() {
    try {
      logger.info("Fetching all providers");
      List<Providers> providers = providersService.findAll();
      if (providers.isEmpty()) {
        logger.warn("No providers found");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
      }
      logger.debug("Fetched {} providers", providers.size());
      return ResponseEntity.status(HttpStatus.OK).body(providers);
    } catch (Exception e) {
      logger.error("Error fetching providers: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  /**
   * Returns a provider by its ID.
   *
   * @param id The ID of the provider.
   * @return The provider with the specified ID.
   */
  @GetMapping("/{id}")
  @Operation(
      summary = "Get a provider by ID",
      description = "Retrieves the provider with the specified ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Provider found"),
      @ApiResponse(responseCode = "404", description = "Provider not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Providers> getProviderById(
      @Parameter(
          description = "ID of the provider to be fetched",
          required = true)
      @PathVariable Long id) {
    try {
      logger.info("Fetching provider with id: {}", id);
      Providers provider = providersService.findById(id);
      if (provider == null) {
        logger.debug("Provider with id {} not found", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
      }
      logger.debug("Fetched provider: {}", provider);
      return ResponseEntity.status(HttpStatus.OK).body(provider);
    } catch (Exception e) {
      logger.error("Error fetching provider: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }

  /**
   * Creates a new provider.
   *
   * @param providerRegisterRequest The provider registration request.
   * @return The created provider.
   */
  @PostMapping("/register")
  @Operation(
      summary = "Create a new provider",
      description = "Registers a new provider in the system")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Provider created successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid input data"),
      @ApiResponse(responseCode = "409", description = "Email already in use"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Providers> register(
      @Parameter(
          description = "Provider registration details",
          required = true)
      @RequestBody ProviderDetails providerRegisterRequest) {
    try {
      Providers provider = new Providers();
      logger.info("Creating new provider");
      provider.setCompanyName(providerRegisterRequest.getCompanyName());
      if (accountsService.findByEmail(providerRegisterRequest.getEmail()) == null) {
        logger.warn("Email already in use: {}", providerRegisterRequest.getEmail());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
      }
      provider.setEmail(providerRegisterRequest.getEmail());
      provider.setPassword(providerRegisterRequest.getPassword());
      provider.setPhoneNumber(providerRegisterRequest.getPhoneNumber());

      Providers createdProvider = providersService.save(provider);
      logger.debug("Created provider: {}", createdProvider);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdProvider);
    } catch (Exception e) {
      logger.error("Error creating provider: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  /**
   * Updates an existing provider.
   *
   * @param id The ID of the provider to update.
   * @param providerDetails The updated provider details.
   * @return The updated provider.
   */
  @PutMapping("/{id}")
  @Operation(
      summary = "Update a provider",
      description = "Updates an existing provider with the provided details")
  @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Provider updated"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "404", description = "Provider not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<Providers> updateProvider(
        @Parameter(
            description = "ID of the provider to be updated",
            required = true)
        @PathVariable Long id,
        @Parameter(
            description = "Updated details of the provider",
            required = true)
        @RequestBody Providers providerDetails) {
    try {
    logger.info("Updating provider with id: {}", id);
    Providers provider = providersService.findById(id);
    if (provider == null) {
        logger.debug("Provider with id {} not found", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    provider.setCompanyName(providerDetails.getCompanyName());
    provider.setEmail(providerDetails.getEmail());
    provider.setPassword(providerDetails.getPassword());
    provider.setPhoneNumber(providerDetails.getPhoneNumber());
    Providers updatedProvider = providersService.save(provider, false);
    logger.debug("Updated provider: {}", updatedProvider);
    return ResponseEntity.status(HttpStatus.OK).body(updatedProvider);
    } catch (Exception e) {
        logger.error("Error updating provider: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}