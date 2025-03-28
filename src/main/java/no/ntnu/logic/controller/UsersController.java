package no.ntnu.logic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.UsersRepository;

@RestController
public class UsersController {
  @Autowired
  private UsersRepository usersRepository;
}
