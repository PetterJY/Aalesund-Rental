package no.ntnu.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

  private final JwtFilter jwtFilter;

  public SecurityConfig(JwtFilter jwtFilter) {
    this.jwtFilter = jwtFilter;
  }

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
    http.csrf(csrfCustomizer -> csrfCustomizer.disable())
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/auth/login", "/users/**").permitAll()
            .anyRequest().authenticated())
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}