package no.ntnu.entity.dto;

import jakarta.validation.constraints.NotBlank;

public class PasswordChangeRequest {
  private long id;

  private String oldPassword;

  private String newPassword;

  public long getId() {
    return id;
  }

  public String getOldPassword() {
    return oldPassword;
  }

  public String getNewPassword() {
    return newPassword;
  }
}
