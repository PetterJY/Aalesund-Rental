package no.ntnu.logic.controller;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.dto.RegisterRequest;
import no.ntnu.entity.exceptions.AuthenticationException;
import no.ntnu.entity.models.Accounts;
import no.ntnu.entity.models.Users;
import no.ntnu.logic.service.UsersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing user-related operations.
 */
@RestController
@RequestMapping("/users")
public class UsersController {

  private final UsersService usersService;
  private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

  @Autowired
  public UsersController(UsersService usersService) {
    this.usersService = usersService;
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
    List<Users> users = (List<Users>) usersService.findAll();
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
  @ApiOperation(value = "Returns a user by its ID.", notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Users> getUserById(@PathVariable Long id) {
    logger.info("Fetching user with id: {}", id);
    Users user = usersService.findById(id);
    logger.debug("Fetched user: {}", user);
    return ResponseEntity.ok(user);
  }

  /**
   * Creates a new user.
   *
   * @param registerRequest The registration details.
   * @return The newly created user.
   */
  @PostMapping("/register")
  @ApiOperation(value = "Creates a new user.", notes = "The newly created user is returned.")
  public ResponseEntity<Users> register(@RequestBody RegisterRequest registerRequest) {
    Users user = new Users();
    user.setFirstName(registerRequest.getFirstName());
    user.setLastName(registerRequest.getLastName());
    user.setEmail(registerRequest.getEmail());

    Accounts account = new Accounts();
    account.setPassword(registerRequest.getPassword());
    account.setRole(registerRequest.getRole());

    user.setAccount(account);

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
  @ApiOperation(value = "Updates a user by its ID.", notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users userDetails) {
    logger.info("Updating user with id: {}", id);
    Users user = usersService.findById(id);
    user.setFirstName(userDetails.getFirstName());
    user.setLastName(userDetails.getLastName());
    user.setEmail(userDetails.getEmail());
    // TODO: Add validation for user details & handle exceptions
    Users updatedUser = usersService.save(user);
    logger.debug("Updated user: {}", updatedUser);
    return ResponseEntity.ok(updatedUser);
  }

  /**
   * Deletes a user by its ID.
   *
   * @param id The ID of the user.
   * @return A response indicating the deletion status.
   */
  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes a user by its ID.", notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    logger.info("Deleting user with id: {}", id);
    usersService.deleteById(id);
    logger.debug("Deleted user with id: {}", id);
    return ResponseEntity.noContent().build();
  }
}