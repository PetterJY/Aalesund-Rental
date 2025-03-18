package no.ntnu.logic.controller;

import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.AccountsRepository;

@RestController
public class AccountsController {
  private final AccountsRepository accountsRepository;

  public AccountsController(AccountsRepository accountsRepository) {
    this.accountsRepository = accountsRepository;
  }
}
