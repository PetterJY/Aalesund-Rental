package no.ntnu.logic.controller;

import java.util.List;

import org.hibernate.annotations.OptimisticLock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import no.ntnu.entity.dto.DeleteAccountRequest;
import no.ntnu.entity.models.Accounts;
import no.ntnu.logic.service.AccountsService;
import no.ntnu.logic.service.AdminService;
import no.ntnu.logic.service.ProvidersService;
import no.ntnu.logic.service.UsersService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * Controller for managing accounts.
 * This class provides endpoints for creating, updating, deleting, and retrieving accounts.
 */
@RestController
@Tag(name = "Accounts API", description = "API for managing accounts resources")
@RequestMapping("/accounts")
public class AccountsController {
    private static final Logger logger =
        LoggerFactory.getLogger(AccountsController.class.getSimpleName());

  private final AccountsService accountsService;

  private AuthenticationManager authenticationManager;

  @Autowired
  public AccountsController(AccountsService accountsService,
                            AdminService adminService,
                            ProvidersService providersService,
                            UsersService usersService,
                            AuthenticationManager authenticationManager) {
    // TODO: remove unused parameters?
    this.accountsService = accountsService;
    this.authenticationManager = authenticationManager;
  }

  /**
   * Returns all accounts in the system.
   *
   * @return a list of all accounts
   */

  @GetMapping
  @Operation(
      summary = "Get all accounts",
      description = "Returns a list of all accounts in the system. Deleted accounts are filtered out.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "List of all accounts"),
      @ApiResponse(responseCode = "404", description = "No accounts found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<List<Accounts>> getAllAccounts() {
    try {
      logger.info("Fetching all accounts");
      List<Accounts> accounts = accountsService.findAll();

      logger.debug("Fetched {} accounts", accounts.size());
      List<Accounts> filteredAccounts = accounts.stream()
          .filter(account -> !account.isDeleted())
          .toList();
      logger.debug("Filtered out deleted accounts, remaining: {}", filteredAccounts.size());

      if (filteredAccounts.isEmpty()) {
        logger.warn("No accounts found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }

      return ResponseEntity.status(HttpStatus.OK).body(filteredAccounts);
    } catch (Exception e) {
      logger.error("Error fetching accounts: {}", e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

/**
   * Returns an account by its ID.
   *
   * @param id the ID of the account to find
   * @return the found account
   */
  @GetMapping("/{id}")
  @Operation(
      summary = "Returns an account by its ID",
      description = "Fetches an account by its unique ID. If the account is not found or is deleted, a 404 error is returned."
  )
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Account retrieved successfully"),
      @ApiResponse(responseCode = "404", description = "Account not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Accounts> getAccountById(
      @Parameter(
          name = "id",
          description = "The ID of the account to retrieve",
          required = true,
          example = "123"
      )
      @PathVariable Long id) {
      try {
          logger.info("Fetching account with id: {}", id);
          Accounts account = accountsService.findById(id);

          if (account == null || account.isDeleted()) {
              logger.warn("Account with id {} not found or is deleted", id);
              return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
          }

          logger.debug("Fetched account: {}", account);
          return ResponseEntity.status(HttpStatus.OK).body(account);
      } catch (Exception e) {
          logger.error("Error fetching account with id {}: {}", id, e.getMessage(), e);
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
  }

  /**
   * Returns an account by its email.
   *
   * @param email the email of the account to find
   * @return the found account
   */
  @GetMapping("/email/{email}")
  @Operation(
      summary = "Returns an account by its email.",
      description = "Fetches an account by its email. If the account is not found, a 404 error is returned."
  )
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Account retrieved successfully"),
      @ApiResponse(responseCode = "404", description = "Account not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Accounts> getAccountByEmail(
      @Parameter(
          name = "email",
          description = "The email of the account to retrieve",
          required = true,
          example = "example@email.com"
      )
      @PathVariable String email) {
    try {
    logger.info("Fetching account with email: {}", email);
    Accounts account = accountsService.findByEmail(email);

    if (account == null) {
      logger.warn("Account with email {} not found", email);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    if (account.isDeleted()) {
      logger.warn("Account with email {} is deleted", email);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    logger.debug("Fetched account: {}", account);
    return ResponseEntity.status(HttpStatus.OK).body(account);
    } catch (Exception e) {
      logger.error("Error fetching account with email {}: {}", email, e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Deletes an account by its ID.
   * This method is not 'role-sensitive'.
   *
   * @return a response entity with status NO_CONTENT
   */
  @DeleteMapping
  @Operation(
      summary = "Deletes an account by its ID.",
      description = "Deletes an account by its ID. If the account is not found, a 404 error is returned."
  )
  @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Account deleted successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "404", description = "Account not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Void> deleteAccount(
      @Parameter(
          name = "request",
          description = "Delete account request body",
          required = true
      )
      @Valid @RequestBody DeleteAccountRequest request,
        @Parameter(
            name = "authentication",
            description = "Authentication object containing user details"
        )
        Authentication authentication) {
    String email = authentication.getName();
    String role = authentication.getAuthorities().iterator().next().getAuthority();

    logger.info("Deleting account with identifier: {}", email);
    logger.debug("Account role: {}", role);

    if (!verifyPassword(email, request.getPassword())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    Accounts account = accountsService.findByEmail(email);

    if (account == null) {
      logger.warn("Account with identifier: {} not found", email);
      return ResponseEntity.status(404).build();
    }

    logger.debug("Account found: {}", account);

    markAccountAsDeleted(account);
    logger.info("Account with identifier: {} deleted successfully", email);
    return ResponseEntity.noContent().build();    
  }


    /**
     * Verifies the password for the given email.
     *
     * @param email the email of the account
     * @param password the password to verify
     * @return true if the password is correct, false otherwise
     */
  private boolean verifyPassword(String email, String password) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(email, password));
      logger.debug("Password verified for account: {}", email);
      return true;
    } catch (BadCredentialsException e) {
      logger.warn("Password verification failed for account: {}", email);
      return false;
    }
  }

    /**
     * Marks an account as deleted.
     *
     * @param account the account to mark as deleted
     */
  private void markAccountAsDeleted(Accounts account) {
    account.setDeleted(true);
    accountsService.save(account);
    logger.debug("Account marked as deleted: {}", account);
  }
}