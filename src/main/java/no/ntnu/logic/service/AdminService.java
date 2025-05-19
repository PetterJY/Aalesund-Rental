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
import no.ntnu.logic.repository.AdminRepository;

/**
 * Service class for managing admin-related operations.
 */
@Service
public class AdminService {
  private static final Logger logger = 
      LoggerFactory.getLogger(AdminService.class.getSimpleName());
  
  private final AdminRepository adminRepository;

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
    return StreamSupport.stream(adminRepository.findAll().spliterator(), false)
        .filter(admin -> !admin.isDeleted())
        .collect(Collectors.toList());
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
        .filter(admin -> !admin.isDeleted())
        .orElseThrow(() -> new AdminNotFoundException("Admin not found with id: " + id));
  }

  public Admins findByName(String username) {
    logger.info("Fetching admin with username: {}", username);
    return adminRepository.findByName(username)
        .filter(admin -> !admin.isDeleted())
        .orElseThrow(() -> new AdminNotFoundException("Admin not found with username: " + username));
  }

  /**
   * Saves an admin.
   *
   * @param admin the admin to save
   * @return the saved admin
   */
  public Admins save(Admins admin) {
    logger.info("Saving admin with email: {}", admin.getEmail());
    String password = admin.getPassword();
    admin.setPassword(passwordEncoder.encode(password));
    return adminRepository.save(admin);
  }

  /**
   * Saves an admin with the option to not encode the password.
   *
   * @param admin the admin to save
   * @param encodePassword whether to encode the password or not
   * @return the saved admin
   */
  public Admins save(Admins admin, boolean encodePassword) {
    if (encodePassword) {
      logger.debug("Encoding password for admin with email: {}", admin.getEmail());
      return save(admin);
    }
    logger.info("Saving admin with email: {}", admin.getEmail());
    return adminRepository.save(admin);
  }
}
