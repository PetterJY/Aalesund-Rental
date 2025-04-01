package no.ntnu.logic.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.Admin;
import no.ntnu.entity.exceptions.AccountNotFoundException;
import no.ntnu.logic.controller.AccountsController;
import no.ntnu.logic.repository.AdminRepository;

@Service
public class AdminService {
  private final AdminRepository adminRepository;

  private static final Logger logger = LoggerFactory.getLogger(AdminService.class);

  @Autowired
  public AdminService(AdminRepository adminRepository) {
    logger.info("AdminService initialized");
    this.adminRepository = adminRepository;
  }

  public List<Admin> findAll() {
    logger.info("Fetching all admins");
    return (List<Admin>) adminRepository.findAll();
  }

  public Admin findById(Long id) throws AccountNotFoundException {
    logger.info("Fetching admin with id: {}", id);
    return adminRepository.findById(id)
    .orElseThrow(() -> new AccountNotFoundException("Admin not found with id: " + id));
  }

  public Admin save(Admin admin) {
    return adminRepository.save(admin);
  }

  public void deleteById(Long id) throws AccountNotFoundException {
    logger.info("Deleting admin with id: {}", id);
    if (!adminRepository.existsById(id)) {
      throw new AccountNotFoundException("Admin not found with id: " + id);
    }
    adminRepository.deleteById(id);
  }
}
