package no.ntnu.logic.service;

import java.util.List;
import no.ntnu.entity.exceptions.AccountNotFoundException;
import no.ntnu.entity.models.Accounts;
import no.ntnu.logic.repository.AccountsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing accounts.
 */
@Service
public class AccountsService {

  private static final Logger logger = LoggerFactory.getLogger(AccountsService.class);
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
    return (List<Accounts>) accountsRepository.findAll();
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
      .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
  }

  /**
   * Saves an account.
   *
   * @param account the account to save
   * @return the saved account
   */
  public Accounts save(Accounts account) {
    logger.info("Saving account with id: {}", account.getId());
    return accountsRepository.save(account);
  }

  /**
   * Deletes an account by its ID.
   *
   * @param id the ID of the account to delete
   * @throws AccountNotFoundException if the account is not found
   */
  public void deleteById(Long id) throws AccountNotFoundException {
    logger.info("Deleting user with id: {}", id);
    if (!accountsRepository.existsById(id)) {
      throw new AccountNotFoundException("Account not found with id: " + id);
    }
    accountsRepository.deleteById(id);
  }
}