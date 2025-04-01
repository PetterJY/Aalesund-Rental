package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.ApiOperation;
import no.ntnu.entity.Admin;
import no.ntnu.logic.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

  private final AdminService adminService;
  private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

  @Autowired
  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  @GetMapping
  @ApiOperation(value = "Returns all admins.")
  public ResponseEntity<List<Admin>> getAllAdmins() {
    logger.info("Fetching all admins");
    List<Admin> admins = adminService.findAll();
    logger.debug("Fetched {} admins", admins.size());
    return ResponseEntity.status(HttpStatus.OK).body(admins);
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an admin by its ID.", notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
    logger.info("Fetching admin with id: {}", id);
    Admin admin = adminService.findById(id);
    logger.debug("Fetched admin: {}", admin);
    return ResponseEntity.status(HttpStatus.OK).body(admin);
  }

  @PostMapping
  @ApiOperation(value = "Creates a new admin.", notes = "The newly created admin is returned.")
  public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
    logger.info("Creating new admin");
    Admin createdAdmin = adminService.save(admin);
    logger.debug("Created admin: {}", createdAdmin);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an admin by its ID.", notes = "If the admin is not found, a 404 error is returned.")
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

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an admin by its ID.", notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
    logger.info("Deleting admin with id: {}", id);
    adminService.deleteById(id);
    logger.debug("Deleted admin with id: {}", id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}