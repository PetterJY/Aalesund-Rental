package no.ntnu.logic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * Controller responsible for handling requests to frontend routes of the single-page application (SPA).
 * <p>
 * This controller forwards incoming requests for frontend routes (e.g., "/", "/home", "/rental") to
 * the React application's index.html, enabling client-side routing with React Router. It ensures that
 * all non-API and non-static resource paths are served by the frontend.
 * </p>
 */
@Controller
@Api(value = "Root Controller", tags = {"Routing"})
public class RootController {

    /**
     * Handles HTTP GET requests for frontend routes, forwarding them to the React application's
     * index.html for client-side routing.
     * <p>
     * This method captures paths such as "/", "/home", "/rental", "/booking/*", "/account/*",
     * "/submitted-booking", "/about-us", and any other non-file paths, ensuring the React SPA
     * handles the routing logic.
     * </p>
     *
     * @return a forward instruction to "/index.html"
     */
    @GetMapping(value = {"/", "/home", "/rental", "/booking", "/booking/{carId}", 
        "/submitted-booking", "/account", "/account/{subPath:.*}", "/about-us", "/{path:[^\\.]*}"})
    @ApiOperation(
        value = "Serve SPA Routes", 
        notes = "Forwards frontend routes to index.html for React SPA routing.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successfully served index.html"),
        @ApiResponse(code = 404, message = "Resource not found if index.html is missing")
    })
    public String serveSpa() {
        return "forward:/index.html";
    }
}