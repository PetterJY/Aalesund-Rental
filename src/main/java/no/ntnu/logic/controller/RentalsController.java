package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.Rentals;
import no.ntnu.logic.service.RentalsService;

@RestController
@RequestMapping("/rentals")
public class RentalsController {

  private final RentalsService rentalsService;
  private static final Logger logger = LoggerFactory.getLogger(RentalsController.class);

  @Autowired
  public RentalsController(RentalsService rentalsService) {
    this.rentalsService = rentalsService;
  }

  @GetMapping
  @ApiOperation(value = "Returns all rentals.")
  public ResponseEntity<List<Rentals>> getAllRentals() {
    logger.info("Fetching all rentals");
    List<Rentals> rentals = rentalsService.findAll();
    logger.debug("Fetched {} rentals", rentals.size());
    return ResponseEntity.status(HttpStatus.OK).body(rentals);
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns a rental by its ID.", notes = "If the rental is not found, a 404 error is returned.")
  public ResponseEntity<Rentals> getRentalById(@PathVariable Long id) {
    logger.info("Fetching rental with id: {}", id);
    Rentals rental = rentalsService.findById(id);
    logger.debug("Fetched rental: {}", rental);
    return ResponseEntity.status(HttpStatus.OK).body(rental);
  }

  @PostMapping
  @ApiOperation(value = "Creates a new rental.", notes = "The newly created rental is returned.")
  public ResponseEntity<Rentals> createRental(@RequestBody Rentals rental) {
    logger.info("Creating new rental");
    Rentals createdRental = rentalsService.save(rental);
    logger.debug("Created rental: {}", createdRental);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdRental);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates a rental by its ID.", notes = "If the rental is not found, a 404 error is returned.")
  public ResponseEntity<Rentals> updateRental(@PathVariable Long id, @RequestBody Rentals rentalDetails) {
    logger.info("Updating rental with id: {}", id);
    Rentals rental = rentalsService.findById(id);
    rental.setStartDate(rentalDetails.getStartDate());
    rental.setEndDate(rentalDetails.getEndDate());
    rental.setCar(rentalDetails.getCar());
    rental.setUser(rentalDetails.getUser());
    Rentals updatedRental = rentalsService.save(rental);
    logger.debug("Updated rental: {}", updatedRental);
    return ResponseEntity.status(HttpStatus.OK).body(updatedRental);
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes a rental by its ID.", notes = "If the rental is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteRental(@PathVariable Long id) {
    logger.info("Deleting rental with id: {}", id);
    rentalsService.deleteById(id);
    logger.debug("Deleted rental with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}