import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import './ChangePassword.css';
import '../../App.css';

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


  function changePassword(event) {
    event.preventDefault();

    const data = retrieveData();

    if (data.newPassword !== data.confirmPassword) {
      console.log("Passwords do not match.");
      setErrorMessage("New password and confirmation do not match.");
      setShowErrorMessage(true);
      return; 
    }

    // Proceed to change the password
    fetch('http://localhost:8080/users/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error changing password.");
          setErrorMessage("Failed to change password. Please try again.");
          setShowErrorMessage(true);
          return; 
        }

        console.log("Password has been changed successfully.");
        closeModal();
        return response.json();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setErrorMessage("An unexpected error occurred.");
        setShowErrorMessage(true);
      });
  }

  function retrieveData() {
    return {
      oldPassword: document.getElementById('old-password-field').value,
      newPassword: document.getElementById('new-password-field').value,
      confirmPassword: document.getElementById('confirm-password-field').value,
    };
  }

  if (!isModalVisible) {
    return null; 
  }

  const modalContent = (
        <main id='changePasswordModal' className='modal' onMouseDown={closeModal}>
            <form id='bottom-section' onMouseDown={(e) => e.stopPropagation()} onSubmit={changePassword}>
              <label htmlFor='old-password-field'>Old Password</label>
              <div className='toggle-password-button-container'>
                <input 
                  id='old-password-field'
                  className='password-input-field' 
                  type={oldPasswordVisible ? 'text' : 'password' }
                  required 
                />
                <button
                  type="button"
                  className="toggle-password-button"
                  onClick={toggleOldPasswordVisibility}
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
                />
                <button
                  type="button"
                  className="toggle-password-button"
                  onClick={toggleNewPasswordVisibility}
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
                />
                <button
                  type="button"
                  className="toggle-password-button"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <EyeSlash/> : <Eye/> }
                </button>
              </div>
              {showErrorMessage && (
                <p className="error-message">
                  {errorMessage}
                </p>
              )}
              <button className='submit-button' type='submit'>Change Password</button>
              <button className='cancel-button' type='button' onClick={closeModal}>Cancel</button>
            </form>
        </main>
      );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default ChangePassword;