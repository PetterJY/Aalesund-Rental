package no.ntnu.logic.controller;

import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.AdminRepository;

@RestController
public class AdminController {
  private final AdminRepository adminRepository;

  public AdminController(AdminRepository adminRepository) {
    this.adminRepository = adminRepository;
  }
  
}
