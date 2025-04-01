package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.Cars;
import no.ntnu.logic.service.CarsService;

@RestController
@RequestMapping("/cars")
public class CarsController {

  private final CarsService carsService;
  private static final Logger logger = LoggerFactory.getLogger(CarsController.class);

  @Autowired
  public CarsController(CarsService carsService) {
    this.carsService = carsService;
  }

  @GetMapping
  @ApiOperation(value = "Returns all cars.")
  public ResponseEntity<List<Cars>> getAllCars() {
    logger.info("Fetching all cars");
    List<Cars> cars = carsService.findAll();
    logger.debug("Fetched {} cars", cars.size());
    return ResponseEntity.status(HttpStatus.OK).body(cars);
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns a car by its ID.", notes = "If the car is not found, a 404 error is returned.")
  public ResponseEntity<Cars> getCarById(@PathVariable Long id) {
    logger.info("Fetching car with id: {}", id);
    Cars car = carsService.findById(id);
    logger.debug("Fetched car: {}", car);
    return ResponseEntity.status(HttpStatus.OK).body(car);
  }

  @PostMapping
  @ApiOperation(value = "Creates a new car.", notes = "The newly created car is returned.")
  public ResponseEntity<Cars> createCar(@RequestBody Cars car) {
    logger.info("Creating new car");
    Cars createdCar = carsService.save(car);
    logger.debug("Created car: {}", createdCar);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdCar);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates a car by its ID.", notes = "If the car is not found, a 404 error is returned.")
  public ResponseEntity<Cars> updateCar(@PathVariable Long id, @RequestBody Cars carDetails) {
    logger.info("Updating car with id: {}", id);
    Cars car = carsService.findById(id);
    car.setPlateNumber(carDetails.getPlateNumber());
    car.setCarBrand(carDetails.getCarBrand());
    car.setModelName(carDetails.getModelName());
    car.setCarType(carDetails.getCarType());
    car.setPricePerDay(carDetails.getPricePerDay());
    car.setProductionYear(carDetails.getProductionYear());
    car.setPassengers(carDetails.getPassengers());
    car.setAutomatic(carDetails.isAutomatic());
    car.setEnergySource(carDetails.getEnergySource());
    car.setAvailable(carDetails.isAvailable());
    car.setExtraFeatures(carDetails.getExtraFeatures());
    Cars updatedCar = carsService.save(car);
    logger.debug("Updated car: {}", updatedCar);
    return ResponseEntity.status(HttpStatus.OK).body(updatedCar);
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes a car by its ID.", notes = "If the car is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
    logger.info("Deleting car with id: {}", id);
    carsService.deleteById(id);
    logger.debug("Deleted car with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}