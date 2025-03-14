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

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Accounts getAccount() {
    return account;
  }

  public void setAccount(Accounts account) {
    this.account = account;
  }
}