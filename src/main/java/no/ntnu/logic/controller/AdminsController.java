package no.ntnu.logic.controller;

import java.util.List;

import no.ntnu.logic.service.AccountsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import no.ntnu.entity.dto.AdminDetails;
import no.ntnu.entity.models.Admins;
import no.ntnu.logic.service.AdminService;

import java.util.Map;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;


/**
 * Controller for managing admin-related operations.
 */
@RestController
@Tag(name = "Admins API", description = "API for managing admin resources")
@RequestMapping("api/admins")
public class AdminsController {

  private final AdminService adminService;
  private final AccountsService accountsService;
  private static final Logger logger =
      LoggerFactory.getLogger(AdminsController.class.getSimpleName());

  @Autowired
  public AdminsController(AdminService adminService, AccountsService accountsService) {
    this.adminService = adminService;
    this.accountsService = accountsService;
  }

  /**
   * Returns all admins.
   *
   * @return List of all admins.
   */
  @GetMapping
  @Operation(
      description = "Returns all admins.",
      summary = "Fetch all admins. If no admins are found, an empty list is returned.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Admins found"),
      @ApiResponse(responseCode = "404", description = "No admins found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<List<Admins>> getAllAdmins() {
    try {
      logger.info("Fetching all admins");
      List<Admins> admins = adminService.findAll();
      logger.debug("Fetched {} admins", admins.size());

      if (admins.isEmpty()) {
        logger.warn("No admins found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(admins);
      }

      return ResponseEntity.status(HttpStatus.OK).body(admins);
    } catch (Exception e) {
      logger.error("Error fetching admins: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Returns an admin by its ID.
   *
   * @param id The ID of the admin.
   * @return The admin with the specified ID.
   */
  @GetMapping("/{id}")
  @Operation(
      description = "Returns an admin by its ID.",
      summary = "If the admin is not found, or it is deleted, a 404 error is returned, otherwise the admin is returned with status 200.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Admin found"),
      @ApiResponse(responseCode = "404", description = "Admin not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Admins> getAdminById(
      @Parameter(
          description = "ID of the admin to fetch",
          required = true,
          example = "123"
      )
      @PathVariable Long id) {
    try {
      logger.info("Fetching admin with id: {}", id);
      Admins admin = adminService.findById(id);
      if (admin == null) {
        logger.info("Admin with id {} not found", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }

      if (admin.isDeleted()) {
        logger.info("Admin with id {} is deleted", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }

      logger.debug("Fetched admin: {}", admin);
      return ResponseEntity.status(HttpStatus.OK).body(admin);
    } catch (Exception e) {
      logger.error("Error fetching admin with id {}: {}", id, e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Creates a new admin.
   *
   * @param adminRegisterRequest The request body containing admin details.
   * @return The created admin.
   */
  @PostMapping("/register")
  @Operation(
      description = "Creates a new admin.",
      summary = "The newly created admin is returned.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Admin created successfully"),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "409", description = "Conflict: Admin already exists"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<?> register(
      @Parameter(
          name = "adminRegisterRequest",
          description = "Admin registration details",
          required = true
      )
      @RequestBody AdminDetails adminRegisterRequest) {
    try {
      if (accountsService.findByEmail(adminRegisterRequest.getEmail()) != null) {
        logger.warn("Email already in use: {}", adminRegisterRequest.getEmail());
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(Map.of("error", "Email already in use"));
      }

      Admins admin = new Admins();
      admin.setName(adminRegisterRequest.getName());
      admin.setPassword(adminRegisterRequest.getPassword());
      admin.setEmail(adminRegisterRequest.getEmail());

      logger.info("Creating new admin");
      Admins createdAdmin = adminService.save(admin);
      logger.info("Created admin: {}", createdAdmin);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin);
    } catch (Exception e) {
      logger.error("Error creating admin: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * Updates an existing admin by its ID.
   *
   * @param id The ID of the admin to update.
   * @param adminDetails The details to update the admin with.
   * @return The updated admin.
   */
  @PutMapping("/{id}")
  @Operation(
      description = "Updates an admin by its ID.",
      summary = "If the admin is not found, a 404 error is returned.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Admin updated successfully"),
      @ApiResponse(responseCode = "400", description = "Bad request"),
      @ApiResponse(responseCode = "404", description = "Admin not found"),
      @ApiResponse(responseCode = "500", description = "Internal server error")
  })
  public ResponseEntity<Admins> updateAdmin(
      @Parameter(
          description = "ID of the admin to update",
          required = true,
          example = "123"
      )
      @PathVariable Long id,
      @Parameter(
          description = "Admin details to update with",
          required = true
      )
      @RequestBody Admins adminDetails) {
    try {
      logger.info("Updating admin with id: {}", id);

      Admins existingAdmin = adminService.findById(id);
        if (existingAdmin == null) {
            logger.info("Admin with id {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

      existingAdmin.setName(adminDetails.getName());
      existingAdmin.setPassword(adminDetails.getPassword());
      existingAdmin.setEmail(adminDetails.getEmail());
      logger.info("Updating admin: {}", existingAdmin);
      Admins updatedAdmin = adminService.save(existingAdmin, false);
      logger.info("Updated admin: {}", updatedAdmin);

      return ResponseEntity.status(HttpStatus.OK).body(updatedAdmin);
    } catch (Exception e) {
      logger.error("Error updating admin with id {}: {}", id, e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}