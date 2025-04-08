package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.models.Accounts;
import no.ntnu.logic.service.AccountsService;

@RestController
@RequestMapping("/accounts")
public class AccountsController {
  private final AccountsService accountsService;
  private static final Logger logger = 
      LoggerFactory.getLogger(AccountsController.class.getSimpleName());

  @Autowired
  public AccountsController(AccountsService accountsService) {
    this.accountsService = accountsService;
  }

  @GetMapping
  @ApiOperation(value = "Returns all accounts.")
  public ResponseEntity<List<Accounts>> getAllAccounts() {
    logger.info("Fetching all accounts");
    List<Accounts> accounts = accountsService.findAll();
    logger.debug("Fetched {} accounts", accounts.size());
    return ResponseEntity.status(HttpStatus.OK).body(accounts);
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> getAccountById(@PathVariable Long id) {
    logger.info("Fetching account with id: {}", id);
    Accounts account = accountsService.findById(id);
    logger.debug("Fetched account: {}", account);
    return ResponseEntity.status(HttpStatus.OK).body(account);
  }

  @PostMapping
  @ApiOperation(value = "Creates a new account.", notes = "The newly created account is returned.")
  public ResponseEntity<Accounts> createAccount(@RequestBody Accounts account) {
    logger.info("Creating new account");
    Accounts createdAccount = accountsService.save(account);
    logger.debug("Created account: {}", createdAccount);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> updateAccount(@PathVariable Long id, @RequestBody Accounts accountDetails) {
    logger.info("Updating account with id: {}", id);
    Accounts account = accountsService.findById(id);
    account.setRole(accountDetails.getRole());
    account.setPassword(accountDetails.getPassword());
    account.setCreatedAt(accountDetails.getCreatedAt());
    // TODO: Add validation for details && handle exceptions
    Accounts updatedAccount = accountsService.save(account);
    logger.debug("Updated account: {}", updatedAccount);
    return ResponseEntity.status(HttpStatus.OK).body(updatedAccount);
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
    logger.info("Deleting account with id: {}", id);
    accountsService.deleteById(id);
    logger.debug("Deleted account with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}