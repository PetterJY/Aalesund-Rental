package no.ntnu.logic.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.AccountNotFoundException;
import no.ntnu.entity.exceptions.RoleNotFoundException;
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

  private final AdminService adminsService;
  private final UsersService usersService;
  private final ProvidersService providersService;

  /**
   * Constructor for AccountsService.
   *
   * @param accountsRepository the repository for accounts
   */
  @Autowired
  public AccountsService(AccountsRepository accountsRepository, 
                         AdminService adminsService,
                         UsersService usersService,
                         ProvidersService providersService) {
    logger.info("AccountsService initialized");
    this.accountsRepository = accountsRepository;
    this.adminsService = adminsService;
    this.usersService = usersService;
    this.providersService = providersService;
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
        .collect(Collectors.toList());
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

  @Override
  public UserDetails loadUserByUsername(String email) throws AccountNotFoundException {
    try {
      Accounts account = findByEmail(email);
      return User.builder()
        .username(account.getEmail())
        .password(account.getPassword())
        .roles(account.getRole())
        .build();
    } catch (AccountNotFoundException e) {
      throw new UsernameNotFoundException("Account not found with email: " + email);
    }
  }


  public Accounts findByEmail(String email) {
    logger.info("Fetching account with email: {}", email);
    return accountsRepository.findByEmail(email)
      .orElseThrow(() -> new AccountNotFoundException("Account not found with email: " + email));
  }

  /**
   * Deletes an account by its ID.
   *
   * @param id the ID of the account to delete
   * @throws AccountNotFoundException if the account is not found
   */
  public void deleteById(Long id) throws AccountNotFoundException {
    Accounts account = findById(id);
    logger.info("Deleting user with id: {}", id);
    switch (account.getRole()) {
      case "ADMIN":
        logger.info("Deleting admin account with id: {}", id);
        adminsService.deleteById(id);
        break;
      case "USER":
        logger.info("Deleting user account with id: {}", id);
        usersService.deleteById(id);
        break;
      case "PROVIDER":
        logger.info("Deleting provider account with id: {}", id);
        providersService.deleteById(id);
        break;
      default:
        logger.error("Account with id: {} has an unknown role: {}", id, account.getRole());
        throw new RoleNotFoundException(
          "Account with id: " + id + " has an unknown role: " + account.getRole());
    }
  }
}