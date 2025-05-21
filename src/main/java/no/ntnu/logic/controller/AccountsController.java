package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import no.ntnu.entity.dto.PasswordChangeRequest;
import no.ntnu.entity.models.Accounts;
import no.ntnu.logic.service.AccountsService;
import no.ntnu.logic.service.AdminService;
import no.ntnu.logic.service.ProvidersService;
import no.ntnu.logic.service.UsersService;

/**
 * Controller for managing accounts.
 * This class provides endpoints for creating, updating, deleting, and retrieving accounts.
 */
@RestController
@RequestMapping("/accounts")
public class AccountsController {
    private static final Logger logger =
        LoggerFactory.getLogger(AccountsController.class.getSimpleName());

  private final AccountsService accountsService;

  private AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public AccountsController(AccountsService accountsService,
                            AdminService adminService,
                            ProvidersService providersService,
                            UsersService usersService,
                            AuthenticationManager authenticationManager,
                            PasswordEncoder passwordEncoder) {
    this.accountsService = accountsService;
    this.authenticationManager = authenticationManager;
    this.passwordEncoder = passwordEncoder;
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
    List<Accounts> filteredAccounts = accounts.stream()
        .filter(account -> !account.isDeleted())
        .toList();
    logger.debug("Filtered out deleted accounts, remaining: {}", filteredAccounts.size());

    return ResponseEntity.status(HttpStatus.OK).body(filteredAccounts);
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

    if (account.isDeleted()) {
      logger.warn("Account with id {} is deleted", id);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    logger.debug("Fetched account: {}", account);
    return ResponseEntity.status(HttpStatus.OK).body(account);
  }

  /**
   * Returns an account by its email.
   *
   * @param email the email of the account to find
   * @return the found account
   */
  @GetMapping("/email/{email}")
  @ApiOperation(value = "Returns an account by its email.", 
      notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Accounts> getAccountByEmail(@PathVariable String email) {
    logger.info("Fetching account with email: {}", email);
    Accounts account = accountsService.findByEmail(email);
    logger.debug("Fetched account: {}", account);
    return ResponseEntity.status(HttpStatus.OK).body(account);
  }

    /**
 * Changes an account's password.
 *
 * @param passwordChangeRequest Request containing old and new passwords
 * @return Status indicating success or failure
 */
@PutMapping("/change-password")
@ApiOperation(value = "Changes an account's password", notes = "Requires the old password for verification")
public ResponseEntity<?> changePassword(
        @Valid @RequestBody PasswordChangeRequest passwordChangeRequest,
        Authentication authentication) {
    Long id = passwordChangeRequest.getId();
    try {
        // Find the account
        Accounts account = accountsService.findById(id);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Check permissions (user can only change their own password or admin can change any)
        String email = authentication.getName();
        boolean isNormalAccountOrAdmin = account.getEmail().equals(email) || 
                               authentication.getAuthorities().stream()
                                   .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        if (!isNormalAccountOrAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        // Verify old password
        if (!passwordEncoder.matches(passwordChangeRequest.getOldPassword(), account.getPassword())) {
            logger.warn("Invalid old password provided for account ID: {}", id);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        account.setPassword(passwordChangeRequest.getNewPassword());
        
        accountsService.save(account);
        logger.info("Password changed successfully for account ID: {}", id);
        logger.info("password is: {}", passwordChangeRequest.getNewPassword());
        
        return ResponseEntity.ok().build();
    } catch (Exception e) {
        logger.error("Error changing password: {}", e.getMessage());
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
  @ApiOperation(value = "Deletes an account by its ID.",
      notes = "If the account is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAccount(@Valid @RequestBody DeleteAccountRequest request,
                                            Authentication authentication) {
    String email = authentication.getName();
    String role = authentication.getAuthorities().iterator().next().getAuthority();

    logger.info("Deleting account with identifier: {}", email);
    logger.debug("Account role: {}", role);

    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(email, request.getPassword()));
    } catch (BadCredentialsException e) {
      logger.warn("Password verification failed for account: {}", email);
      return ResponseEntity.status(401).build();
    }
    logger.debug("Password verified for account: {}", email);
    
    Accounts account = accountsService.findByEmail(email);

    if (account == null) {
      logger.warn("Account with identifier: {} not found", email);
      return ResponseEntity.status(404).build();
    }

    logger.debug("Account found: {}", account);

    account.setDeleted(true);
    accountsService.save(account);

    logger.info("Account with identifier: {} deleted successfully", email);
    return ResponseEntity.noContent().build();    
  }
}