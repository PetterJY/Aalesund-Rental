package no.ntnu.logic.controller;

import java.util.List;
import java.util.Optional;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.exceptions.AccountNotFoundException;
import no.ntnu.logic.service.AccountsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import no.ntnu.entity.Accounts;

@RestController
@RequestMapping("/accounts")
public class AccountsController {
  private final AccountsService accountsService;
  private static final Logger logger = LoggerFactory.getLogger(AccountsController.class);

  @Autowired
  public AccountsController(AccountsService accountsService) {
    this.accountsService = accountsService;
  }

  @GetMapping
  @ApiOperation(value = "Returns all accounts.")
  public List<Accounts> getAllAccounts() {
    return (List<Accounts>) accountsService.findAll();
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> getAccountById(@PathVariable Long id) {
    try {
      Accounts account = accountsService.findById(id);
      return ResponseEntity.ok(account);
    } catch (AccountNotFoundException e) {
      logger.error("Account not found with id: {}", id, e);
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  @ApiOperation(value = "Creates a new account.", notes = "The newly created account is returned.")
  public Accounts createAccount(@RequestBody Accounts account) {
    return accountsService.save(account);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> updateAccount(@PathVariable Long id, @RequestBody Accounts accountDetails) {
    try {
      Accounts account = accountsService.findById(id);
      account.setRole(accountDetails.getRole());
      account.setPassword(accountDetails.getPassword());
      account.setCreatedAt(accountDetails.getCreatedAt());
      return ResponseEntity.ok(accountsService.save(account));
    } catch (AccountNotFoundException e) {
      logger.error("Account not found with id: {}", id, e);
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
    try {
      accountsService.deleteById(id);
      return ResponseEntity.noContent().build();
    } catch (AccountNotFoundException e) {
      logger.error("Account not found with id: {}", id, e);
      return ResponseEntity.notFound().build();
    }
  }
}