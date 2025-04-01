package no.ntnu.logic.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.Rentals;
import no.ntnu.entity.exceptions.RentalNotFoundException;
import no.ntnu.logic.repository.RentalsRepository;

@Service
public class RentalsService {

  private static final Logger logger = LoggerFactory.getLogger(RentalsService.class);
  private final RentalsRepository rentalsRepository;

  @Autowired
  public RentalsService(RentalsRepository rentalsRepository) {
    logger.info("RentalsService initialized");
    this.rentalsRepository = rentalsRepository;
  }

  public List<Rentals> findAll() {
    logger.info("Fetching all rentals");
    return (List<Rentals>) rentalsRepository.findAll();
  }

  public Rentals findById(Long id) throws RentalNotFoundException {
    logger.info("Fetching rental with id: {}", id);
    return rentalsRepository.findById(id)
      .orElseThrow(() -> new RentalNotFoundException("Rental not found with id: " + id));
  }

  public Rentals save(Rentals rental) {
    logger.info("Saving rental with id: {}", rental.getRentalId());
    return rentalsRepository.save(rental);
  }

  public void deleteById(Long id) throws RentalNotFoundException {
    logger.info("Deleting rental with id: {}", id);
    if (!rentalsRepository.existsById(id)) {
      throw new RentalNotFoundException("Rental not found with id: " + id);
    }
    rentalsRepository.deleteById(id);
  }
}