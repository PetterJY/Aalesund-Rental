package no.ntnu.entity.exceptions;

/**
 * Exception thrown when an admin is not found.
 */
public class AdminNotFoundException extends RuntimeException {
  public AdminNotFoundException(String message) {
    super(message);
  }
}