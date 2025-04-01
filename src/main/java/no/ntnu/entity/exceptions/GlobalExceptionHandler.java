package no.ntnu.entity.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
    logger.error("User not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }

  @ExceptionHandler(DataAccessException.class)
  public ResponseEntity<String> handleDataAccessException(DataAccessException ex) {
    logger.error("Data access exception: ", ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data access error occurred");
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
    logger.error("Data integrity violation exception: ", ex);
    return ResponseEntity.status(HttpStatus.CONFLICT).body("Data integrity violation occurred");
  }

  @ExceptionHandler(AccountNotFoundException.class)
  public ResponseEntity<String> handleAccountNotFoundException(AccountNotFoundException ex) {
    logger.error("Account not found exception: ", ex);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
  }
}