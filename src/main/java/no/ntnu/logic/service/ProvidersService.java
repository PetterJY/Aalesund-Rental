package no.ntnu.logic.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import no.ntnu.entity.exceptions.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.ProviderNotFoundException;
import no.ntnu.entity.models.Providers;
import no.ntnu.entity.models.Users;
import no.ntnu.logic.repository.ProvidersRepository;

/**
 * Service class for managing providers.
 */
@Service
public class ProvidersService {
  private static final Logger logger = 
      LoggerFactory.getLogger(ProvidersService.class.getSimpleName());

  private final ProvidersRepository providersRepository;

  private final BCryptPasswordEncoder passwordEncoder;

  /**
   * Constructor for ProvidersService.
   *
   * @param providersRepository the repository for providers
   */
  @Autowired
  public ProvidersService(ProvidersRepository providersRepository, BCryptPasswordEncoder passwordEncoder) {
    logger.info("ProvidersService initialized");
    this.providersRepository = providersRepository;
    this.passwordEncoder = passwordEncoder;
  }

  /**
   * Fetches all providers.
   *
   * @return a list of all providers
   */
  public List<Providers> findAll() {
    logger.info("Fetching all providers");
    List<Providers> providers = StreamSupport.stream(
        providersRepository.findAll().spliterator(), false)
        .filter(user -> user.getAccount().getRole().equals("PROVIDER"))
        .collect(Collectors.toList());
    return providers;
  }

  /**
   * Fetches a provider by its ID.
   *
   * @param id the ID of the provider
   * @return the provider with the given ID
   * @throws ProviderNotFoundException if the provider is not found
   */
  public Providers findById(Long id) throws ProviderNotFoundException {
    logger.info("Fetching provider with id: {}", id);
    return providersRepository.findById(id)
      .orElseThrow(() -> new ProviderNotFoundException("Provider not found with id: " + id));
  }

  /**
   * Returns a provider based on their email.
   *
   * @param email the email of the provider to find
   * @return the found provider
   * @throws ProviderNotFoundException if no provider is found with the given email
   */
  public Providers findByEmail(String email) throws ProviderNotFoundException {
    logger.info("Fetching provider with email: {}", email);
    return providersRepository.findByEmail(email)
      .orElseThrow(() -> new UserNotFoundException("Provider not found with email: " + email));
  }

  /**
   * Saves a provider.
   *
   * @param provider the provider to save
   * @return the saved provider
   */
  public Providers save(Providers provider) {
    logger.info("Saving provider with id: {}", provider.getId());
    provider.getAccount().setPassword(passwordEncoder.encode(provider.getAccount().getPassword()));
    return providersRepository.save(provider);
  }

  /**
   * Deletes a provider by its ID.
   *
   * @param id the ID of the provider to delete
   * @throws ProviderNotFoundException if the provider is not found
   */
  public void deleteById(Long id) throws ProviderNotFoundException {
    logger.info("Deleting provider with id: {}", id);
    if (!providersRepository.existsById(id)) {
      throw new ProviderNotFoundException("Provider not found with id: " + id);
    }
    providersRepository.deleteById(id);
  }
}