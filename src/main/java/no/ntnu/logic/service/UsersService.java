package no.ntnu.logic.service;

import java.util.List;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.UserNotFoundException;
import no.ntnu.entity.models.Users;
import no.ntnu.logic.repository.UsersRepository;

/**
 * Service class for managing user-related operations.
 * This class provides methods to find, save, delete, and authenticate users.
 */
@Service
public class UsersService {
  private static final Logger logger = 
      LoggerFactory.getLogger(UsersService.class.getSimpleName());
  
  private final UsersRepository usersRepository;

  private final BCryptPasswordEncoder passwordEncoder;

  @Autowired
  public UsersService(UsersRepository usersRepository, BCryptPasswordEncoder passwordEncoder) {
    this.usersRepository = usersRepository;
    this.passwordEncoder = passwordEncoder;
  }

  /**
   * Returns all users in the system.
   *
   * @return a list of all users
   */
  public List<Users> findAll() {
    logger.info("Fetching all users");
    return StreamSupport.stream(usersRepository.findAll().spliterator(), false)
        .filter(user -> !user.isDeleted())
        .toList();
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
        .filter(user -> !user.isDeleted())
        .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
  }

  /**
   * Saves a user to the database.
   *
   * @param user the user to save.
   * @return the saved user.
   */
  public Users save(Users user) {
    logger.info("Saving user with email: {}", user.getEmail());
    String password = user.getPassword();
    user.setPassword(passwordEncoder.encode(password));
    return usersRepository.save(user);
  }

  /**
   * Saves a user to the database with the option to not encode the password.
   *
   * @param user the user to save.
   * @param encodePassword whether to encode the password or not.
   * @return the saved user.
   */
  public Users save(Users user, boolean encodePassword) {
    if (encodePassword) {
      logger.debug("Encoding password for user with email: {}", user.getEmail());
      return save(user);
    }
    logger.info("Saving user with email: {}", user.getEmail());
    return usersRepository.save(user);
  }
}