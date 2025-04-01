package no.ntnu.entity.exceptions;

/**
 * Exception thrown when a provider is not found.
 */
public class ProviderNotFoundException extends RuntimeException {
  public ProviderNotFoundException(String message) {
    super(message);
  }
}