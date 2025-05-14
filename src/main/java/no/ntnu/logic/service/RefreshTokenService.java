package no.ntnu.logic.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
  private JwtUtility jwtUtility;

  /**
   * Generates a new refresh token for the given user.
   *
   * @param userDetails The user details for whom the refresh token is generated.
   * @return The generated refresh token.
   */
  public String generateRefreshToken(CustomUserDetails userDetails) {
    String refreshToken = jwtUtility.generateRefreshToken(userDetails);
    RefreshTokens token = new RefreshTokens();
    token.setUserId(userDetails.getId());
    token.setToken(refreshToken);
    refreshTokenRepository.save(token);
    logger.info("Generated new refresh token for user: {}", userDetails.getUsername());
    return refreshToken;
  }
}