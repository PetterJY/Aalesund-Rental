package no.ntnu.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security configuration class for the application.
 * Configures security settings for HTTP requests and JWT authentication.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
  private static final Logger logger = 
      LoggerFactory.getLogger(SecurityConfig.class.getSimpleName());

  @Autowired
  private JwtFilter jwtFilter;

  /**
   * Configures the security filter chain for the application.
   * Sets up CSRF protection (disables it), request authorization, and JWT filter.
   *
   * @param http the HttpSecurity object to configure
   * @return the configured DefaultSecurityFilterChain
   * @throws Exception if an error occurs during configuration
   */
  @Bean
  public DefaultSecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    logger.info("Configuring security filter chain.");
    http.csrf(csrfCustomizer -> csrfCustomizer.disable())
        .authorizeHttpRequests(authorize -> authorize
        .requestMatchers(PublicEndpoints.PATHS.toArray(new String[0])).permitAll()
        .anyRequest().authenticated())
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    logger.info("Security filter chain configured successfully.");
    return http.build();
  }

  /**
   * Configures the authentication manager for the application.
   * This is used for authenticating users with their credentials.
   *
   * @param authConfig the AuthenticationConfiguration object
   * @return the configured AuthenticationManager
   * @throws Exception if an error occurs during configuration
   */
  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }
}