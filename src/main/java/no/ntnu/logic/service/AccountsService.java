package no.ntnu.logic.service;

import java.util.List;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import no.ntnu.entity.CustomUserDetails;
import no.ntnu.entity.exceptions.AccountNotFoundException;
import no.ntnu.entity.models.Accounts;
import no.ntnu.logic.repository.AccountsRepository;

/**
 * Service class for managing accounts.
 */
@Service
public class AccountsService implements UserDetailsService {
  private static final Logger logger = 
      LoggerFactory.getLogger(AccountsService.class.getSimpleName());

  private final AccountsRepository accountsRepository;

  /**
   * Constructor for AccountsService.
   *
   * @param accountsRepository the repository for accounts
   */
  @Autowired
  public AccountsService(AccountsRepository accountsRepository) {
    logger.info("AccountsService initialized");
    this.accountsRepository = accountsRepository;
  }

  /**
   * Fetches all accounts.
   *
   * @return a list of all accounts
   */
  public List<Accounts> findAll() {
    logger.info("Fetching all accounts");
    return StreamSupport.stream(
        accountsRepository.findAll().spliterator(), false)
        .filter(account -> !account.isDeleted())
        .toList();
  }

  /**
   * Fetches an account by its ID.
   *
   * @param id the ID of the account
   * @return the account with the given ID
   * @throws AccountNotFoundException if the account is not found
   */
  public Accounts findById(Long id) throws AccountNotFoundException {
    logger.info("Fetching account with id: {}", id);
    return accountsRepository.findById(id)
      .filter(account -> !account.isDeleted())
      .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
  }

  /**
   * Saves an account.
   *
   * @param account the account to save
   * @return the saved account
   */
  public Accounts save(Accounts account) {
    if (account.isDeleted()) {
      logger.warn("Attempted to save a deleted account with id: {}", account.getId());
      throw new IllegalArgumentException("Cannot save a deleted account");
    }
    logger.info("Saving account with id: {}", account.getId());
    return accountsRepository.save(account);
  }

  @Override
  public CustomUserDetails loadUserByUsername(String email) throws AccountNotFoundException {
    try {
      Accounts account = findByEmail(email);
      if (account.isDeleted()) {
        logger.warn("Attempted to load a deleted account with email: {}", email);
        throw new AccountNotFoundException("Account is deleted with email: " + email);
      }
      return new CustomUserDetails(account);
    } catch (AccountNotFoundException e) {
      throw new UsernameNotFoundException("Account not found with email: " + email);
    }
  }

  /**
   * Fetches an account by its email.
   *
   * @param email the email of the account
   * @return the account with the given email
   * @throws AccountNotFoundException if the account is not found
   */
  public Accounts findByEmail(String email) {
    logger.info("Fetching account with email: {}", email);
    return accountsRepository.findByEmail(email)
      .filter(account -> !account.isDeleted())
      .orElseThrow(() -> new AccountNotFoundException("Account not found with email: " + email));
  } 
}