package no.ntnu.logic.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.ntnu.entity.exceptions.AdminNotFoundException;
import no.ntnu.entity.models.Admin;
import no.ntnu.logic.repository.AdminRepository;

/**
 * Service class for managing admin-related operations.
 */
@Service
public class AdminService {

  private final AdminRepository adminRepository;
  private static final Logger logger = 
      LoggerFactory.getLogger(AdminService.class.getSimpleName());

  /**
   * Constructor for AdminService.
   *
   * @param adminRepository the repository for admin entities
   */
  @Autowired
  public AdminService(AdminRepository adminRepository) {
    logger.info("AdminService initialized");
    this.adminRepository = adminRepository;
  }

  /**
   * Fetches all admins.
   *
   * @return a list of all admins
   */
  public List<Admin> findAll() {
    logger.info("Fetching all admins");
    return (List<Admin>) adminRepository.findAll();
  }

  /**
   * Fetches an admin by its ID.
   *
   * @param id the ID of the admin
   * @return the admin with the given ID
   * @throws AdminNotFoundException if the admin is not found
   */
  public Admin findById(Long id) throws AdminNotFoundException {
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
  public Admin save(Admin admin) {
    logger.info("Saving admin with id: {}", admin.getId());
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
