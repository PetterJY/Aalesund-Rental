import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import './ChangePassword.css';
import { getAccountId } from '../../utils/JwtUtility';

const ChangePassword = ({ closeModal, isModalVisible }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible((prevState) => !prevState);
  };

  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible((prevState) => !prevState);
  };

  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };

  const retrieveData = () => {
    return {
      oldPassword: document.getElementById('old-password-field').value,
      newPassword: document.getElementById('new-password-field').value,
      confirmPassword: document.getElementById('confirm-password-field').value,
    };
  };


async function changePassword(event) {
  event.preventDefault();

  const formData = retrieveData();

  if (formData.newPassword !== formData.confirmPassword) {
    console.log("Passwords do not match.");
    setErrorMessage("New password and confirmation do not match.");
    setShowErrorMessage(true);
    return; 
  }

  const userId = getAccountId();

  if (!userId) {
    console.error("Could not get account ID from token");
    setErrorMessage("Authentication error. Please log in again.");
    setShowErrorMessage(true);
    return;
  }
  
  const requestBody = {
    id: userId,  // Change userId to id
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword
  };

  try {
    const response = await fetch(`http://localhost:8080/api/accounts/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      console.log("Error changing password: " + response.statusText);
      
      if (response.status === 401) {
        setErrorMessage("Current password is incorrect.");
      } else {
        setErrorMessage("Failed to change password. Please try again.");
      }
      
      setShowErrorMessage(true);
      return; 
    }
    
    console.log("Password has been changed successfully.");
    closeModal();
  } catch(error) {
    console.error("An error occurred:", error);
    setErrorMessage("An unexpected error occurred.");
    setShowErrorMessage(true);
  }
}

  if (!isModalVisible) {
    return null; 
  }

const modalContent = (
  <dialog 
    id='changePasswordModal' 
    className='modal' 
    onMouseDown={closeModal}
    aria-labelledby="change-password-heading"
    open={isModalVisible}
  >
    <form id='bottom-section' onMouseDown={(e) => e.stopPropagation()} onSubmit={changePassword}>
      <h2 id="change-password-heading" className="visually-hidden">Change Password</h2>
      
      <label htmlFor='old-password-field'>Old Password</label>
      <div className='toggle-password-button-container'>
        <input 
          id='old-password-field'
          className='password-input-field' 
          type={oldPasswordVisible ? 'text' : 'password' }
          required 
          aria-required="true"
        />
        <button
          type="button"
          className="toggle-password-button"
          onClick={toggleOldPasswordVisibility}
          aria-label={oldPasswordVisible ? "Hide old password" : "Show old password"}
          aria-pressed={oldPasswordVisible}
        >
          {oldPasswordVisible ? <EyeSlash/> : <Eye/> }
        </button>
      </div>
      
      <label htmlFor='new-password-field'>New Password</label>
      <div className='toggle-password-button-container'>
        <input 
          id='new-password-field'
          className='password-input-field' 
          type={newPasswordVisible ? 'text' : 'password' }
          required 
          aria-required="true"
        />
        <button
          type="button"
          className="toggle-password-button"
          onClick={toggleNewPasswordVisibility}
          aria-label={newPasswordVisible ? "Hide new password" : "Show new password"}
          aria-pressed={newPasswordVisible}
        >
          {newPasswordVisible ? <EyeSlash/> : <Eye/> }
        </button>
      </div>
      
      <label htmlFor='confirm-password-field'>Confirm New Password</label>
      <div className='toggle-password-button-container'>
        <input 
          id='confirm-password-field'
          className='password-input-field' 
          type={confirmPasswordVisible ? 'text' : 'password' }
          required 
          aria-required="true"
        />
        <button
          type="button"
          className="toggle-password-button"
          onClick={toggleConfirmPasswordVisibility}
          aria-label={confirmPasswordVisible ? "Hide confirm password" : "Show confirm password"}
          aria-pressed={confirmPasswordVisible}
        >
          {confirmPasswordVisible ? <EyeSlash/> : <Eye/> }
        </button>
      </div>
      
      {showErrorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}
      
      <button className='submit-button' type='submit' aria-label="Change Password">Change Password</button>
      <button className='cancel-button' type='button' onClick={closeModal} aria-label="Cancel">Cancel</button>
    </form>
  </dialog>
);

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default ChangePassword;