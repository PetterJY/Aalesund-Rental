package no.ntnu.logic.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.RefreshTokens;

public interface RefreshTokensRepository extends CrudRepository<RefreshTokens, Long> {
  RefreshTokens findByToken(String token);
  
  List<RefreshTokens> findAllByAccountIdAndRevokedFalse(Long accountId);
}