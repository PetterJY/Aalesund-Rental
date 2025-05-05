package no.ntnu.logic.controller;

import java.util.HashSet;
import java.util.List;

import java.util.Set;
import java.util.stream.Collectors;
import no.ntnu.entity.dto.CarDetails;
import no.ntnu.entity.models.ExtraFeatures;
import no.ntnu.entity.models.Providers;
import no.ntnu.logic.repository.CarsRepository;
import no.ntnu.logic.service.ExtraFeaturesService;
import no.ntnu.logic.service.ProvidersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import no.ntnu.entity.models.Cars;
import no.ntnu.logic.service.CarsService;

@RestController
@RequestMapping("/cars")
public class CarsController {

  private final CarsService carsService;
  private static final Logger logger = 
      LoggerFactory.getLogger(CarsController.class.getSimpleName());
  private final ProvidersService providersService;
  private final ExtraFeaturesService extraFeaturesService;
  private final CarsRepository carsRepository;

  @Autowired
  public CarsController(CarsService carsService, ProvidersService providersService,
                        ExtraFeaturesService extraFeaturesService, CarsRepository carsRepository) {
    this.carsService = carsService;
    this.providersService = providersService;
    this.extraFeaturesService = extraFeaturesService;
    this.carsRepository = carsRepository;
  }

  /**
   * Returns all cars.
   *
   * @return List of all cars.
   */
  @GetMapping
  @ApiOperation(value = "Returns all cars.")
  public ResponseEntity<List<Cars>> getAllCars() {
    logger.info("Fetching all cars");
    List<Cars> cars = carsService.findAll();
    logger.debug("Fetched {} cars", cars.size());
    return ResponseEntity.status(HttpStatus.OK).body(cars);
  }

  /**
   * Returns a car by its ID.
   *
   * @param id The ID of the car.
   * @return The car with the specified ID.
   */
  @GetMapping("/{id}")
  @ApiOperation(value = "Returns a car by its ID.", 
      notes = "If the car is not found, a 404 error is returned.")
  public ResponseEntity<Cars> getCarById(@PathVariable Long id) {
    logger.info("Fetching car with id: {}", id);
    Cars car = carsService.findById(id);
    logger.debug("Fetched car: {}", car);
    return ResponseEntity.status(HttpStatus.OK).body(car);
  }

  @GetMapping("/cars")
  public ResponseEntity<List<Cars>> searchCars(
      @RequestParam(required = false) List<String> carType,
      @RequestParam(required = false) List<Cars.Transmission> transmission,
      @RequestParam(required = false) Integer minPassengers,
      @RequestParam(required = false) String sortOption
  ) {

    Sort sortOrder = Sort.unsorted();
    if (sortOption != null) {
      switch (sortOption) {
        case "newest":
          sortOrder = Sort.by(Sort.Direction.DESC, "productionYear");
          break;
        case "oldest":
          sortOrder = Sort.by(Sort.Direction.ASC, "productionYear");
          break;
        case "price-low-to-high":
          sortOrder = Sort.by(Sort.Direction.ASC, "price");
          break;
        case "price-high-to-low":
          sortOrder = Sort.by(Sort.Direction.DESC, "price");
          break;
        case "alphabet":
          sortOrder = Sort.by(Sort.Direction.ASC, "name");
          break;
      }
    }

    Pageable pageable = Pageable.unpaged(sortOrder);

    // Handle null values by providing defaults if necessary
    List<String> carTypeParam = (carType.isEmpty()) ? carType : List.of();
    List<Cars.Transmission> transmissionParam = (transmission != null && !transmission.isEmpty()) ?
        transmission : List.of(Cars.Transmission.AUTOMATIC, Cars.Transmission.MANUAL);
    int passengersParam = (minPassengers != null) ? minPassengers : 2;

    List<Cars> cars = carsRepository
        .findByCarTypeInAndTransmissionInAndPassengersGreaterThanEqual(
            carTypeParam,
            transmissionParam,
            passengersParam,
            pageable
        );

    return ResponseEntity.status(HttpStatus.OK).body(cars);
  }

  /**
   * Returns all cars for a specific provider.
   *
   * @param id The ID of the provider.
   * @return List of cars for the specified provider.
   */
  @GetMapping("/my-cars/{id}")
  @ApiOperation(value = "Returns all cars for a specific provider.",
      notes = "If the provider is not found, a 404 error is returned.")
  public ResponseEntity<List<Cars>> findByProviderId(@PathVariable Long id) {
    logger.info("Fetching cars with provider-id: {}", id);
    List<Cars> cars = carsService.findByProviderId(id);
    logger.debug("Fetched cars: {}", cars);
    return ResponseEntity.status(HttpStatus.OK).body(cars);
  }

  /**
   * Creates a new car.
   *
   * @param carRequest The car to create.
   * @return The created car.
   */
  @PostMapping
  @ApiOperation(value = "Creates a new car.", notes = "The newly created car is returned.")
  public ResponseEntity<Cars> createCar(@RequestBody CarDetails carRequest) {
    logger.info("Creating new car");
    Cars car = new Cars();

    Set<ExtraFeatures> extraFeatures = (carRequest.getExtraFeatureIds() != null ? carRequest.getExtraFeatureIds() : new HashSet<>())
      .stream()
      .map(id -> extraFeaturesService.findById((Long) id))
      .collect(Collectors.toSet());
    car.setExtraFeatures(extraFeatures);

    Providers provider = providersService.findById(carRequest.getProviderId());
    car.setProvider(provider);

    car.setPlateNumber(carRequest.getPlateNumber());
    car.setCarBrand(carRequest.getCarBrand());
    car.setModelName(carRequest.getModelName());
    car.setCarType(carRequest.getCarType());
    car.setProductionYear(carRequest.getProductionYear());
    car.setPassengers(carRequest.getPassengers());
    car.setTransmission(carRequest.getTransmission());
    car.setEnergySource(carRequest.getEnergySource());
    car.setAvailable(carRequest.isAvailable());
    car.setPricePerDay(carRequest.getPricePerDay());
    Cars createdCar = carsService.save(car);
    logger.debug("Created car: {}", createdCar);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdCar);
  }

  /**
   * Updates a car by its ID.
   *
   * @param id The ID of the car to update.
   * @param carDetails The updated car details.
   * @return The updated car.
   */
  @PutMapping("/{id}")
  @ApiOperation(value = "Updates a car by its ID.", 
      notes = "If the car is not found, a 404 error is returned.")
  public ResponseEntity<Cars> updateCar(@PathVariable Long id, @RequestBody CarDetails carDetails) {
    logger.info("Updating car with id: {}", id);
    Cars car = carsService.findById(id);
    car.setPlateNumber(carDetails.getPlateNumber());
    car.setCarBrand(carDetails.getCarBrand());
    car.setModelName(carDetails.getModelName());
    car.setCarType(carDetails.getCarType());
    car.setPricePerDay(carDetails.getPricePerDay());
    car.setProductionYear(carDetails.getProductionYear());
    car.setPassengers(carDetails.getPassengers());
    car.setTransmission(carDetails.getTransmission());
    car.setEnergySource(carDetails.getEnergySource());
    
    Set<ExtraFeatures> extraFeatures = (carDetails.getExtraFeatureIds() != null ? carDetails.getExtraFeatureIds() : new HashSet<>())
      .stream()
      .map(extraFeatureId -> extraFeaturesService.findById((Long) extraFeatureId))
      .collect(Collectors.toSet());
    car.setExtraFeatures(extraFeatures);

    Cars updatedCar = carsService.save(car);
    logger.debug("Updated car: {}", updatedCar);
    return ResponseEntity.status(HttpStatus.OK).body(updatedCar);
  }

  /**
   * Deletes a car by its ID.
   *
   * @param id The ID of the car to delete.
   * @return ResponseEntity with status NO_CONTENT.
   */
  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes a car by its ID.", 
      notes = "If the car is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
    logger.info("Deleting car with id: {}", id);
    carsService.deleteById(id);
    logger.debug("Deleted car with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}