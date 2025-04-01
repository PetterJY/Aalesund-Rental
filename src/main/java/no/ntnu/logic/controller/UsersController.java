package no.ntnu.logic.controller;

import java.util.List;
import java.util.Optional;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.Users;
import no.ntnu.entity.exceptions.UserNotFoundException;
import no.ntnu.logic.repository.UsersRepository;
import no.ntnu.logic.service.UsersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {

  private final UsersService usersService;
  private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

  @Autowired
  public UsersController(UsersService usersService) {
    this.usersService = usersService;
  }

  @GetMapping
  @ApiOperation(value = "Returns all users.")
  public List<Users> getAllUsers() {
    return (List<Users>) usersService.findAll();
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns a user by its ID.", notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Users> getUserById(@PathVariable Long id) {
    Users user = usersService.findById(id);
    if (user.isPresent()) {
      return ResponseEntity.ok(user.get());
    } else {
      logger.error("User not found with id: {}", id);
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  @ApiOperation(value = "Creates a new user.", notes = "The newly created user is returned.")
  public Users createUser(@RequestBody Users user) {
    return usersService.save(user);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates a user by its ID.", notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users userDetails) {
    try {
      Users user = usersService.findById(id);
      user.setFirstName(userDetails.getFirstName());
      user.setLastName(userDetails.getLastName());
      user.setEmail(userDetails.getEmail());
      return ResponseEntity.ok(usersService.save(user));
    } catch (UserNotFoundException e) {
      logger.error("User not found with id: {}", id, e);
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      logger.error("Error updating user with id: {}", id, e);
      return ResponseEntity.status(500).build();
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes a user by its ID.", notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    try {
      usersService.deleteById(id);
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      logger.error("User not found with id: {}", id, e);
      return ResponseEntity.notFound().build();
    }
  }
}