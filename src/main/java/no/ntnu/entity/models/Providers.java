package no.ntnu.entity.models;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

@Entity
public class Providers {
  @Id
  @ApiModelProperty("The ID of the provider")
  private Long id;

  @Column(nullable = false, unique = true)
  @ApiModelProperty("The email of the provider")
  private String email;

  @Column(nullable = false)
  @ApiModelProperty("The name of the company of the provider")
  private String companyName;

  @OneToOne(cascade = CascadeType.ALL) 
  @JoinColumn(name = "id")
  @MapsId
  @ApiModelProperty("The account associated with the user")
  private Accounts account;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getCompanyName() {
    return companyName;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }

  public Accounts getAccount() {
    return account;
  }

  public void setAccount(Accounts account) {
    this.account = account;
  }
}
