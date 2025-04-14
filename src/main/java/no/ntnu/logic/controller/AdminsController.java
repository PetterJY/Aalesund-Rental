package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.dto.AdminRegisterRequest;
import no.ntnu.entity.models.Accounts;
import no.ntnu.entity.models.Admins;
import no.ntnu.logic.service.AdminService;

/**
 * Controller for managing admin-related operations.
 */
@RestController
@RequestMapping("/admins")
public class AdminsController {

  private final AdminService adminService;

  private static final Logger logger = 
      LoggerFactory.getLogger(AdminsController.class.getSimpleName());

  @Autowired
  public AdminsController(AdminService adminService) {
    this.adminService = adminService;
  }

  /**
   * Returns all admins.
   *
   * @return List of all admins.
   */
  @GetMapping
  @ApiOperation(value = "Returns all admins.")
  public ResponseEntity<List<Admins>> getAllAdmins() {
    logger.info("Fetching all admins");
    List<Admins> admins = adminService.findAll();
    logger.debug("Fetched {} admins", admins.size());
    return ResponseEntity.status(HttpStatus.OK).body(admins);
  }

  /**
   * Returns an admin by its ID.
   *
   * @param id The ID of the admin.
   * @return The admin with the specified ID.
   */
  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an admin by its ID.", 
      notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Admins> getAdminById(@PathVariable Long id) {
    logger.info("Fetching admin with id: {}", id);
    Admins admin = adminService.findById(id);
    logger.debug("Fetched admin: {}", admin);
    return ResponseEntity.status(HttpStatus.OK).body(admin);
  }

  /**
   * Creates a new admin.
   *
   * @param adminRegisterRequest The request body containing admin details.
   * @return The created admin.
   */
  @PostMapping
  @ApiOperation(value = "Creates a new admin.", notes = "The newly created admin is returned.")
  public ResponseEntity<Admins> createAdmin(
      @RequestBody AdminRegisterRequest adminRegisterRequest) {
    Admins admin = new Admins();
    admin.setName(adminRegisterRequest.getName());
    
    Accounts account = new Accounts();
    account.setPassword(adminRegisterRequest.getPassword());
    account.setRole(adminRegisterRequest.getRole());

    admin.setAccount(account);

    logger.info("Creating new admin");
    Admins createdAdmin = adminService.save(admin);
    logger.debug("Created admin: {}", createdAdmin);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin);
  }

  /**
   * Updates an existing admin by its ID.
   *
   * @param id The ID of the admin to update.
   * @param adminDetails The details to update the admin with.
   * @return The updated admin.
   */
  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an admin by its ID.", 
      notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Admins> updateAdmin(
      @PathVariable Long id, @RequestBody Admins adminDetails) {
    logger.info("Updating admin with id: {}", id);
    Admins admin = adminService.findById(id);
    admin.setName(adminDetails.getName());
    admin.setAccount(adminDetails.getAccount());
    // TODO: Add validation for details && handle exceptions
    Admins updatedAdmin = adminService.save(admin);
    logger.debug("Updated admin: {}", updatedAdmin);
    return ResponseEntity.status(HttpStatus.OK).body(updatedAdmin);
  }

  /**
   * Deletes an admin by its ID.
   *
   * @param id The ID of the admin to delete.
   * @return A response entity with status NO_CONTENT.
   */
  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an admin by its ID.", 
      notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
    logger.info("Deleting admin with id: {}", id);
    adminService.deleteById(id);
    logger.debug("Deleted admin with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}