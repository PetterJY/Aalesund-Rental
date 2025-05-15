package no.ntnu.logic.service;

import java.util.List;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.ProviderNotFoundException;
import no.ntnu.entity.models.Accounts;
import no.ntnu.entity.models.Providers;
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
    return StreamSupport.stream(
        providersRepository.findAll().spliterator(), false)
        .filter(provider -> !provider.isDeleted())
        .toList();
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
      .filter(provider -> !provider.isDeleted())  
      .orElseThrow(() -> new ProviderNotFoundException("Provider not found with id: " + id));
  }

  /**
   * Saves a provider.
   *
   * @param provider the provider to save
   * @return the saved provider
   */
  public Providers save(Providers provider) {
    if (provider.isDeleted()) {
      logger.warn("Attempted to save a deleted provider");
      throw new IllegalArgumentException("Cannot save a deleted provider");
    }
    logger.info("Saving provider with email: {}", provider.getEmail());
    provider.setPassword(passwordEncoder.encode(provider.getPassword()));
    return providersRepository.save(provider);
  }
}