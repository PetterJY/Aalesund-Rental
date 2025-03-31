package no.ntnu.entity;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.*;

@Entity
public class Accounts {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ApiModelProperty("The ID of the account")
  private Long id;

  @Column(nullable = false)
  @ApiModelProperty("The role of the account")
  private String role;

  @Column(nullable = false)
  @ApiModelProperty("The password of the account")
  private String password;

  @Column(nullable = false)
  @ApiModelProperty("The creation time of the account")
  private LocalDateTime createdAt;

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getRole() {
    return this.role;
  }
  
  public void setRole(String role) {
    this.role = role;
  }
  
  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

    public LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}