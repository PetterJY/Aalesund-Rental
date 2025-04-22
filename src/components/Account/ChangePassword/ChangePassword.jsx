import React, { useState } from 'react';
import './ChangePassword.css';
import '../../App.css';

const ChangePassword = ({ closeModal, isModalVisible }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <>
      {isModalVisible && (
        <main id='changePasswordModal' className='modal' onMouseDown={closeModal}>
            <form id='bottom-section' onMouseDown={(e) => e.stopPropagation()} onSubmit={changePassword}>
              <label htmlFor='old-password-field'>Old Password</label>
              <input id='old-password-field' className='password-field' type='password' required />
              <label htmlFor='new-password-field'>New Password</label>
              <input id='new-password-field' className='password-field' type='password' required />
              <label htmlFor='confirm-password-field'>Confirm New Password</label>
              <input id='confirm-password-field' className='password-field' type='password' required />
              {showErrorMessage && (
                <p className="error-message">
                  {errorMessage}
                </p>
              )}
              <button className='submit-button' type='submit'>Change Password</button>
              <button className='cancel-button' type='button' onClick={closeModal}>Cancel</button>
            </form>
        </main>
      )}
    </>
  );
};

export default ChangePassword;