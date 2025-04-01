package no.ntnu.logic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.Users;
import no.ntnu.entity.exceptions.UserNotFoundException;
import no.ntnu.logic.repository.UsersRepository;

@Service
public class UsersService {

  @Autowired
  private UsersRepository usersRepository;

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
    usersRepository.deleteById(id);
  }
}