package no.ntnu.logic.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.ProviderNotFoundException;
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
    return StreamSupport.stream(providersRepository.findAll().spliterator(), false)
        .filter(provider -> !provider.isDeleted())
        .collect(Collectors.toList());
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
    logger.info("Saving provider with email: {}", provider.getEmail());
    String password = provider.getPassword();
    provider.setPassword(passwordEncoder.encode(password));
    return providersRepository.save(provider);
  }

  /**
   * Saves a provider with the option to not encode the password.
   *
   * @param provider        the provider to save
   * @param encodePassword  whether to encode the password
   * @return the saved provider
   */
  public Providers save(Providers provider, boolean encodePassword) {
    if (encodePassword) {
      logger.debug("Encoding password for provider with email: {}", provider.getEmail());
      return save(provider);
    }
    logger.info("Saving provider with email: {}", provider.getEmail());
    return providersRepository.save(provider);
  }
}