package no.ntnu.logic.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.Users;
import no.ntnu.entity.exceptions.UserNotFoundException;
import no.ntnu.logic.repository.UsersRepository;

@Service
public class UsersService {

  private final UsersRepository usersRepository;

  private static final Logger logger = LoggerFactory.getLogger(UsersService.class);

  @Autowired
  public UsersService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  public Iterable<Users> findAll() {
    logger.info("Fetching all users");
    return usersRepository.findAll();
  }

  public Users findById(Long id) throws UserNotFoundException {
    logger.info("Fetching user with id: {}", id);
    return usersRepository.findById(id)
      .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
  }

  public Users save(Users user) {
    logger.info("Saving user with id: {}", user.getId());
    return usersRepository.save(user);
  }

  public void deleteById(Long id) throws UserNotFoundException {
    logger.info("Deleting user with id: {}", id);
    if (!usersRepository.existsById(id)) {
      throw new UserNotFoundException("User not found with id: " + id);
    }
    usersRepository.deleteById(id);
  }
}