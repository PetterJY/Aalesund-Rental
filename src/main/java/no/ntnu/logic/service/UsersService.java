package no.ntnu.logic.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
    return usersRepository.findAll();
  }

  public Users findById(Long id) {
    return usersRepository.findById(id)
      .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
  }

  public Users save(Users user) {
    return usersRepository.save(user);
  }

  public void deleteById(Long id) {
    if (!usersRepository.existsById(id)) {
      throw new UserNotFoundException("User not found with id: " + id);
    }
    usersRepository.deleteById(id);
  }
}