package no.ntnu.security;

import java.util.List;

/**
 * "/",
              "/index.html",
              "/static/**",

              "/home",
              "/rental",
              "/booking",
              "/submitted-booking",
              "/about-us",
              "/account",
              "/account/account",
              "/account/orders",
              "/account/my-rentals",
              "/account/favourites",
              "/account/admin-rentals",

              "/api/auth/login",
              "/api/auth/refresh-token",
              "/api/users/register",
              "/api/providers/register",
              "/api/admins/register",
              "/api/cars/search",
              "/api/cars/locations",
              "/api/cars/{id}",
              "/api/cars"
 */

/**
 * This class contains the public endpoints of the application.
 * These endpoints are accessible without authentication.
 */
public class PublicEndpoints {
  public static final List<String> PATHS = List.of(
    "/",
    "/index.html",
    "/static/**",

    "/home",
    "/rental",
    "/booking",
    "/submitted-booking",
    "/about-us",
    "/account",
    "/account/account",
    "/account/orders",
    "/account/my-rentals",
    "/account/favourites",
    "/account/admin-rentals",

    // API endpoints
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
    "^/$",
    "^/index\\.html$",
    "^/static/.*$",
    
    "^/home$",
    "^/rental$",
    "^/booking$",
    "^/submitted-booking$",
    "^/about-us$",
    "^/account$",
    "^/account/account$",
    "^/account/orders$",
    "^/account/my-rentals$",
    "^/account/favourites$",
    "^/account/admin-rentals$",

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