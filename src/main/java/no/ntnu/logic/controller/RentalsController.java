package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import no.ntnu.entity.dto.RentalDetails;
import no.ntnu.entity.models.Cars;
import no.ntnu.entity.models.Providers;
import no.ntnu.entity.models.Rentals;
import no.ntnu.entity.models.Users;
import no.ntnu.logic.service.RentalsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponses;



/**
 * Controller for managing rental-related operations.
 */
@RestController
@Tag(name = "Rentals API", description = "API for managing rental resources")
@RequestMapping("/rentals")
public class RentalsController {

  private final RentalsService rentalsService;
  private static final Logger logger =
      LoggerFactory.getLogger(RentalsController.class.getSimpleName());

  @Autowired
  public RentalsController(RentalsService rentalsService) {
    this.rentalsService = rentalsService;

  }

  /**
   * Returns all rentals.
   *
   * @return List of all rentals.
   */
  @GetMapping
  @Operation(
      summary = "Returns all rentals.",
      description = "If no rentals are found, a 204 status is returned.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of rentals retrieved successfully"),
        @ApiResponse(responseCode = "204", description = "No rentals found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<List<Rentals>> getAllRentals() {
    logger.info("Fetching all rentals");
    List<Rentals> rentals = rentalsService.findAll();

    if (rentals.isEmpty()) {
      logger.warn("No rentals found");
      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    logger.debug("Fetched {} rentals", rentals.size());
    return ResponseEntity.status(HttpStatus.OK).body(rentals);
  }

  /**
   * Returns all rentals for a specific renter.
   *
   * @param id The ID of the renter
   * @return List of rentals associated with the renter or appropriate status code
   */
  @GetMapping("/renter/{id}")
  @Operation(
      summary = "Get rentals by renter ID",
      description = "Retrieves all rentals associated with the specified renter")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "List of rentals retrieved successfully"),
      @ApiResponse(responseCode = "204", description = "No rentals found for this renter"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<List<Rentals>> getRentalsByRenterId(
      @Parameter(description = "ID of the renter", required = true, example = "123")
      @PathVariable long id) {

    logger.info("Fetching rentals with renter id: {}", id);
    List<Rentals> rentals = rentalsService.findByRenterId(id);

    if (rentals.isEmpty()) {
      logger.warn("No rentals found for renter id: {}", id);
      return ResponseEntity.noContent().build();
    }

    logger.debug("Fetched {} rentals for renter id: {}", rentals.size(), id);
    return ResponseEntity.ok(rentals);
  }

/**
   * Returns a rental by its ID.
   *
   * @param id The ID of the rental to retrieve
   * @return The rental with the specified ID or appropriate error status
   */
  @GetMapping("/{id}")
  @Operation(
      summary = "Get rental by ID",
      description = "Retrieves a specific rental by its unique identifier")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Rental retrieved successfully"),
      @ApiResponse(responseCode = "404", description = "Rental not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Rentals> getRentalById(
      @Parameter(description = "ID of the rental to retrieve", required = true, example = "123")
      @PathVariable Long id) {

      logger.info("Fetching rental with id: {}", id);
      Rentals rental = rentalsService.findById(id); // Will throw RentalNotFoundException if not found
      logger.debug("Fetched rental: {}", rental);
      return ResponseEntity.ok(rental);
  }

  /**
   * Returns rentals filtered by provider ID and car ID.
   *
   * @param providerId The ID of the provider to filter by
   * @param carId The ID of the car to filter by
   * @return List of rentals matching the criteria or appropriate status code
   */
  @GetMapping("/my-rentals")
  @Operation(
      summary = "Get rentals by provider and car",
      description = "Retrieves rentals filtered by specified provider ID and car ID with sorting")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "List of rentals retrieved successfully"),
      @ApiResponse(responseCode = "204", description = "No rentals found matching the criteria"),
      @ApiResponse(responseCode = "404", description = "Provider or car not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<List<Rentals>> getRentalsByProviderIdAndCarId(
      @Parameter(description = "ID of the provider", required = true, example = "123")
      @RequestParam Long providerId,
      @Parameter(description = "ID of the car", required = true, example = "456")
      @RequestParam Long carId) {

    Sort sortOrder = Sort.by(Sort.Direction.ASC, "startDate", "endDate");
    Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, sortOrder);

    logger.info("Fetching rentals with provider id: {} and car id: {} and sorting by: {}",
        providerId, carId, sortOrder);
    List<Rentals> rentals = rentalsService.findByProviderIdAndCarId(providerId, carId, pageable);

    if (rentals.isEmpty()) {
      logger.warn("No rentals found for provider id: {} and car id: {}", providerId, carId);
      return ResponseEntity.noContent().build();
    }

    logger.debug("Fetched {} rentals", rentals.size());
    return ResponseEntity.ok(rentals);
  }

  /**
   * Creates a new rental.
   *
   * @param rentalRequest The rental details for creation
   * @return The created rental with status 201
   */
  @PostMapping
  @Operation(
      summary = "Create a new rental",
      description = "Creates a new rental with the provided details")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Rental created successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid rental data"),
      @ApiResponse(responseCode = "404", description = "Referenced provider, renter, or car not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Rentals> createRental(
      @Parameter(description = "Rental details", required = true)
      @Valid @RequestBody RentalDetails rentalRequest) {

    logger.info("Creating new rental");
    Rentals createdRental = new Rentals();

    Providers provider = new Providers();
    provider.setId(rentalRequest.getProviderId());
    createdRental.setProvider(provider);

    Users renter = new Users();
    renter.setId(rentalRequest.getRenterId());
    createdRental.setRenter(renter);

    Cars car = new Cars();
    car.setId(rentalRequest.getCarId());
    createdRental.setCar(car);

    createdRental.setStartDate(rentalRequest.getStartDate());
    createdRental.setEndDate(rentalRequest.getEndDate());
    createdRental.setPickupLocation(rentalRequest.getPickupLocation());
    createdRental.setDropoffLocation(rentalRequest.getDropoffLocation());
    createdRental.setTotalCost(rentalRequest.getTotalCost());
    createdRental.setStatus(rentalRequest.getStatus());

    Rentals savedRental = rentalsService.save(createdRental);
    logger.debug("Created rental: {}", savedRental);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedRental);
  }

  /**
   * Updates an existing rental.
   *
   * @param id The ID of the rental to update
   * @param rentalDetails The updated rental details
   * @return The updated rental
   */
  @PutMapping("/{id}")
  @Operation(
      summary = "Update a rental",
      description = "Updates an existing rental with the provided details")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Rental updated successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid rental data"),
      @ApiResponse(responseCode = "404", description = "Rental not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Rentals> updateRental(
      @Parameter(description = "ID of the rental to update", required = true, example = "123")
      @PathVariable Long id,
      @Parameter(description = "Updated rental details", required = true)
      @Valid @RequestBody RentalDetails rentalDetails) {

    logger.info("Updating rental with id: {}", id);
    Rentals rental = rentalsService.findById(id);
    rental.setStartDate(rentalDetails.getStartDate());
    rental.setEndDate(rentalDetails.getEndDate());
    rental.setPickupLocation(rentalDetails.getPickupLocation());
    rental.setDropoffLocation(rentalDetails.getDropoffLocation());
    rental.setTotalCost(rentalDetails.getTotalCost());
    rental.setStatus(rentalDetails.getStatus());

    Rentals updatedRental = rentalsService.save(rental);
    logger.debug("Updated rental: {}", updatedRental);
    return ResponseEntity.ok(updatedRental);
  }

  /**
   * Deletes a rental by its ID.
   *
   * @param id The ID of the rental to delete
   * @return Response with no content
   */
  @DeleteMapping("/{id}")
  @Operation(
      summary = "Delete a rental",
      description = "Removes a rental from the system by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Rental deleted successfully"),
      @ApiResponse(responseCode = "404", description = "Rental not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Void> deleteRental(
      @Parameter(description = "ID of the rental to delete", required = true, example = "123")
      @PathVariable Long id) {

    logger.info("Deleting rental with id: {}", id);
    rentalsService.deleteById(id); // Will throw RentalNotFoundException if not found
    logger.debug("Deleted rental with id: {}", id);
    return ResponseEntity.noContent().build();
  }
}