package no.ntnu.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Providers {
  @Id
  private Long id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String companyName;

  @OneToOne
  @JoinColumn(name = "id", referencedColumnName = "id")
  private Accounts account;
}
