package no.ntnu.logic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import no.ntnu.entity.exceptions.AccountNotFoundException;
import no.ntnu.entity.exceptions.AdminNotFoundException;
import no.ntnu.entity.exceptions.CarNotFoundException;
import no.ntnu.entity.exceptions.ExtraFeatureNotFoundException;
import no.ntnu.entity.exceptions.ProviderNotFoundException;
import no.ntnu.entity.exceptions.UserNotFoundException;

/**
 * Global exception handler for handling various exceptions in the application.
 * This class uses Spring's @ControllerAdvice to handle exceptions globally.
 * It provides methods to handle specific exceptions and return appropriate HTTP responses.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger logger = 
      LoggerFactory.getLogger(GlobalExceptionHandler.class.getSimpleName());

  /**
   * Handles validation exceptions thrown by the application.
   * Returns a 400 Bad Request response with the validation error message.
   *
   * @param ex the MethodArgumentNotValidException thrown by the application
   * @return ResponseEntity with status 400 and error message
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
    logger.error("Validation error: ", ex);
    String errorMessage = ex.getBindingResult().getFieldErrors().stream()
        .map(error -> error.getField() + ": " + error.getDefaultMessage())
        .reduce((msg1, msg2) -> msg1 + ", " + msg2)
        .orElse("Validation error occurred");
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
  }

  /**
   * Handles AccountNotFoundException thrown by the application.
   * Returns a 404 Not Found response with the error message.
   *
   * @param ex the AccountNotFoundException thrown by the application
   * @return ResponseEntity with status 404 and error message
   */
  @ExceptionHandler(AccountNotFoundException.class)
  public ResponseEntity<String> handleAccountNotFoundException(AccountNotFoundException ex) {
    logger.error("Account not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  /**
   * Handles UserNotFoundException thrown by the application.
   * Returns a 404 Not Found response with the error message.
   *
   * @param ex the UserNotFoundException thrown by the application
   * @return ResponseEntity with status 404 and error message
   */
  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
    logger.error("User not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  /**
   * Handles AdminNotFoundException thrown by the application.
   * Returns a 404 Not Found response with the error message.
   *
   * @param ex the AdminNotFoundException thrown by the application
   * @return ResponseEntity with status 404 and error message
   */
  @ExceptionHandler(AdminNotFoundException.class)
  public ResponseEntity<String> handleAdminNotFoundException(AdminNotFoundException ex) {
    logger.error("User not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  /**
   * Handles DataAccessException thrown by the application.
   * Returns a 500 Internal Server Error response with a generic error message.
   *
   * @param ex the DataAccessException thrown by the application
   * @return ResponseEntity with status 500 and error message
   */
  @ExceptionHandler(DataAccessException.class)
  public ResponseEntity<String> handleDataAccessException(DataAccessException ex) {
    logger.error("Data access exception: ", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    .body("Data access error occurred");
  }

  /**
   * Handles DataIntegrityViolationException thrown by the application.
   * Returns a 409 Conflict response with a generic error message.
   *
   * @param ex the DataIntegrityViolationException thrown by the application
   * @return ResponseEntity with status 409 and error message
   */
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<String> handleDataIntegrityViolationException(
      DataIntegrityViolationException ex) {
    logger.error("Data integrity violation exception: ", ex);
    return ResponseEntity.status(HttpStatus.CONFLICT).body("Data integrity violation occurred");
  }

  /**
   * Handles CarNotFoundException thrown by the application.
   * Returns a 404 Not Found response with the error message.
   *
   * @param ex the CarNotFoundException thrown by the application
   * @return ResponseEntity with status 404 and error message
   */
  @ExceptionHandler(CarNotFoundException.class)
  public ResponseEntity<String> handleCarNotFoundException(CarNotFoundException ex) {
    logger.error("Car not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  /**
   * Handles ExtraFeatureNotFoundException thrown by the application.
   * Returns a 404 Not Found response with the error message.
   *
   * @param ex the ExtraFeatureNotFoundException thrown by the application
   * @return ResponseEntity with status 404 and error message
   */
  @ExceptionHandler(ExtraFeatureNotFoundException.class)
  public ResponseEntity<String> handleExtraFeatureNotFoundException(
      ExtraFeatureNotFoundException ex) {
    logger.error("Extra feature not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  /**
   * Handles ProviderNotFoundException thrown by the application.
   * Returns a 404 Not Found response with the error message.
   *
   * @param ex the ProviderNotFoundException thrown by the application
   * @return ResponseEntity with status 404 and error message
   */
  @ExceptionHandler(ProviderNotFoundException.class)
  public ResponseEntity<String> handleProviderNotFoundException(ProviderNotFoundException ex) {
    logger.error("Provider not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  /**
   * Handles BadCredentialsException thrown during authentication.
   * Returns a 401 Unauthorized response with a user-friendly message.
   *
   * @param ex the BadCredentialsException thrown by the application
   * @return ResponseEntity with status 401 and error message
   */
  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException ex) {
    logger.error("Authentication failed: ", ex);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
  }

    /**
     * Handles generic exceptions thrown by the application.
     * Returns a 500 Internal Server Error response with a generic error message.
     *
     * @param ex the Exception thrown by the application
     * @return ResponseEntity with status 500 and error message
     */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleGenericException(Exception ex) {
    logger.error("Unexpected exception occurred: ", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body("An unexpected error occurred");
  }
}