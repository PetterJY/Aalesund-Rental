package no.ntnu.logic.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
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
import no.ntnu.entity.dto.CarDetails;
import no.ntnu.entity.models.Cars;
import no.ntnu.entity.models.ExtraFeatures;
import no.ntnu.entity.models.Providers;
import no.ntnu.logic.repository.CarsRepository;
import no.ntnu.logic.service.CarsService;
import no.ntnu.logic.service.ExtraFeaturesService;
import no.ntnu.logic.service.ProvidersService;

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

  @GetMapping("/search")
  public ResponseEntity<List<Cars>> searchCars(
      @RequestParam(required = false) List<Cars.CarType> carType,
      @RequestParam(required = false) List<Cars.Transmission> transmission,
      @RequestParam(required = false) Integer minPassengers,
      @RequestParam(required = false) String sortOption,
      @RequestParam(required = false) Integer minPricePerDay,
      @RequestParam(required = false) Integer maxPricePerDay,
      @RequestParam(required = false) List<Cars.EnergySource> energySource,
      @RequestParam Cars.Location pickupLocation,
      @RequestParam String pickupDate,
      @RequestParam String dropoffDate
      ) {

    Sort sortOrder = Sort.unsorted();
    if (sortOption != null) {
      sortOrder = switch (sortOption) {
        case "newest" -> Sort.by(Sort.Direction.DESC, "productionYear");
        case "oldest" -> Sort.by(Sort.Direction.ASC, "productionYear");
        case "price-low-to-high" -> Sort.by(Sort.Direction.ASC, "pricePerDay");
        case "price-high-to-low" -> Sort.by(Sort.Direction.DESC, "pricePerDay");
        case "alphabet" -> Sort.by(Sort.Direction.ASC, "carBrand", "modelName");
        default -> sortOrder;
      };
    }

    System.out.println("Sort order parameter: " + sortOrder);

    Pageable pageable = Pageable.unpaged(sortOrder);

    // Handle null values by providing defaults if necessary
    List<Cars.CarType> carTypeParam = (carType != null && !carType.isEmpty()) ?
        carType : List.of(Cars.CarType.values());
    List<Cars.Transmission> transmissionParam = (transmission != null && !transmission.isEmpty()) ?
        transmission : List.of(Cars.Transmission.values());
    int passengersParam = (minPassengers != null) ? minPassengers : 2;
    List<Cars.EnergySource> energySourceParam = (energySource != null && !energySource.isEmpty()) ?
        energySource : List.of(Cars.EnergySource.values());
    int minPricePerDayParam = (minPricePerDay != null) ? minPricePerDay : 0;
    int maxPricePerDayParam = (maxPricePerDay != null) ? maxPricePerDay : Integer.MAX_VALUE;
    LocalDateTime pickupDateParam = LocalDateTime.parse(pickupDate);
    LocalDateTime dropoffDateParam = LocalDateTime.parse(dropoffDate);


    System.out.println("Executing query...");
    System.out.println("Searching cars with NEW parameters: " +
        "carType=" + carTypeParam +
        ", transmission=" + transmissionParam +
        ", minPassengers=" + passengersParam +
        ", energySource=" + energySourceParam +
        ", minPricePerDay=" + minPricePerDayParam +
        ", maxPricePerDay=" + maxPricePerDayParam +
        ", pickupLocation=" + pickupLocation);

    System.out.println("pickupDate=" + pickupDateParam +
        ", dropoffDate =" + dropoffDateParam);

    List<Cars> cars;
    try {
      cars = carsRepository
          .findFilteredCars(
              carTypeParam,
              transmissionParam,
              passengersParam,
              energySourceParam,
              minPricePerDayParam,
              maxPricePerDayParam,
              pickupLocation,
              pickupDateParam,
              dropoffDateParam,
              pageable
          );
      System.out.println("Query executed successfully. Result: " + cars);
    } catch (Exception e) {
      logger.error("Error fetching cars: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
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
   * Returns all car types.
   *
   * @return List of all car types.
   */

@GetMapping("/car-types")
@ApiOperation(value = "Returns all car types.")
public ResponseEntity<List<Cars.CarType>> getCarTypes() {
  try {
    logger.info("Fetching all car types");
    List<Cars.CarType> carTypes = List.of(Cars.CarType.values());
    logger.debug("Fetched car types: {}", carTypes);
    return ResponseEntity.status(HttpStatus.OK).body(carTypes);
  } catch (Exception e) {
    logger.error("Error fetching car types: {}", e.getMessage());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
  }
}

  /**
   * Returns all car locations.
   * 
   * @return List of all car locations.
   */
  @GetMapping("/locations")
  @ApiOperation(value = "Returns all car locations.")
  public ResponseEntity<List<Cars.Location>> getCarLocations() {
    try {
      logger.info("Fetching all car locations");
      List<Cars.Location> carLocations = List.of(Cars.Location.values());
      logger.debug("Fetched car locations: {}", carLocations);
      return ResponseEntity.status(HttpStatus.OK).body(carLocations);
    } catch (Exception e) {
      logger.error("Error fetching car locations: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Returns all extra features for a specific car.
   * 
   * @return Set of all extra features.
   */
  @GetMapping("/{id}/extra-features")
  @ApiOperation(value = "Returns all extra features for a specific car.")
public ResponseEntity<Set<ExtraFeatures>> getExtraFeaturesByCarId(@PathVariable Long id) {
    logger.info("Fetching extra features for car with id: {}", id);
    Cars car = carsService.findById(id);
    Set<ExtraFeatures> extraFeatures = car.getExtraFeatures();
    logger.debug("Fetched extra features: {}", extraFeatures);
    return ResponseEntity.status(HttpStatus.OK).body(extraFeatures);
  }
  
  /**
   * Creates a new car.
   *
   * @param carRequest The car to create.
   * @return The created car.
   */
  @PostMapping
  @ApiOperation(value = "Creates a new car.", notes = "The newly created car is returned.")
  public ResponseEntity<Cars> createCar(@Valid @RequestBody CarDetails carRequest) {
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
    car.setLocation(carRequest.getLocation());
    car.setPricePerDay(carRequest.getPricePerDay());

    if (carRequest.isAvailable() != null) {
      car.setAvailable(carRequest.isAvailable());
    }

    Cars createdCar = carsService.save(car);
    logger.debug("Created car: {}", createdCar.getId());
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
  public ResponseEntity<Cars> updateCar(@PathVariable Long id, @Valid @RequestBody CarDetails carDetails) {
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
    car.setLocation(carDetails.getLocation());
    
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