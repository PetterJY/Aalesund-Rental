package no.ntnu.logic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * Controller responsible for handling requests to the root path ("/").
 * <p>
 * This controller redirects incoming requests from the root URL to the "/home" path,
 * ensuring that users accessing the base URL are directed to the homepage.
 * </p>
 */
@Controller
@Api(value = "Root Controller", tags = {"Routing"})
public class RootController {

  /**
   * Handles HTTP GET requests to the root path ("/") and redirects them to "/home".
   *
   * @return a redirect instruction to the "/home" path
   */
  @GetMapping("/")
  @ApiOperation(value = "Redirect to Home", notes = "Redirects requests from the root path '/' to the '/home' endpoint.")
  @ApiResponses(value = {
    @ApiResponse(code = 302, message = "Redirect to /home")
  })
  public String redirectToHome() {
    return "redirect:/home";
  }
}