package no.ntnu.logic.repository;

import org.springframework.data.repository.CrudRepository;

import no.ntnu.entity.models.RefreshTokens;

public interface RefreshTokensRepository extends CrudRepository<RefreshTokens, Long> {
  RefreshTokens findByToken(String token);

  void deleteByToken(String token);  
}