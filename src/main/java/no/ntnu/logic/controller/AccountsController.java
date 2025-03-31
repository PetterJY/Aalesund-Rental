package no.ntnu.logic.controller;

import java.util.List;
import java.util.Optional;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import no.ntnu.entity.Accounts;
import no.ntnu.logic.repository.AccountsRepository;

@RestController
@RequestMapping("/accounts")
public class AccountsController {
  @Autowired
  private final AccountsRepository accountsRepository;

  public AccountsController(AccountsRepository accountsRepository) {
    this.accountsRepository = accountsRepository;
  }

  @GetMapping
  @ApiOperation(value = "Returns all accounts.")
  public List<Accounts> getAllAccounts() {
    return (List<Accounts>) accountsRepository.findAll();
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> getAccountById(@PathVariable Long id) {
    Optional<Accounts> account = accountsRepository.findById(id);
    return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  @ApiOperation(value = "Creates a new account.", notes = "The newly created account is returned.")
  public Accounts createAccount(@RequestBody Accounts account) {
    return accountsRepository.save(account);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> updateAccount(@PathVariable Long id, @RequestBody Accounts accountDetails) {
    Optional<Accounts> account = accountsRepository.findById(id);
    if (account.isPresent()) {
      Accounts updatedAccount = account.get();
      updatedAccount.setRole(accountDetails.getRole());
      updatedAccount.setPassword(accountDetails.getPassword());
      updatedAccount.setCreatedAt(accountDetails.getCreatedAt());
      return ResponseEntity.ok(accountsRepository.save(updatedAccount));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an account by its ID.", notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
    if (accountsRepository.existsById(id)) {
      accountsRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}