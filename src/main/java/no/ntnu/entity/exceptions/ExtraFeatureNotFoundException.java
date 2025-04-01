package no.ntnu.entity.exceptions;

/**
 * Exception thrown when an extra feature is not found.
 */
public class ExtraFeatureNotFoundException extends RuntimeException {
  public ExtraFeatureNotFoundException(String message) {
    super(message);
  }
}