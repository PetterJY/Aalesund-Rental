package no.ntnu.logic.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.ProviderNotFoundException;
import no.ntnu.entity.models.Providers;
import no.ntnu.logic.repository.ProvidersRepository;

@Service
public class ProvidersService {

  private static final Logger logger = LoggerFactory.getLogger(ProvidersService.class);
  private final ProvidersRepository providersRepository;

  @Autowired
  public ProvidersService(ProvidersRepository providersRepository) {
    logger.info("ProvidersService initialized");
    this.providersRepository = providersRepository;
  }

  public List<Providers> findAll() {
    logger.info("Fetching all providers");
    return (List<Providers>) providersRepository.findAll();
  }

  public Providers findById(Long id) throws ProviderNotFoundException {
    logger.info("Fetching provider with id: {}", id);
    return providersRepository.findById(id)
      .orElseThrow(() -> new ProviderNotFoundException("Provider not found with id: " + id));
  }

  public Providers save(Providers provider) {
    logger.info("Saving provider with id: {}", provider.getId());
    return providersRepository.save(provider);
  }

  public void deleteById(Long id) throws ProviderNotFoundException {
    logger.info("Deleting provider with id: {}", id);
    if (!providersRepository.existsById(id)) {
      throw new ProviderNotFoundException("Provider not found with id: " + id);
    }
    providersRepository.deleteById(id);
  }
}