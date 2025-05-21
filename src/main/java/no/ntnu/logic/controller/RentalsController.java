package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;
import no.ntnu.entity.dto.RentalDetails;
import no.ntnu.entity.models.Cars;
import no.ntnu.entity.models.Providers;
import no.ntnu.entity.models.Rentals;
import no.ntnu.entity.models.Users;
import no.ntnu.logic.service.RentalsService;


/**
 * Controller for managing rental-related operations.
 */
@RestController
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
  @ApiOperation(value = "Returns all rentals.")
  public ResponseEntity<List<Rentals>> getAllRentals() {
    logger.info("Fetching all rentals");
    List<Rentals> rentals = rentalsService.findAll();
    logger.debug("Fetched {} rentals", rentals.size());
    return ResponseEntity.status(HttpStatus.OK).body(rentals);
  }


  @GetMapping("/renter/{id}")
  @ApiOperation(value = "Returns all rentals with the given renter ID.")
    public ResponseEntity<List<Rentals>> getRentalsByRenterId(@PathVariable long id) {
        logger.info("Fetching rentals with renter id: {}", id);
        List<Rentals> rentals = rentalsService.findByRenterId(id);
        logger.debug("Fetched {} rentals for renter id: {}", rentals.size(), id);
        return ResponseEntity.status(HttpStatus.OK).body(rentals);
    }

  /**
   * Returns a rental by its ID.
   *
   * @param id The ID of the rental.
   * @return The rental with the specified ID.
   */
  @GetMapping("/{id}")
  @ApiOperation(value = "Returns a rental by its ID.", 
      notes = "If the rental is not found, a 404 error is returned.")
  public ResponseEntity<Rentals> getRentalById(@PathVariable Long id) {
    logger.info("Fetching rental with id: {}", id);
    Rentals rental = rentalsService.findById(id);
    logger.debug("Fetched rental: {}", rental);
    return ResponseEntity.status(HttpStatus.OK).body(rental);
  }

  /**
   * Returns a rental by its Provider ID.
   *
   * @param providerId The ID of the provider.
   * @param carId The ID of the car.
   * @return The rentals with the specified Provider ID.
   */
  @GetMapping("/my-rentals")
  @ApiOperation(value = "Returns rentals by their Provider ID.",
      notes = "If the provider is not found, a 404 error is returned.")
  public ResponseEntity<List<Rentals>> getRentalsByProviderIdAndCarId(
      @RequestParam Long providerId,
      @RequestParam Long carId) {

    Sort sortOrder = Sort.unsorted();
    Sort.by(Sort.Direction.ASC, "startDate", "endDate");

    Pageable pageable = Pageable.unpaged(sortOrder);

    logger.info("Fetching rentals with provider id: {} and car id: {} and sorting by: {}",
        providerId, carId, pageable);
    List<Rentals> rentals = rentalsService.findByProviderIdAndCarId(providerId, carId, pageable);
    logger.debug("Fetched rentals: {}", rentals);
    return ResponseEntity.status(HttpStatus.OK).body(rentals);
  }

  /**
   * Creates a new rental.
   *
   * @param rentalRequest The rental to create.
   * @return The created rental.
   */
  @PostMapping
  @ApiOperation(value = "Creates a new rental.", notes = "The newly created rental is returned.")
  public ResponseEntity<Rentals> createRental(@Valid @RequestBody RentalDetails rentalRequest) {
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
   * @param id The ID of the rental to update.
   * @param rentalDetails The updated rental details.
   * @return The updated rental.
   */
  @PutMapping("/{id}")
  @ApiOperation(value = "Updates a rental by its ID.", 
      notes = "If the rental is not found, a 404 error is returned.")
  public ResponseEntity<Rentals> updateRental(
      @PathVariable Long id, @Valid @RequestBody RentalDetails rentalDetails) {
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
    return ResponseEntity.status(HttpStatus.OK).body(updatedRental);
  }

  /**
   * Deletes a rental by its ID.
   *
   * @param id The ID of the rental to delete.
   * @return Response entity with status NO_CONTENT.
   */
  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes a rental by its ID.", 
      notes = "If the rental is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteRental(@PathVariable Long id) {
    logger.info("Deleting rental with id: {}", id);
    rentalsService.deleteById(id);
    logger.debug("Deleted rental with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}