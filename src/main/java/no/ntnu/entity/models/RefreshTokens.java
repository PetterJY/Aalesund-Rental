package no.ntnu.entity.models;

import java.util.Date;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

/**
 * Represents a refresh token entity in the system.
 * <p>
 * This class is part of the entity layer and is used to map to the database.
 * <ul>
 *   <li>id - The ID of the refresh token</li>
 *   <li>token - The refresh token string</li>
 *   <li>accountId - The ID of the account</li>
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

  @Column(nullable = false, unique = true, length = 512)
  @ApiModelProperty("The refresh token string")
  private String token;

  @Column(nullable = false)
  @ApiModelProperty("The date when the refresh token was created")
  private Date issuedAt;

  @Column(nullable = false)
  @ApiModelProperty("The expiration date of the refresh token")
  private Date expirationDate;

  @Column(nullable = false)
  @ApiModelProperty("Indicates if the refresh token has been revoked")
  private boolean revoked = false; 

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

  public void setIssuedAt(Date createdAt) {
    this.issuedAt = createdAt;
  }

  public Date getIssuedAt() {
    return issuedAt;
  }

  public void setExpirationDate(Date expirationDate) {
    this.expirationDate = expirationDate;
  }

  public Date getExpirationDate() {
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