package no.ntnu.entity.models;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * Represents a refresh token entity in the system.
 * <p>
 * This class is part of the entity layer and is used to map to the database.
 * <ul>
 *   <li>id - The ID of the refresh token</li>
 *   <li>token - The refresh token string</li>
 *   <li>userId - The ID of the user</li>
 *   <li>createdAt - The date when the refresh token was created</li>
 *   <li>expirationDate - The expiration date of the refresh token</li>
 *   <li>revoked - Indicates if the refresh token has been revoked</li>
 * </ul>
 */
@Entity
public class RefreshTokens {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ApiModelProperty("The ID of the refresh token")
  private Long id;

  @Column(nullable = false, unique = true)
  @ApiModelProperty("The refresh token string")
  private String token;

  @Column(nullable = false)
  @ApiModelProperty("The ID of the user associated with the refresh token")
  private Long userId;

  @Column(nullable = false)
  @ApiModelProperty("The date when the refresh token was created")
  private LocalDateTime createdAt;

  @Column(nullable = false)
  @ApiModelProperty("The expiration date of the refresh token")
  private LocalDateTime expirationDate;

  @Column(nullable = false)
  @ApiModelProperty("Indicates if the refresh token has been revoked")
  private boolean revoked;

  @ManyToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false)
  @ApiModelProperty("The account associated with the refresh token")
  private Accounts account;
  
  public void setId(Long id) {
    this.id = id;
  }

  public Long getId() {
    return id;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public String getToken() {
    return token;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public Long getUserId() {
    return userId;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setExpirationDate(LocalDateTime expirationDate) {
    this.expirationDate = expirationDate;
  }

  public LocalDateTime getExpirationDate() {
    return expirationDate;
  }

  public void setRevoked(boolean revoked) {
    this.revoked = revoked;
  }

  public boolean isRevoked() {
    return revoked;
  }

  public void setAccount(Accounts account) {
    this.account = account;
  }

  public Accounts getAccount() {
    return account;
  }
}