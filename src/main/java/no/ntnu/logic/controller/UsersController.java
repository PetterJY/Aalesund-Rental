package no.ntnu.logic.controller;

import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.UsersRepository;

@RestController
public class UsersController {
  private final UsersRepository usersRepository;

  public UsersController(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }
}
