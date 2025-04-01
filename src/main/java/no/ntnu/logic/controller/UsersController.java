package no.ntnu.logic.controller;

import java.util.List;
import java.util.Optional;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.Users;
import no.ntnu.logic.repository.UsersRepository;
import no.ntnu.entity.exceptions.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {

  private final UsersRepository UsersRepository;
  private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

  @Autowired
  public UsersController(UsersRepository UsersRepository) {
    this.UsersRepository = UsersRepository;
  }

  @GetMapping
  @ApiOperation(value = "Returns all users.")
  public List<Users> getAllUsers() {
    return (List<Users>) UsersRepository.findAll();
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns a user by its ID.", notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Users> getUserById(@PathVariable Long id) {
    Users user = UsersRepository.findById(id);
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
    return UsersRepository.save(user);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates a user by its ID.", notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users userDetails) {
    Optional<Users> userOptional = UsersRepository.findById(id);
    if (userOptional.isPresent()) {
      Users user = userOptional.get();
      user.setName(userDetails.getName());
      user.setEmail(userDetails.getEmail());
      // Update other fields as necessary
      return ResponseEntity.ok(UsersRepository.save(user));
    } else {
      logger.error("User not found with id: {}", id);
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes a user by its ID.", notes = "If the user is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    try {
      UsersRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      logger.error("User not found with id: {}", id, e);
      return ResponseEntity.notFound().build();
    }
  }
}