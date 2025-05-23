package no.ntnu.security;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.ntnu.entity.CustomUserDetails;

/**
 * JwtFilter is a Spring Security filter that checks for a JWT token in the request header,
 * validates it, and sets the authentication in the security context if valid.
 * Applied to every HTTP request.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {
  private static final Logger logger = 
      LoggerFactory.getLogger(JwtFilter.class.getSimpleName());

  @Autowired
  private JwtUtility jwtUtility; 

  @Autowired
  private UserDetailsService userDetailsService;
  
  /**
   * This method is called for every HTTP request.
   * It checks for the presence of a JWT token in the request header,
   * validates it, and sets the authentication in the security context if valid.
   *
   * @param request The HTTP request
   * @param response The HTTP response
   * @param filterChain The filter chain
   */
  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request, 
      @NonNull HttpServletResponse response, 
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    logger.info("Starting JWT filter for request: {}", request.getRequestURI());
    
    String jwtToken = getJwtToken(request);
    
    if (jwtToken == null) {
      logger.warn("No JWT token found in request: {}", request.getRequestURI());
      filterChain.doFilter(request, response);
      return;
    }

    String username = getUsernameFrom(jwtToken);
    if (username != null && notAuthenticatedYet()) {
      CustomUserDetails userDetails = getUserDetailsFromDatabase(username);
      if (userDetails != null && jwtUtility.validateToken(jwtToken, userDetails)) {
        logger.info("JWT token is valid for user: {}", username);
        registerUserAsAuthenticated(request, userDetails);
      }
    }

    filterChain.doFilter(request, response);
  }

  /**
   * Returns the user details from the database using the username.
   * If the user is not found, it returns null.
   *
   * @param username The username of the user
   * @return The user details object, or null if not found
   */
  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    String path = request.getRequestURI();
    return PublicEndpoints.REGEX_PATHS.stream().anyMatch(path::matches);
  }
  
  /**
   * Returns the user details from the database using the username.
   *
   * @param username The username of the user
   * @return The user details object, or null if not found
   */
  private CustomUserDetails getUserDetailsFromDatabase(String username) {
    try {
      return (CustomUserDetails) userDetailsService.loadUserByUsername(username);
    } catch (UsernameNotFoundException e) {
      logger.warn("User {} not found in the database", username);
      return null;
    }
  }

  /**
   * Returns the JWT token from the HTTP request.
   *
   * @param request The HTTP request
   * @return The JWT token, or null if not found
   */
  private String getJwtToken(HttpServletRequest request) {
    final String authorizationHeader = request.getHeader("Authorization");
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      return stripBearerPrefixFrom(authorizationHeader);
    }
    return null;
  }

  /**
   * Strip the "Bearer " prefix from the Header "Authorization: Bearer ...
   *
   * @param authorizationHeaderValue The value of the Authorization HTTP header
   * @return The JWT token following the "Bearer " prefix
   */
  private static String stripBearerPrefixFrom(String authorizationHeaderValue) {
    final int numberOfCharsToStrip = "Bearer ".length();
    return authorizationHeaderValue.substring(numberOfCharsToStrip);
  }

  /**
   * Returns the username from the JWT token.
   *
   * @param jwtToken The JWT token
   * @return The username, or null if the token is malformed or invalid
   */
  private String getUsernameFrom(String jwtToken) {
    try {
      return jwtUtility.getUsernameFromToken(jwtToken);
    } catch (JwtException e) {
      logger.warn("Invalid JWT: {}", e.getMessage());
      return null;
    }
  }

  /**
   * Check if the user is authenticated yet.
   *
   * @return True if the user is not authenticated yet
   */
  private static boolean notAuthenticatedYet() {
    return SecurityContextHolder.getContext().getAuthentication() == null;
  }

  /**
   * Register the user as authenticated in the Spring Security context.
   *
   * @param request      The HTTP request
   * @param userDetails  The user details object containing user information
   */
  private static void registerUserAsAuthenticated(HttpServletRequest request,
                                                  UserDetails userDetails) {
    final UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(
        userDetails, null, userDetails.getAuthorities());
    userToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(userToken);
  }
}
