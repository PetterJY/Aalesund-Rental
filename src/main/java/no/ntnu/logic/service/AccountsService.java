package no.ntnu.logic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.Accounts;
import no.ntnu.entity.exceptions.AccountNotFoundException;
import no.ntnu.logic.repository.AccountsRepository;

@Service
public class AccountsService {

  @Autowired
  private AccountsRepository accountsRepository;

  public Iterable<Accounts> findAll() {
    return accountsRepository.findAll();
  }

  public Accounts findById(Long id) {
    return accountsRepository.findById(id)
      .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
  }

  public Accounts save(Accounts account) {
    return accountsRepository.save(account);
  }

  public void deleteById(Long id) {
    accountsRepository.deleteById(id);
  }
}