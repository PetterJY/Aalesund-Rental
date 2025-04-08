package no.ntnu.logic.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
public class UsersService implements UserDetailsService {
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
   * Returns a user based on their email.
   *
   * @param email the email of the user to find
   * @return the found user
   * @throws UserNotFoundException if no user is found with the given email
   */
  public Users findByEmail(String email) throws UserNotFoundException {
    logger.info("Fetching user with email: {}", email);
    return usersRepository.findByEmail(email)
      .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    try {
      Users user = findByEmail(email);
      return User.builder()
              .username(user.getEmail())
              .password(user.getAccount().getPassword())
              .roles(user.getAccount().getRole())
              .build();
    } catch (UserNotFoundException e) {
      throw new UsernameNotFoundException("User not found with email: " + email);
    }
  }

  /**
   * Saves a user to the database.
   *
   * @param user the user to save.
   * @return the saved user.
   */
  public Users save(Users user) {
    logger.info("Saving user with email: {}", user.getEmail());
    user.getAccount().setPassword(passwordEncoder.encode(user.getAccount().getPassword()));
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

  public String encodePassword(String password) {
    return passwordEncoder.encode(password);
  }
}