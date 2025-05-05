package no.ntnu.entity;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import no.ntnu.entity.models.Accounts;

/**
 * Custom implementation of UserDetails interface for Spring Security.
 * This class represents the user details used for authentication and authorization.
 */
public class CustomUserDetails implements UserDetails {
  private final long accountId;
  
  private final Accounts account;

  public CustomUserDetails(Accounts account) {
    this.account = account;
    this.accountId = account.getId();
  }

  public Long getId() {
    return account.getId();
  }

  public String getRole() {
    return account.getRole().toString();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singletonList(new SimpleGrantedAuthority(account.getRole().toString()));
  }

  @Override
  public String getPassword() {
    return account.getPassword();
  }

  @Override
  public String getUsername() {
    return account.getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}