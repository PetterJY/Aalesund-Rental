package no.ntnu.logic.service;

import java.util.logging.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
  private final UserDetailsService userDetailsService;
  private final PasswordEncoder passwordEncoder;
  private Logger logger;

  public AuthenticationService(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
    this.userDetailsService = userDetailsService;
    this.passwordEncoder = passwordEncoder;
    Logger.getLogger(AuthenticationService.class.getName());
  }

  public boolean verifyPassword(String email, String rawPassword) {
    try {
      UserDetails userDetails = AccountsService.(email);
      return passwordEncoder.matches(rawPassword, userDetails.getPassword());
    } catch (Exception e) {
      return false;
    }
  }
}