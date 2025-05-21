package no.ntnu.logic.service;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.ExpiredJwtException;
import no.ntnu.entity.CustomUserDetails;
import no.ntnu.entity.models.RefreshTokens;
import no.ntnu.logic.repository.RefreshTokensRepository;
import no.ntnu.security.JwtUtility;

@Service
public class RefreshTokenService {
  private static final Logger logger = 
      LoggerFactory.getLogger(RefreshTokenService.class.getSimpleName());

  @Autowired
  private RefreshTokensRepository refreshTokenRepository;

  @Autowired
  private AccountsService accountsService;

  @Autowired
  private JwtUtility jwtUtility;

  /**
   * Generates a new refresh token for the given user.
   * Saves the refresh token in the database.
   *
   * @param userDetails The user details for whom the refresh token is generated.
   * @return The generated refresh token.
   */
  public String generateRefreshToken(CustomUserDetails userDetails) {
    logger.info("Generating refresh token for user: {}", userDetails.getUsername());

    RefreshTokens token = new RefreshTokens();
    String refreshToken = jwtUtility.generateRefreshToken(userDetails);
    token.setToken(refreshToken);

    logger.debug("Generated refresh token: {}", refreshToken);

    try {
        
      token.setIssuedAt(jwtUtility.getIssuedAtDateFromToken(refreshToken));
      
      logger.debug("Issued at date: {}", token.getIssuedAt());
      
      token.setExpirationDate(jwtUtility.getExpirationDateFromToken(refreshToken));
      
      logger.debug("Expiration date: {}", token.getExpirationDate());
      
      token.setAccount(accountsService.findById(userDetails.getId()));
    } catch (ExpiredJwtException e) {
      logger.error("Error while parsing refresh token: {}", e.getMessage());

      Date issuedAt = e.getClaims().getIssuedAt();
      Date expiration = e.getClaims().getExpiration();

      logger.debug("Issued at date: {}", issuedAt);
      logger.debug("Expiration date: {}", expiration);

      throw new RuntimeException("Invalid refresh token");
    }

    List<RefreshTokens> oldToken = refreshTokenRepository.findAllByAccountIdAndRevokedFalse(userDetails.getId());

    if (oldToken != null && !oldToken.isEmpty()) {
      logger.debug("Revoking old refresh token");
      for (RefreshTokens old : oldToken) {
        old.setRevoked(true);
        refreshTokenRepository.save(old);
      }
    }

    logger.debug("Saving new refresh token to the database");
      
    refreshTokenRepository.save(token);

    logger.info("Generated new refresh token for user: {}", userDetails.getUsername());

    return refreshToken;
  }

  /**
   * Revokes the refresh token for the given user.
   *
   * @param tokenStr The refresh token string to revoke.
   */
  public void revokeRefreshToken(String tokenStr) {
    RefreshTokens tokenObj = refreshTokenRepository.findByToken(tokenStr);

    if (tokenObj == null) {
      logger.warn("No refresh token found for the provided token");
      return;
    }

    if (tokenObj.isRevoked()) {
      logger.warn("Refresh token is already revoked");
      return;
    } 

    tokenObj.setRevoked(true);
    
    refreshTokenRepository.save(tokenObj);
    logger.info("Revoked refresh token for user with id: {}", tokenObj.getId());
  }

  /**
   * Validates the refresh token.
   *
   * @param refreshToken The refresh token to validate.
   * @return True if the token is valid, false otherwise.
   */
  public boolean isValidRefreshToken(String refreshToken) {
    RefreshTokens token = refreshTokenRepository.findByToken(refreshToken);
    
    if (token == null) {
      logger.warn("No valid refresh token found in the database: {}" , refreshToken);
      return false;
    }
    
    logger.debug("Validating refresh token");

    if (token.isRevoked()) {
      logger.warn("Refresh token is revoked or not found");
      return false;
    }

    logger.info("Refresh token is valid");
    return true;
  }
}