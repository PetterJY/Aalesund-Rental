package no.ntnu.logic.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import no.ntnu.entity.Users;
import no.ntnu.entity.exceptions.UserNotFoundException;
import no.ntnu.logic.repository.UsersRepository;

import javax.validation.ConstraintViolationException;

@Service
public class UsersService {

  private static final Logger logger = LoggerFactory.getLogger(UsersService.class);
  private final UsersRepository usersRepository;

  @Autowired
  public UsersService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  public Iterable<Users> findAll() {
    try {
      return usersRepository.findAll();
    } catch (DataAccessException e) {
      logger.error("Error accessing data while fetching all users", e);
      throw new DataAccessException("Unable to fetch users", e) {};
    }
  }

  public Users findById(Long id) {
    try {
      return usersRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    } catch (DataAccessException e) {
      logger.error("Error accessing data while fetching user with id: {}", id, e);
      throw new DataAccessException("Unable to fetch user with id: " + id, e) {};
    }
  }

  public Users save(Users user) {
    try {
      return usersRepository.save(user);
    } catch (ConstraintViolationException e) {
      logger.error("Validation error while saving user", e);
      throw new DataAccessException("Validation error while saving user", e) {};
    } catch (DataAccessException e) {
      logger.error("Error accessing data while saving user with id {}", user.getId(), e);
      throw new DataAccessException("Unable to save user", e) {};
    }
  }

  public void deleteById(Long id) {
    try {
      if (!usersRepository.existsById(id)) {
        throw new UserNotFoundException("User not found with id: " + id);
      }
      usersRepository.deleteById(id);
    } catch (DataIntegrityViolationException e) {
      logger.error("Integrity violation while deleting user with id: {}", id, e);
      throw new DataAccessException("Integrity violation while deleting user with id: " + id, e) {};
    } catch (DataAccessException e) {
      logger.error("Error accessing data while deleting user with id: {}", id, e);
      throw new DataAccessException("Unable to delete user with id: " + id, e) {};
    }
  }
}