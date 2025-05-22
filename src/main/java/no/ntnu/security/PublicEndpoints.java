package no.ntnu.security;

import java.util.List;

/**
 * This class contains the public endpoints of the application.
 * These endpoints are accessible without authentication.
 */
public class PublicEndpoints {
  public static final List<String> PATHS = List.of(
    "/auth/login",
    "/auth/refresh-token",
    "/users/register",
    "/providers/register",
    "/admins/register",
    "/cars/search",
    "/cars/locations",
    "/cars",
    "/cars/{id}" 
  );

  // For JwtFilter, regex patterns for path matching
  public static final List<String> REGEX_PATHS = List.of(
    "^/auth/login$",
    "^/auth/refresh-token$",
    "^/users/register$",
    "^/providers/register$",
    "^/admins/register$",
    "^/cars/search$",
    "^/cars/locations$",
    "^/cars$",
    "^/cars/\\d+$" // Regex for /cars/{id}
  );
}