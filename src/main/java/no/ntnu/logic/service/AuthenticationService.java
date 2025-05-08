package no.ntnu.logic.service;

import java.util.logging.Logger;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
  private static final Logger logger = Logger.getLogger(AuthenticationService.class.getSimpleName());
  
  private final UserDetailsService userDetailsService;
  
  private final AccountsService accountsService;

  private final PasswordEncoder passwordEncoder;

  public AuthenticationService(UserDetailsService userDetailsService,
                               AccountsService accountsService,
                               PasswordEncoder passwordEncoder) {
    this.userDetailsService = userDetailsService;
    this.accountsService = accountsService;
    this.passwordEncoder = passwordEncoder;
    Logger.getLogger(AuthenticationService.class.getName());
  }

  public boolean verifyPassword(String email, String rawPassword) {
    logger.info("Verifying password for user: " + email);
    try {
      UserDetails userDetails = accountsService.loadUserByUsername(email);
      return passwordEncoder.matches(rawPassword, userDetails.getPassword());
    } catch (Exception e) {
      logger.warning("Error verifying password: " + e.getMessage());
      return false;
    }
  }
}