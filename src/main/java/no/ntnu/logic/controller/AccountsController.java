package no.ntnu.logic.controller;

import java.util.List;
import java.util.Optional;

import io.swagger.annotations.ApiOperation;
import no.ntnu.logic.service.AccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import no.ntnu.entity.Accounts;
import no.ntnu.logic.repository.AccountsRepository;

@RestController
@RequestMapping("/accounts")
public class AccountsController {
  private final AccountsService accountsService;

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
    Optional<Accounts> account = accountsService.findById(id);
    return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  @ApiOperation(value = "Creates a new account.", notes = "The newly created account is returned.")
  public Accounts createAccount(@RequestBody Accounts account) {
    return accountsService.save(account);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> updateAccount(@PathVariable Long id, @RequestBody Accounts accountDetails) {
    Optional<Accounts> account = accountsService.findById(id);
    if (account.isPresent()) {
      Accounts updatedAccount = account.get();
      updatedAccount.setRole(accountDetails.getRole());
      updatedAccount.setPassword(accountDetails.getPassword());
      updatedAccount.setCreatedAt(accountDetails.getCreatedAt());
      return ResponseEntity.ok(accountsService.save(updatedAccount));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
    if (accountsService.findById(id).isPresent()) {
      accountsService.deleteById(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}