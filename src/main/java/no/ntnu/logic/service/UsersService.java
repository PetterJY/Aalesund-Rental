package no.ntnu.logic.service;

import no.ntnu.entity.exceptions.UserNotFoundException;
import no.ntnu.entity.models.Users;
import no.ntnu.logic.repository.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing user-related operations.
 * This class provides methods to find, save, delete, and authenticate users.
 */
@Service
public class UsersService {

  private final UsersRepository usersRepository;

  private static final Logger logger = LoggerFactory.getLogger(UsersService.class);

  @Autowired
  public UsersService(UsersRepository usersRepository) {
    logger.info("UsersService initialized");
    this.usersRepository = usersRepository;
  }

  /**
   * Returns all users in the system.
   *
   * @return an iterable collection of all users
   */
  public Iterable<Users> findAll() {
    logger.info("Fetching all users");
    return usersRepository.findAll();
  }

  /**
   * Returns a user based on their ID.
   *
   * @param id the ID of the user to find
   * @return the found user
   * @throws UserNotFoundException if no user is found with the given ID
   */
  public Users findById(Long id) throws UserNotFoundException {
    logger.info("Fetching user with id: {}", id);
    return usersRepository.findById(id)
      .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
  }

  /**
   * Saves a user to the database.
   *
   * @param user the user to save.
   * @return the saved user.
   */
  public Users save(Users user) {
    logger.info("Saving user with id: {}", user.getId());
    return usersRepository.save(user);
  }

  /**
   * Deletes a user based on their ID.
   *
   * @param id the ID of the user to delete
   * @throws UserNotFoundException if no user is found with the given ID
   */
  public void deleteById(Long id) throws UserNotFoundException {
    logger.info("Deleting user with id: {}", id);
    if (!usersRepository.existsById(id)) {
      throw new UserNotFoundException("User not found with id: " + id);
    }
    usersRepository.deleteById(id);
  }
}