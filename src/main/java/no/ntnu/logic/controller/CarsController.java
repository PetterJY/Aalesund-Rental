package no.ntnu.logic.controller;

import java.util.List;
import java.util.Optional;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import no.ntnu.entity.Cars;
import no.ntnu.logic.repository.CarsRepository;

@RestController
@RequestMapping("/cars")
public class CarsController {
  @Autowired
  private final CarsRepository carsRepository;

  public CarsController(CarsRepository carsRepository) {
    this.carsRepository = carsRepository;
  }

  @GetMapping
  @ApiOperation(value = "Returns all cars.")
  public List<Cars> getAllCars() {
    return (List<Cars>) carsRepository.findAll();
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns a car by its ID.", notes = "If the car is not found, a 404 error is returned.")
  public ResponseEntity<Cars> getCarById(@PathVariable Long id) {
    Optional<Cars> car = carsRepository.findById(id);
    return car.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }


  @PostMapping
  @ApiOperation(value = "Creates a new car.", notes = "The newly created car is returned.")
  public Cars createCar(@RequestBody Cars car) {
    return carsRepository.save(car);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates a car by its ID.", notes = "If the car is not found, a 404 error is returned.")
  public ResponseEntity<Cars> updateCar(@PathVariable Long id, @RequestBody Cars carDetails) {
    Optional<Cars> car = carsRepository.findById(id);
    if (car.isPresent()) {
      Cars updatedCar = car.get();
      updatedCar.setPlateNumber(carDetails.getPlateNumber());
      updatedCar.setCarBrand(carDetails.getCarBrand());
      updatedCar.setModelName(carDetails.getModelName());
      updatedCar.setCarType(carDetails.getCarType());
      updatedCar.setPricePerDay(carDetails.getPricePerDay());
      updatedCar.setProductionYear(carDetails.getProductionYear());
      updatedCar.setPassengers(carDetails.getPassengers());
      updatedCar.setAutomatic(carDetails.isAutomatic());
      updatedCar.setEnergySource(carDetails.getEnergySource());
      updatedCar.setAvailable(carDetails.isAvailable());
      updatedCar.setExtraFeatures(carDetails.getExtraFeatures());
      return ResponseEntity.ok(carsRepository.save(updatedCar));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes a car by its ID.", notes = "If the car is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
    if (carsRepository.existsById(id)) {
      carsRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}