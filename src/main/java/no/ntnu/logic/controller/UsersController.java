package no.ntnu.logic.controller;

import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;
import no.ntnu.entity.dto.UserDetails;
import no.ntnu.entity.models.Cars;
import no.ntnu.entity.models.Users;
import no.ntnu.logic.service.UsersService;
import no.ntnu.logic.service.CarsService;

/**
 * Controller for managing user-related operations.
 */
@RestController
@RequestMapping("/users")
public class UsersController {
  private static final Logger logger = 
      LoggerFactory.getLogger(UsersController.class.getSimpleName());
  
  private final UsersService usersService;
  private final CarsService carsService;

  @Autowired
  public UsersController(UsersService usersService, CarsService carsService) {
    this.usersService = usersService;
    this.carsService = carsService;
  }

  /**
   * Returns all users.
   *
   * @return List of all users.
   */
  @GetMapping
  @ApiOperation(value = "Returns all users.")
  public ResponseEntity<List<Users>> findAll() {
    logger.info("Fetching all users");
    List<Users> users =  usersService.findAll();
    logger.debug("Fetched {} users", users.size());
    return ResponseEntity.ok(users);
  }

  /**
   * Returns a user by its ID.
   *
   * @param id The ID of the user.
   * @return The user with the specified ID.
   */
  @GetMapping("/{id}")
  @ApiOperation(
      value = "Returns a user by its ID.", 
      notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Users> getUserById(@PathVariable Long id) {
    logger.info("Fetching user with id: {}", id);
    Users user = usersService.findById(id);
    logger.debug("Fetched user: {}", user);
    return ResponseEntity.ok(user);
  }

  /**
   * Creates a new user.
   *
   * @param registerRequest The user registration details.
   * @return The newly created user.
   */
  @PostMapping("/register")
  @ApiOperation(value = "Creates a new user.", notes = "The newly created user is returned.")
  public ResponseEntity<Users> register(@Valid @RequestBody UserDetails registerRequest) {
    Users user = new Users();
    user.setFirstName(registerRequest.getFirstName());
    user.setLastName(registerRequest.getLastName());
    user.setEmail(registerRequest.getEmail());
    user.setPassword(registerRequest.getPassword());
    user.setPhoneNumber(registerRequest.getPhoneNumber());
    
    logger.info("Creating new user");
    Users createdUser = usersService.save(user);
    logger.debug("Created user: {}", createdUser);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
  }

  /**
   * Updates a user by its ID.
   *
   * @param id          The ID of the user.
   * @param userDetails The updated user details.
   * @return The updated user.
   */
  @PutMapping("/{id}")
  @ApiOperation(value = "Updates a user by its ID.", 
      notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Users> updateUser(
        @PathVariable Long id, @Valid @RequestBody UserDetails userDetails) {
    logger.info("Updating user with id: {}", id);
    Users user = usersService.findById(id);
    user.setFirstName(userDetails.getFirstName());
    user.setLastName(userDetails.getLastName());
    user.setEmail(userDetails.getEmail());
    user.setPassword(userDetails.getPassword());
    Users updatedUser = usersService.saveWithoutEncoding(user);
    logger.debug("Updated user: {}", updatedUser);
    return ResponseEntity.ok(updatedUser);
  }

  /**
   * Deletes a user by its ID.
   *
   * @param id The ID of the user to delete.
   * @return A response indicating the result of the operation.
   */
  @PostMapping("/{userId}/favourites/{carId}")
  @ApiOperation(value = "Adds a car to the user's favourites.")
  public ResponseEntity<?> addFavourite(@PathVariable Long userId, @PathVariable Long carId) {
    Users user = usersService.findById(userId);
    Cars car = carsService.findById(carId);
    user.getFavouriteCars().add(car);
    usersService.save(user);
    return ResponseEntity.ok().build();
  }

  /**
   * Deletes a user by its ID.
   *
   * @param id The ID of the user to delete.
   * @return A response indicating the result of the operation.
   */
  @DeleteMapping("/{userId}/favourites/{carId}")
  @ApiOperation(value = "Removes a car from the user's favourites.")
  public ResponseEntity<?> removeFavourite(@PathVariable Long userId, @PathVariable Long carId) {
    Users user = usersService.findById(userId);
    Cars car = carsService.findById(carId);
    user.getFavouriteCars().remove(car);
    usersService.save(user);
    return ResponseEntity.ok().build();
  }

  /**
   * Returns the user's favourite cars.
   *
   * @param userId The ID of the user.
   * @return The user's favourite cars.
   */
  @GetMapping("/{userId}/favourites")
  @ApiOperation(value = "Returns the user's favourite cars.")
  public ResponseEntity<Set<Cars>> getFavourites(@PathVariable Long userId) {
    Users user = usersService.findById(userId);
    return ResponseEntity.ok(user.getFavouriteCars());
  }
}