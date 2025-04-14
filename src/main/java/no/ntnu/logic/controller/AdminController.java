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
import no.ntnu.entity.models.Admin;
import no.ntnu.logic.service.AdminService;

/**
 * Controller for managing admin-related operations.
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

  private final AdminService adminService;

  private static final Logger logger = 
      LoggerFactory.getLogger(AdminController.class.getSimpleName());

  @Autowired
  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  /**
   * Returns all admins.
   *
   * @return List of all admins.
   */
  @GetMapping
  @ApiOperation(value = "Returns all admins.")
  public ResponseEntity<List<Admin>> getAllAdmins() {
    logger.info("Fetching all admins");
    List<Admin> admins = adminService.findAll();
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
  public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
    logger.info("Fetching admin with id: {}", id);
    Admin admin = adminService.findById(id);
    logger.debug("Fetched admin: {}", admin);
    return ResponseEntity.status(HttpStatus.OK).body(admin);
  }

  /**
   * Creates a new admin.
   *
   * @param admin The admin to create.
   * @return The created admin.
   */
  @PostMapping
  @ApiOperation(value = "Creates a new admin.", notes = "The newly created admin is returned.")
  public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
    logger.info("Creating new admin");
    Admin createdAdmin = adminService.save(admin);
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
  public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
    logger.info("Updating admin with id: {}", id);
    Admin admin = adminService.findById(id);
    admin.setName(adminDetails.getName());
    admin.setAccount(adminDetails.getAccount());
    // TODO: Add validation for details && handle exceptions
    Admin updatedAdmin = adminService.save(admin);
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