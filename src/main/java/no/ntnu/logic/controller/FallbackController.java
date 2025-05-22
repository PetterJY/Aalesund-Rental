package no.ntnu.logic.controller;

  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;

  import io.swagger.v3.oas.annotations.Operation;
  import io.swagger.v3.oas.annotations.responses.ApiResponse;
  import io.swagger.v3.oas.annotations.responses.ApiResponses;
  import io.swagger.v3.oas.annotations.tags.Tag;

  /**
   * Controller that serves as a fallback for all unmatched routes.
   * <p>
   * This controller captures all requests that do not contain a period (i.e., are not file requests)
   * and forwards them to the root path ("/"), allowing the React frontend to handle routing appropriately.
   * </p>
   */
  @RestController
  @Tag(name = "Fallback Controller", description = "Handles routing for SPA frontend")
  public class FallbackController {

    /**
     * Handles all unmatched routes by forwarding them to the root path ("/").
     *
     * @return a forward instruction to the root path
     */
    @RequestMapping(value = "/{path:[^\\.]*}")
    @Operation(
        summary = "Fallback route handler",
        description = "Forwards unmatched routes to the root path '/' to be handled by the frontend"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Forwarded to /")
    })
    public String redirect() {
      return "forward:/";
    }
  }