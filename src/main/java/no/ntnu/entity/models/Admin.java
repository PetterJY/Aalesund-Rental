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
public class Admin {
  @Id
  @ApiModelProperty("The ID of the admin")
  private Long id;

  @Column(nullable = false)
  @ApiModelProperty("The name of the admin")
  private String name;

  @OneToOne(cascade = CascadeType.ALL) 
  @JoinColumn(name = "id")
  @MapsId
  @ApiModelProperty("The account associated with the user")
  private Accounts account;
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public void setAccount(Accounts account) {
    this.account = account;
  }
  
  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }
  
  public Accounts getAccount() {
    return account;
  }
}