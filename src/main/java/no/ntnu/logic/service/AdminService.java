package no.ntnu.logic.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.AdminNotFoundException;
import no.ntnu.entity.models.Admins;
import no.ntnu.entity.models.Users;
import no.ntnu.logic.repository.AdminRepository;

/**
 * Service class for managing admin-related operations.
 */
@Service
public class AdminService {

  private final AdminRepository adminRepository;
  private static final Logger logger = 
      LoggerFactory.getLogger(AdminService.class.getSimpleName());

  private final BCryptPasswordEncoder passwordEncoder;

  /**
   * Constructor for AdminService.
   *
   * @param adminRepository the repository for admin entities
   */
  @Autowired
  public AdminService(AdminRepository adminRepository, BCryptPasswordEncoder passwordEncoder) {
    logger.info("AdminService initialized");
    this.adminRepository = adminRepository;
    this.passwordEncoder = passwordEncoder;
  }

  /**
   * Fetches all admins.
   *
   * @return a list of all admins
   */
  public List<Admins> findAll() {
    logger.info("Fetching all admins");
    List<Admins> admins = StreamSupport.stream(adminRepository.findAll().spliterator(), false)
        .filter(user -> user.getAccount().getRole().equals("ADMIN"))
        .collect(Collectors.toList());
    return admins;
  }

  /**
   * Fetches an admin by its ID.
   *
   * @param id the ID of the admin
   * @return the admin with the given ID
   * @throws AdminNotFoundException if the admin is not found
   */
  public Admins findById(Long id) throws AdminNotFoundException {
    logger.info("Fetching admin with id: {}", id);
    return adminRepository.findById(id)
      .orElseThrow(() -> new AdminNotFoundException("Admin not found with id: " + id));
  }

  /**
   * Saves an admin.
   *
   * @param admin the admin to save
   * @return the saved admin
   */
  public Admins save(Admins admin) {
    logger.info("Saving admin with id: {}", admin.getId());
    admin.getAccount().setPassword(passwordEncoder.encode(admin.getAccount().getPassword()));
    return adminRepository.save(admin);
  }

  /**
   * Deletes an admin by its ID.
   *
   * @param id the ID of the admin to delete
   * @throws AdminNotFoundException if the admin is not found
   */
  public void deleteById(Long id) throws AdminNotFoundException {
    logger.info("Deleting admin with id: {}", id);
    if (!adminRepository.existsById(id)) {
      throw new AdminNotFoundException("Admin not found with id: " + id);
    }
    adminRepository.deleteById(id);
  }
}
