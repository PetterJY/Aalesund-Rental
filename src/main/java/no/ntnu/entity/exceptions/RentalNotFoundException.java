package no.ntnu.entity.exceptions;

/**
 * Exception thrown when a rental is not found.
 */
public class RentalNotFoundException extends RuntimeException {
  public RentalNotFoundException(String message) {
    super(message);
  }
}