package no.ntnu.logic.controller;

import java.util.List;
import java.util.Optional;

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
import no.ntnu.logic.repository.AdminRepository;

@RestController
@RequestMapping("/admin")
public class AdminController {

  private final AdminRepository adminRepository;

  @Autowired
  public AdminController(AdminRepository adminRepository) {
    this.adminRepository = adminRepository;
  }

  @GetMapping
  @ApiOperation(value = "Returns all admins.")
  public List<Admin> getAllAdmins() {
    return (List<Admin>) adminRepository.findAll();
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Returns an admin by its ID.", notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
    Optional<Admin> admin = adminRepository.findById(id);
    return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  @ApiOperation(value = "Creates a new admin.", notes = "The newly created admin is returned.")
  public Admin createAdmin(@RequestBody Admin admin) {
    return adminRepository.save(admin);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "Updates an admin by its ID.", notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
    Optional<Admin> admin = adminRepository.findById(id);
    if (admin.isPresent()) {
      Admin updatedAdmin = admin.get();
      updatedAdmin.setName(adminDetails.getName());
      updatedAdmin.setAccount(adminDetails.getAccount());
      return ResponseEntity.ok(adminRepository.save(updatedAdmin));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "Deletes an admin by its ID.", notes = "If the admin is not found, a 404 error is returned.")
  public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
    if (adminRepository.existsById(id)) {
      adminRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}