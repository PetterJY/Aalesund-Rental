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
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
  
  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request, 
      @NonNull HttpServletResponse response, 
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    logger.info("Starting JWT filter for request: {}", request.getRequestURI());
    
    String jwtToken = getJwtToken(request);
    if (jwtToken != null) {
      logger.debug("JWT token extracted: {}", jwtToken);
    } else {
      logger.debug("No JWT token found in the request.");
      filterChain.doFilter(request, response);
      return;
    }

    String username = getUsernameFrom(jwtToken);
    if (username != null) {
      logger.info("Extracted username from token: {}", username);
    } else {
      logger.warn("Failed to extract username from token.");
    }

    if (username != null && notAuthenticatedYet()) {
      UserDetails userDetails = getUserDetailsFromDatabase(username);
      if (userDetails != null) {
        logger.debug("User details loaded for username: {}", username);
      } else {
        logger.warn("User details not found for username: {}", username);
      }

      if (jwtUtility.validateToken(jwtToken, userDetails)) {
        logger.info("JWT token validated successfully for username: {}", username);
        registerUserAsAuthenticated(request, userDetails);
      } else {
        logger.warn("JWT token validation failed for username: {}", username);
      }
    }

    filterChain.doFilter(request, response);
    logger.info("Completed JWT filter for request: {}", request.getRequestURI());
  }

  private UserDetails getUserDetailsFromDatabase(String username) {
    logger.debug("Loading user details for username: {}", username);
    UserDetails userDetails = null;
    try {
      userDetails = userDetailsService.loadUserByUsername(username);
    } catch (UsernameNotFoundException e) {
      logger.warn("User " + username + " not found in the database");
    }
    return userDetails;
  }

  /**
   * Returns the JWT token from the HTTP request.
   *
   * @param request The HTTP request
   * @return The JWT token, or null if not found
   */
  private String getJwtToken(HttpServletRequest request) {
    logger.debug("Extracting JWT token from Authorization header.");
    final String authorizationHeader = request.getHeader("Authorization");
    String jwt = null;
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwt = stripBearerPrefixFrom(authorizationHeader);
    }
    return jwt;
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
    logger.debug("Extracting username from JWT token.");
    String username = null;
    try {
      username = jwtUtility.getUsernameFromToken(jwtToken);
    } catch (MalformedJwtException e) {
      logger.warn("Malformed JWT: " + e.getMessage());
    } catch (JwtException e) {
      logger.warn("Error in the JWT token: " + e.getMessage());
    }
    return username;
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
