package no.ntnu.logic.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

import jakarta.validation.Valid;
import no.ntnu.entity.dto.CarDetails;
import no.ntnu.entity.models.Cars;
import no.ntnu.entity.models.ExtraFeatures;
import no.ntnu.entity.models.Providers;
import no.ntnu.logic.repository.CarsRepository;
import no.ntnu.logic.service.CarsService;
import no.ntnu.logic.service.ExtraFeaturesService;
import no.ntnu.logic.service.ProvidersService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@Tag(name = "Cars API", description = "API for managing car resources")
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
  @Operation(
      description = "Returns all cars.",
      summary = "Fetch all cars. If no cars are found, an empty list is returned.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Cars found"),
      @ApiResponse(responseCode = "404", description = "No cars found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<List<Cars>> getAllCars() {
    try {
      logger.info("Fetching all cars");
      List<Cars> cars = carsService.findAll();
      logger.debug("Fetched {} cars", cars.size());

      if (cars.isEmpty()) {
        logger.warn("No cars found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(cars);
      }

      return ResponseEntity.status(HttpStatus.OK).body(cars);
    } catch (Exception e) {
      logger.error("Error fetching cars: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Returns a car by its ID.
   *
   * @param id The ID of the car.
   * @return The car with the specified ID.
   */
  @GetMapping("/{id}")
  @Operation(
      summary = "Returns a car by its ID.",
      description = "If the car is not found, a 404 error is returned.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Car found"),
      @ApiResponse(responseCode = "404", description = "Car not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Cars> getCarById(
      @Parameter(
          description = "ID of the car to be fetched",
          required = true,
          example = "123"
      )
      @PathVariable Long id) {
    try {
      logger.info("Fetching car with id: {}", id);
      Cars car = carsService.findById(id);

      if (car == null) {
        logger.warn("Car with id {} not found", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
      //TODO: Check if the car is deleted
      logger.debug("Fetched car with id {}: {}", id, car);
      return ResponseEntity.status(HttpStatus.OK).body(car);
    } catch (Exception e) {
      logger.error("Error fetching car: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/search")
  @Operation(
      summary = "Search for cars based on various criteria.",
      description = "Returns a list of cars that match the search criteria.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Cars found"),
      @ApiResponse(responseCode = "404", description = "No cars found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<List<Cars>> searchCars(
      @Parameter(
          description = "List of car types to filter by",
          example = "SUV, Sedan"
      )
      @RequestParam(required = false) List<Cars.CarType> carType,
      @Parameter(
          description = "List of transmission types to filter by",
          example = "Automatic, Manual"
      )
      @RequestParam(required = false) List<Cars.Transmission> transmission,
        @Parameter(
            description = "Minimum number of passengers",
            example = "2"
        )
      @RequestParam(required = false) Integer minPassengers,
        @Parameter(
            description = "Sorting option for the results",
            example = "newest, oldest, price-low-to-high, price-high-to-low, alphabet"
        )
      @RequestParam(required = false) String sortOption,
        @Parameter(
            description = "Minimum price per day",
            example = "100"
        )
      @RequestParam(required = false) Integer minPricePerDay,
        @Parameter(
            description = "Maximum price per day",
            example = "500"
        )
      @RequestParam(required = false) Integer maxPricePerDay,
        @Parameter(
            description = "List of energy sources to filter by",
            example = "Petrol, Diesel, Electric"
        )
      @RequestParam(required = false) List<Cars.EnergySource> energySource,
        @Parameter(
            description = "Search word to filter by",
            example = "Toyota"
        )
      @RequestParam(required = false) String searchWord,
        @Parameter(
            description = "Location to filter by",
            example = "Oslo, Bergen"
        )
      @RequestParam Cars.Location pickupLocation,
        @Parameter(
            description = "Pickup date in ISO-8601 format",
            example = "2025-10-01T10:00:00"
        )
      @RequestParam String pickupDate,
        @Parameter(
            description = "Drop-off date in ISO-8601 format",
            example = "2025-10-10T10:00:00"
        )
      @RequestParam String dropoffDate
  ) {
    try {
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

    Pageable pageable = Pageable.unpaged(sortOrder);
    logger.info("Fetching cars with sort option: {}", sortOption);

    logger.info("Assuming default values for optional parameters");
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
    logger.info("Assigned default values");

      logger.debug("Searching for cars with criteria: carType={}, transmission={}, passengers={}, energySource={}, searchWord={}, minPricePerDay={}, maxPricePerDay={}, pickupLocation={}, pickupDate={}, dropoffDate={}",
          carTypeParam, transmissionParam, passengersParam, energySourceParam, searchWord, minPricePerDayParam, maxPricePerDayParam, pickupLocation, pickupDateParam, dropoffDateParam);

    List<Cars> cars;
      cars = carsRepository
          .findFilteredCars(
              carTypeParam,
              transmissionParam,
              passengersParam,
              energySourceParam,
              searchWord,
              minPricePerDayParam,
              maxPricePerDayParam,
              pickupLocation,
              pickupDateParam,
              dropoffDateParam,
              pageable
          );
      logger.debug("Fetched {} cars", cars.size());
      return ResponseEntity.status(HttpStatus.OK).body(cars);
    } catch (Exception e) {
      logger.error("Error fetching cars: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Returns all cars for a specific provider.
   *
   * @param id The ID of the provider.
   * @return List of cars for the specified provider.
   */
  @GetMapping("/my-cars/{id}")
  @Operation(
      summary = "Returns all cars for a specific provider, given by their ID.",
      description = "Returns all cars associated with the provider identified by the given ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cars found"),
        @ApiResponse(responseCode = "404", description = "No cars found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<List<Cars>> findByProviderId(
        @Parameter(
            description = "ID of the provider to fetch cars for",
            required = true,
            example = "123"
        )
      @PathVariable Long id) {
    try {
    logger.info("Fetching cars with provider-id: {}", id);
    List<Cars> cars = carsService.findByProviderId(id);
    if (cars.isEmpty()) {
        logger.info("No cars found for provider with id {}", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(cars);
    }
    logger.debug("Fetched {} cars: ", cars.size());
    return ResponseEntity.status(HttpStatus.OK).body(cars);
    } catch (Exception e) {
        logger.error("Error fetching cars: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }


  /**
   * Returns all car types.
   *
   * @return List of all car types.
   */
  @GetMapping("/car-types")
  @Operation(
      summary = "Returns all car types.",
      description = "Returns a list of all car types supported")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Car types found"),
        @ApiResponse(responseCode = "404", description = "No car types found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<List<Cars.CarType>> getCarTypes() {
    try {
      logger.info("Fetching all car types");
      List<Cars.CarType> carTypes = List.of(Cars.CarType.values());

        if (carTypes.isEmpty()) {
            logger.warn("No car types found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(carTypes);
        }

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
  @Operation(
      summary = "Returns all car locations.",
      description = "Returns a list of all available car locations supported")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Car locations found"),
        @ApiResponse(responseCode = "404", description = "No car locations found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<List<Cars.Location>> getCarLocations() {
    try {
      logger.info("Fetching all car locations");
      List<Cars.Location> carLocations = List.of(Cars.Location.values());
      if (carLocations.isEmpty()) {
        logger.warn("No car locations found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(carLocations);
      }
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
  @Operation(
      summary = "Returns all extra features for a specific car.",
      description = "Returns all extra features associated with the car identified by the given ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Extra features found"),
        @ApiResponse(responseCode = "404", description = "No extra features found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")})
  public ResponseEntity<Set<ExtraFeatures>> getExtraFeaturesByCarId(
        @Parameter(
            description = "ID of the car to fetch extra features for",
            required = true,
            example = "123"
        )
      @PathVariable Long id) {
    try {
    logger.info("Fetching extra features for car with id: {}", id);
    Cars car = carsService.findById(id);
    Set<ExtraFeatures> extraFeatures = car.getExtraFeatures();
    if (extraFeatures.isEmpty()) {
        logger.warn("No extra features found for car with id {}", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(extraFeatures);
    }
    logger.debug("Fetched extra features: {}", extraFeatures);
    return ResponseEntity.status(HttpStatus.OK).body(extraFeatures);
    } catch (Exception e) {
        logger.error("Error fetching extra features: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Creates a new car.
   *
   * @param carRequest The car to create.
   * @return The created car.
   */
  @PostMapping
  @Operation(
      summary = "Creates a new car.",
      description = "Creates a new car with the provided details")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Car created"),
        @ApiResponse(responseCode = "400", description = "Bad request"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<Cars> createCar(
        @Parameter(
            description = "Car details to create",
            required = true
        )
      @Valid @RequestBody CarDetails carRequest) {
    try {
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
    } catch (Exception e) {
        logger.error("Error creating car: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Updates a car by its ID.
   *
   * @param id The ID of the car to update.
   * @param carDetails The updated car details.
   * @return The updated car.
   */
  @PutMapping("/{id}")
  @Operation(
      summary = "Updates a car by its ID.",
      description = "Updates an existing car with the provided details")
  @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Car updated"),
        @ApiResponse(responseCode = "400", description = "Bad request"),
        @ApiResponse(responseCode = "404", description = "Car not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Cars> updateCar(
        @Parameter(
            description = "ID of the car to update",
            required = true,
            example = "123"
        )
      @PathVariable Long id,
        @Parameter(
            description = "Car details to update",
            required = true
        )
        @Valid @RequestBody CarDetails carDetails) {
    try {
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
    car.setAvailable(carDetails.isAvailable());

    Set<ExtraFeatures> extraFeatures = (carDetails.getExtraFeatureIds() != null ? carDetails.getExtraFeatureIds() : new HashSet<>())
        .stream()
        .map(extraFeatureId -> extraFeaturesService.findById((Long) extraFeatureId))
        .collect(Collectors.toSet());
    car.setExtraFeatures(extraFeatures);

    Cars updatedCar = carsService.save(car);
    logger.debug("Updated car: {}", updatedCar);
    return ResponseEntity.status(HttpStatus.OK).body(updatedCar);
    } catch (Exception e) {
        logger.error("Error updating car: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }


  /**
   * Deletes a car by its ID.
   *
   * @param id The ID of the car to delete.
   * @return ResponseEntity with status NO_CONTENT.
   */
  @DeleteMapping("/{id}")
  @Operation(
      summary = "Deletes a car by its ID.",
      description = "If the car is not found, a 404 error is returned."
  )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Car deleted"),
            @ApiResponse(responseCode = "404", description = "Car not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<Void> deleteCar(
        @Parameter(
            description = "ID of the car to delete",
            required = true,
            example = "123"
        )
      @PathVariable Long id) {
    try {
    logger.info("Deleting car with id: {}", id);
    // TODO: Check if the car is already deleted
    carsService.deleteById(id);
    logger.debug("Deleted car with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    } catch (Exception e) {
        logger.error("Error deleting car: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}