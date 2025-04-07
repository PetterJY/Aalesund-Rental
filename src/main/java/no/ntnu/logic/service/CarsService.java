package no.ntnu.logic.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.CarNotFoundException;
import no.ntnu.entity.models.Cars;
import no.ntnu.logic.repository.CarsRepository;

/**
 * Service class for managing cars.
 */
@Service
public class CarsService {
  private static final Logger logger = 
      LoggerFactory.getLogger(CarsService.class.getSimpleName());
      
      private final CarsRepository carsRepository;

  /**
   * Constructor for CarsService.
   *
   * @param carsRepository the repository for cars
   */
  @Autowired
  public CarsService(CarsRepository carsRepository) {
    logger.info("CarsService initialized");
    this.carsRepository = carsRepository;
  }

  /**
   * Fetches all cars.
   *
   * @return a list of all cars
   */
  public List<Cars> findAll() {
    logger.info("Fetching all cars");
    return (List<Cars>) carsRepository.findAll();
  }

  /**
   * Fetches a car by its ID.
   *
   * @param id the ID of the car
   * @return the car with the given ID
   * @throws CarNotFoundException if the car is not found
   */
  public Cars findById(Long id) throws CarNotFoundException {
    logger.info("Fetching car with id: {}", id);
    return carsRepository.findById(id)
      .orElseThrow(() -> new CarNotFoundException("Car not found with id: " + id));
  }

  /**
   * Saves a car.
   *
   * @param car the car to save
   * @return the saved car
   */
  public Cars save(Cars car) {
    logger.info("Saving car with id: {}", car.getId());
    return carsRepository.save(car);
  }

  /**
   * Deletes a car by its ID.
   *
   * @param id the ID of the car to delete
   * @throws CarNotFoundException if the car is not found
   */
  public void deleteById(Long id) throws CarNotFoundException {
    logger.info("Deleting car with id: {}", id);
    if (!carsRepository.existsById(id)) {
      throw new CarNotFoundException("Car not found with id: " + id);
    }
    carsRepository.deleteById(id);
  }
}