package no.ntnu.logic;

import no.ntnu.entity.exceptions.AccountNotFoundException;
import no.ntnu.entity.exceptions.AdminNotFoundException;
import no.ntnu.entity.exceptions.CarNotFoundException;
import no.ntnu.entity.exceptions.ExtraFeatureNotFoundException;
import no.ntnu.entity.exceptions.ProviderNotFoundException;
import no.ntnu.entity.exceptions.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Global exception handler for handling various exceptions in the application.
 * This class uses Spring's @ControllerAdvice to handle exceptions globally.
 * It provides methods to handle specific exceptions and return appropriate HTTP responses.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

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

  @ExceptionHandler(AccountNotFoundException.class)
  public ResponseEntity<String> handleAccountNotFoundException(AccountNotFoundException ex) {
    logger.error("Account not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
    logger.error("User not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

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

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<String> handleDataIntegrityViolationException(
      DataIntegrityViolationException ex) {
    logger.error("Data integrity violation exception: ", ex);
    return ResponseEntity.status(HttpStatus.CONFLICT).body("Data integrity violation occurred");
  }

  @ExceptionHandler(CarNotFoundException.class)
  public ResponseEntity<String> handleCarNotFoundException(CarNotFoundException ex) {
    logger.error("Car not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  @ExceptionHandler(ExtraFeatureNotFoundException.class)
  public ResponseEntity<String> handleExtraFeatureNotFoundException(
      ExtraFeatureNotFoundException ex) {
    logger.error("Extra feature not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }


  @ExceptionHandler(ProviderNotFoundException.class)
  public ResponseEntity<String> handleProviderNotFoundException(ProviderNotFoundException ex) {
    logger.error("Provider not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }
}