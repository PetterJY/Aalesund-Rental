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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.validation.Valid;
import no.ntnu.entity.dto.UserDetails;
import no.ntnu.entity.models.Cars;
import no.ntnu.entity.models.Users;
import no.ntnu.logic.service.CarsService;
import no.ntnu.logic.service.UsersService;


/**
 * Controller for managing user-related operations.
 */
@RestController
@Tag(name = "Users API", description = "API for managing user resources")
@RequestMapping("/api/users")
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
  @Operation(
      summary = "Returns all users.",
      description = "Retrieves a list of all registered users in the system.")
  public ResponseEntity<List<Users>> findAll() {
    logger.info("Fetching all users");
    List<Users> users =  usersService.findAll();
    logger.debug("Fetched {} users", users.size());
    return ResponseEntity.ok(users);
  }

  /**
   * Creates a new user.
   *
   * @param registerRequest The user registration details.
   * @return The newly created user.
   */
  @PostMapping("/register")
  @Operation(summary = "Creates a new user.", description = "The newly created user is returned.")
  public ResponseEntity<Users> register(
        @Parameter(description = "User registration details", required = true)
      @Valid @RequestBody UserDetails registerRequest) {
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
   * @param id The ID of the user.
   * @param userDetails The updated user details.
   * @return The updated user.
   */
  @PutMapping("/{id}")
  @Operation(
      summary = "Updates a user by its ID.",
      description = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Users> updateUser(
        @Parameter(description = "User ID", required = true)
        @PathVariable Long id,
        @Parameter(description = "Updated user details", required = true)
        @Valid @RequestBody UserDetails userDetails) {
    logger.info("Updating user with id: {}", id);
    Users user = usersService.findById(id);
    user.setFirstName(userDetails.getFirstName());
    user.setLastName(userDetails.getLastName());
    user.setEmail(userDetails.getEmail());
    user.setPassword(userDetails.getPassword());
    Users updatedUser = usersService.saveWithoutEncode(user);
    logger.debug("Updated user: {}", updatedUser);
    return ResponseEntity.ok(updatedUser);
  }

  /**
   * Adds a car to the user's favourites.
   * 
   * @param userId The ID of the user.
   * @param carId The ID of the car to add to favourites.
   * @return
   */
  @PostMapping("/{userId}/favourites/{carId}")
  @Operation(
      summary = "Adds a car to the user's favourites.",
      description = "Adds a car to the user's favourites.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Car added to favourites"),
        @ApiResponse(responseCode = "404", description = "User or car not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<?> addFavourite(
        @Parameter(description = "User ID", required = true, example = "123")
      @PathVariable Long userId,
        @Parameter(description = "Car ID", required = true, example = "123")
        @PathVariable Long carId) {
    logger.info("Adding car with id {} to favourites of user with id {}", carId, userId);
    Users user = usersService.findById(userId);
    Cars car = carsService.findById(carId);
    user.getFavouriteCars().add(car);
    usersService.saveWithoutEncode(user);
    logger.debug("Car with id {} added to favourites of user with id {}", carId, userId);
    return ResponseEntity.ok().build();
  }


  /**
   * Removes a car from the user's favourites.
   *
   * @param userId The ID of the user.
   * @param carId The ID of the car to remove from favourites.
   * @return
   */
  @DeleteMapping("/{userId}/favourites/{carId}")
  @Operation(
      summary = "Remove car from favorites",
      description = "Removes a specific car from the user's favorites list")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Car successfully removed from favorites"),
      @ApiResponse(responseCode = "204", description = "Car was not in the user's favorites"),
      @ApiResponse(responseCode = "404", description = "User or car not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
    })
  public ResponseEntity<?> removeFavourite(
        @Parameter(description = "User ID", required = true, example = "123")
      @PathVariable Long userId,
        @Parameter(description = "Car ID", required = true, example = "123")
        @PathVariable Long carId) {
    logger.info("Removing car with id {} from favourites of user with id {}", carId, userId);
    Users user = usersService.findById(userId); // Will throw UserNotFoundException if not found
    Cars car = carsService.findById(carId); // Will throw CarNotFoundException if not found
    user.getFavouriteCars().remove(car);
    usersService.saveWithoutEncode(user);
    logger.debug("Car with id {} removed from favourites of user with id {}", carId, userId);
    return ResponseEntity.ok().build();
  }

  /**
   * Returns the user's favourite cars.
   *
   * @param userId The ID of the user.
   * @return The user's favourite cars.
   */
  @GetMapping("/{userId}/favourites")
  @Operation(
      summary = "Get user's favorite cars",
      description = "Retrieves all cars marked as favorites by the specified user")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "List of favorite cars retrieved successfully"),
      @ApiResponse(responseCode = "204", description = "User has no favorite cars"),
      @ApiResponse(responseCode = "404", description = "User not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Set<Cars>> getFavourites(
      @Parameter(name = "userId",
          description = "ID of the user whose favorites to retrieve",
          required = true,
          example = "123")
      @PathVariable Long userId) {
    logger.info("Fetching favourite cars for user with id {}", userId);
    Users user = usersService.findById(userId);
    Set<Cars> favouriteCars = user.getFavouriteCars();
    if (favouriteCars.isEmpty()) {
      logger.warn("No favourite cars found for user with id {}", userId);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    logger.debug("Fetched favourite cars for user with id {}", userId);
    return ResponseEntity.ok(user.getFavouriteCars());
  }
}