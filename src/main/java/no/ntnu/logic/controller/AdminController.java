package no.ntnu.logic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import no.ntnu.logic.repository.AdminRepository;

@RestController
public class AdminController {
  @Autowired
  private AdminRepository adminRepository;
}