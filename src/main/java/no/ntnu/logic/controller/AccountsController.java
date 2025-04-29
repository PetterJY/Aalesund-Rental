package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;
import no.ntnu.entity.dto.DeleteAccountRequest;
import no.ntnu.entity.models.Accounts;
import no.ntnu.logic.service.AccountsService;
import no.ntnu.logic.service.AdminService;
import no.ntnu.logic.service.AuthenticationService;
import no.ntnu.logic.service.ProvidersService;
import no.ntnu.logic.service.UsersService;

/**
 * Controller for managing accounts.
 * This class provides endpoints for creating, updating, deleting, and retrieving accounts.
 */
@RestController
@RequestMapping("/accounts")
public class AccountsController {
  private final AuthenticationService authenticationService;

  private final AccountsService accountsService;

  private final AdminService adminService;
  private final ProvidersService providersService;
  private final UsersService usersService;
  private static final Logger logger =
      LoggerFactory.getLogger(AccountsController.class.getSimpleName());

  @Autowired
  public AccountsController(AccountsService accountsService,
                            AuthenticationService authenticationService,
                            AdminService adminService,
                            ProvidersService providersService,
                            UsersService usersService) {
    this.accountsService = accountsService;
    this.authenticationService = authenticationService;
    this.adminService = adminService;
    this.providersService = providersService;
    this.usersService = usersService;
  }

  /**
   * Returns all accounts in the system.
   *
   * @return a list of all accounts
   */
  @GetMapping
  @ApiOperation(value = "Returns all accounts.")
  public ResponseEntity<List<Accounts>> getAllAccounts() {
    logger.info("Fetching all accounts");
    List<Accounts> accounts = accountsService.findAll();
    logger.debug("Fetched {} accounts", accounts.size());
    return ResponseEntity.status(HttpStatus.OK).body(accounts);
  }

  /**
   * Returns an account by its ID.
   *
   * @param id the ID of the account to find
   * @return the found account
   */
  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an account by its ID.", 
      notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> getAccountById(@PathVariable Long id) {
    logger.info("Fetching account with id: {}", id);
    Accounts account = accountsService.findById(id);
    logger.debug("Fetched account: {}", account);
    return ResponseEntity.status(HttpStatus.OK).body(account);
  }


  /**
   * Updates an account by its ID.
   *
   * @param id the ID of the account to update
   * @param accountDetails the new details for the account
   * @return the updated account
   */
  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an account by its ID.", 
      notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> updateAccount(
      @PathVariable Long id, @RequestBody Accounts accountDetails) {
    logger.info("Updating account with id: {}", id);
    Accounts account = accountsService.findById(id);
    account.setRole(accountDetails.getRole());
    account.setPassword(accountDetails.getPassword());
    account.setCreatedAt(accountDetails.getCreatedAt());
    // TODO: Add validation for details
    Accounts updatedAccount = accountsService.save(account);
    logger.debug("Updated account: {}", updatedAccount);
    return ResponseEntity.status(HttpStatus.OK).body(updatedAccount);
  }



  /**
   * Deletes an account by its ID.
   * This method is not 'role-sensitive'.
   *
   * @return a response entity with status NO_CONTENT
   */
  @DeleteMapping
  @ApiOperation(value = "Deletes an account by its ID.",
      notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAccount(@Valid @RequestBody DeleteAccountRequest request,
                                            Authentication authentication) {
    String identifier = authentication.getName();
    String role = authentication.getAuthorities().iterator().next().getAuthority();

    logger.info("Deleting account with identifier: {}", identifier);
    logger.debug("Account role: {}", role);

    if (authenticationService.verifyPassword(identifier, request.getPassword())) {
      Accounts account = accountsService.findByIdentifier(identifier, role);
      accountsService.deleteById(account.getId());
      SecurityContextHolder.clearContext();
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.status(401).build();
    }
  }
}