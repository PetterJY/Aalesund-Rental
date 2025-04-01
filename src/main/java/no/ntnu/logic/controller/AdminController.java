package no.ntnu.logic.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import no.ntnu.entity.Admin;
import no.ntnu.entity.exceptions.AccountNotFoundException;
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
  public List<Admin> getAllAdmins() {
    return adminService.findAll();
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an admin by its ID.", notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
    try {
      Admin admin = adminService.findById(id);
      return ResponseEntity.ok(admin);
    } catch (AccountNotFoundException e) {
      logger.error("Account not found with id: {}", id, e);
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  @ApiOperation(value = "Creates a new admin.", notes = "The newly created admin is returned.")
  public Admin createAdmin(@RequestBody Admin admin) {
    return adminService.save(admin);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an admin by its ID.", notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
    try {
      Admin admin = adminService.findById(id);
      admin.setName(adminDetails.getName());
      admin.setAccount(adminDetails.getAccount());
      return ResponseEntity.ok(adminService.save(admin));
    } catch (AccountNotFoundException e) {
      logger.error("Account not found with id: ", id, e);
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an admin by its ID.", notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
    try {
      adminService.deleteById(id);
      return ResponseEntity.noContent().build();
    } catch (AccountNotFoundException e) {
      return ResponseEntity.notFound().build();
    }
  }
}