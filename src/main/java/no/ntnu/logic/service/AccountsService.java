package no.ntnu.logic.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.AccountNotFoundException;
import no.ntnu.entity.models.Accounts;
import no.ntnu.logic.repository.AccountsRepository;

@Service
public class AccountsService {

  private static final Logger logger = LoggerFactory.getLogger(AccountsService.class);
  private final AccountsRepository accountsRepository;

  @Autowired
  public AccountsService(AccountsRepository accountsRepository) {
    logger.info("AccountsService initialized");
    this.accountsRepository = accountsRepository;
  }

  public List<Accounts> findAll() {
    logger.info("Fetching all accounts");
    return (List<Accounts>) accountsRepository.findAll();
  }

  public Accounts findById(Long id) throws AccountNotFoundException {
    logger.info("Fetching account with id: {}", id);
    return accountsRepository.findById(id)
      .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
  }

  public Accounts save(Accounts account) {
    logger.info("Saving account with id: {}", account.getId());
    return accountsRepository.save(account);
  }

  public void deleteById(Long id) throws AccountNotFoundException {
    logger.info("Deleting user with id: {}", id);
    if (!accountsRepository.existsById(id)) {
      throw new AccountNotFoundException("Account not found with id: " + id);
    }
    accountsRepository.deleteById(id);
  }
}