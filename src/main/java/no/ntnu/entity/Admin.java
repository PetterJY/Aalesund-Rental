package no.ntnu.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Admin {
  @Id
  private Long id;

  @Column(nullable = false)
  private String name;

  @OneToOne
  @JoinColumn(name = "id", referencedColumnName = "id")
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