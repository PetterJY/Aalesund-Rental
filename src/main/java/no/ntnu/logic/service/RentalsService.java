package no.ntnu.logic.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.RentalNotFoundException;
import no.ntnu.entity.models.Rentals;
import no.ntnu.logic.repository.RentalsRepository;

/**
 * Service class for managing rental-related operations.
 * This class provides methods to find, save, and delete rentals.
 */
@Service
public class RentalsService {
  private static final Logger logger = 
      LoggerFactory.getLogger(RentalsService.class.getSimpleName());

  private final RentalsRepository rentalsRepository;

  @Autowired
  public RentalsService(RentalsRepository rentalsRepository) {
    logger.info("RentalsService initialized");
    this.rentalsRepository = rentalsRepository;
  }

  /**
   * Returns all rentals in the system.
   *
   * @return a list of all rentals
   */
  public List<Rentals> findAll() {
    logger.info("Fetching all rentals");
    return (List<Rentals>) rentalsRepository.findAll();
  }

  /**
   * Returns a rental based on its ID.
   *
   * @param id the ID of the rental to find
   * @return the found rental
   * @throws RentalNotFoundException if no rental is found with the given ID
   */
  public Rentals findById(Long id) throws RentalNotFoundException {
    logger.info("Fetching rental with id: {}", id);
    return rentalsRepository.findById(id)
      .orElseThrow(() -> new RentalNotFoundException("Rental not found with id: " + id));
  }

  /**
   * Saves a rental to the database.
   *
   * @param rental the rental to save
   * @return the saved rental
   */
  public Rentals save(Rentals rental) {
    logger.info("Saving rental for rental-period: {} to {}", rental.getStartDate(), rental.getEndDate());
    return rentalsRepository.save(rental);
  }

  /**
   * Deletes a rental by its ID.
   *
   * @param id the ID of the rental to delete
   * @throws RentalNotFoundException if no rental is found with the given ID
   */
  public void deleteById(Long id) throws RentalNotFoundException {
    logger.info("Deleting rental with id: {}", id);
    if (!rentalsRepository.existsById(id)) {
      throw new RentalNotFoundException("Rental not found with id: " + id);
    }
    rentalsRepository.deleteById(id);
  }

  public List<Rentals> findByProviderIdAndCarId(Long providerId, Long carId, Pageable pageable) {
    logger.info("Fetching rental with provider id {} and car id: {} and sorting by: {}",
        providerId, carId, pageable);
    return rentalsRepository.findByProviderIdAndCarId(providerId, carId, pageable);
  }

  public List<Rentals> findByRenterId(Long renterId) {
    logger.info("Fetching rentals with renter id: {}", renterId);
    return rentalsRepository.findByRenterId(renterId);
  }
}