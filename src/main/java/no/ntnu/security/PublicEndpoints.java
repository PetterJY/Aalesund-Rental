package no.ntnu.security;

import java.util.List;

/**
 * This class contains the public endpoints of the application.
 * These endpoints are accessible without authentication.
 */
public class PublicEndpoints {
  public static final List<String> PATHS = List.of(
    "/api/auth/login",
    "/api/auth/refresh-token",
    "/api/users/register",
    "/api/providers/register",
    "/api/admins/register",
    "/api/cars/search",
    "/api/cars/locations",
    "/api/cars",
    "/api/cars/{id}" 
  );

  // For JwtFilter, regex patterns for path matching
  public static final List<String> REGEX_PATHS = List.of(
    "^/api/auth/login$",
    "^/api/auth/refresh-token$",
    "^/api/users/register$",
    "^/api/providers/register$",
    "^/api/admins/register$",
    "^/api/cars/search$",
    "^/api/cars/locations$",
    "^/api/cars$",
    "^/api/cars/\\d+$" // Regex for /cars/{id}
  );
}