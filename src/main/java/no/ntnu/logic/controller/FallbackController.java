package no.ntnu.logic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * Controller that serves as a fallback for all unmatched routes.
 * <p>
 * This controller captures all requests that do not contain a period (i.e., are not file requests)
 * and forwards them to the root path ("/"), allowing the React frontend to handle routing appropriately.
 * </p>
 */
@Controller
@Api(value = "Fallback Controller", tags = {"Routing"})
public class FallbackController {

  /**
   * Handles all unmatched routes by forwarding them to the root path ("/").
   *
   * @return a forward instruction to the root path
   */
  @RequestMapping(value = "/{path:[^\\.]*}")
  @ApiOperation(value = "Fallback Route", notes = "Forwards unmatched routes to the root path '/' to be handled by the frontend.")
  @ApiResponses(value = {
    @ApiResponse(code = 200, message = "Forwarded to /")
  })
  public String redirect() {
    return "forward:/";
  }
}