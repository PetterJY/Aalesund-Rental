package no.ntnu.entity.exceptions;

/**
 * Exception thrown when a car is not found.
 */
public class CarNotFoundException extends RuntimeException {
  public CarNotFoundException(String message) {
    super(message);
  }
}