package no.ntnu.logic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * Controller responsible for handling requests to the root path ("/").
 * <p>
 * This controller redirects incoming requests from the root URL to the "/home" path,
 * ensuring that users accessing the base URL are directed to the homepage.
 * </p>
 */
@Controller
@Tag(name = "Routing", description = "Basic navigation endpoints")
public class RootController {

  /**
   * Handles HTTP GET requests to the root path ("/") and redirects them to "/home".
   *
   * @return a redirect instruction to the "/home" path
   */
  @GetMapping("/")
  @Operation(
      summary = "Redirect to Home",
      description = "Redirects requests from the root path '/' to the '/home' endpoint.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "302", description = "Redirect to /home")
  })
  public String redirectToHome() {
    return "redirect:/home";
  }
}