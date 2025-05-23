import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { getToken, makeApiRequest } from '../../utils/JwtUtility'; 
import { Warning, Eye, EyeSlash } from '@phosphor-icons/react';
import './DeleteAccount.css';

const DeleteAccount = ({ closeModal, isModalVisible }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false); 
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  
  //OLD IMPLEMENTATION!!!

  // async function deleteAccount(event) {
  //   event.preventDefault();

  //   // Check if the verification-keyword matches
  //   if (document.getElementById('verify-field').value !== 'delete') {
  //     console.log("Verification keyword does not match.");
  //     setErrorMessage("Verification keyword does not match.");
  //     setShowErrorMessage(true);
  //     return; // Exit early if the verification keyword is incorrect
  //   }
  
  //   const passwordField = {
  //     password: document.getElementById('delete-account-password-field').value,
  //   }

  //   try {
  //     const response = await fetch('http://localhost:8080/api/accounts', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${getToken()}`,
  //       },
  //       body: JSON.stringify(passwordField),
  //     });

  //     if (response) {
  //       if (response.status === 401) {
  //         console.error("Password does not match.");
  //         setErrorMessage("Password does not match.");
  //         setShowErrorMessage(true);
  //         return;
  //       }

  //       if (response.status === 403) {
  //         console.error("You are not authorized to delete this account.");
  //         setErrorMessage("You are not authorized to delete this account.");
  //         setShowErrorMessage(true);
  //         return;
  //       }

  //       if (response.status === 404) {
  //         console.error("Account not found.");
  //         setErrorMessage("Account not found.");
  //         setShowErrorMessage(true);
  //         return;
  //       }

  //       if (response.status !== 204) {
  //         console.error(response.status + ": An unexpected error occurred:", response.statusText);
  //         setErrorMessage("An unexpected error occurred.");
  //         setShowErrorMessage(true);
  //         return;
  //       }

  //       const responseDetails = await response.json();

  //       console.log("Account has been deleted.");
  //       closeModal();
  //       return responseDetails;
  //     }
  //   } catch(error) {
  //     console.error("An unexpected error occurred:", error);
  //     setErrorMessage("An unexpected error occurred. Please try again later.");
  //     setShowErrorMessage(true);
  //   };
  // }

  //NEW IMPLEMNTATION!!!

async function deleteAccount(event) {
  event.preventDefault();

  if (document.getElementById("verify-field").value !== "delete") {
    console.log("Verification keyword does not match.");
    setErrorMessage("Verification keyword does not match.");
    setShowErrorMessage(true);
    return;
  }

  const passwordField = {
    password: document.getElementById("delete-account-password-field").value,
  };

  try {
    await makeApiRequest("http://localhost:8080/api/accounts", {
      method: "DELETE",
      body: JSON.stringify(passwordField),
    });
    
    console.log("Account has been deleted.");
    closeModal();
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    
    sessionStorage.setItem('accountDeletedMessage', 'Your account has been successfully deleted.');
    
    window.location.href = '/';
    
  } catch (error) {
    if (error.cause?.status === 401) {
      setErrorMessage("Password does not match or unauthorized.");
    } else if (error.cause?.status === 403) {
      setErrorMessage("You are not authorized to delete this account.");
    } else if (error.cause?.status === 404) {
      setErrorMessage("Account not found.");
    } else {
      console.error("An unexpected error occurred:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
    setShowErrorMessage(true);
  }
}

const modalContent = (
  <dialog 
    id='deleteAccountModal' 
    className='modal' 
    onMouseDown={closeModal}
    aria-labelledby="delete-account-title"
    aria-modal="true"
    open={isModalVisible}
  >
    <div className='modal-content' onMouseDown={(e) => e.stopPropagation()}>
      <h2 id='delete-account-title'>Delete Account</h2>
      <Warning size={32} color="red" weight="fill" aria-hidden="true" />
      <p>Are you sure you want to delete your account?</p>
      <p>You will not be able to recover your account after deletion.</p>
      <p>All your data will be permanently removed.</p>
      <p>Do you want to proceed?</p>
      <form id='bottom-section' onSubmit={(e) => deleteAccount(e)}>
        <label htmlFor='delete-account-password-field'>Password</label>
        <div className='toggle-password-button-container'>
          <input 
            id='delete-account-password-field'
            className='password-input-field' 
            type={passwordVisible ? 'text' : 'password' }
            required
            aria-required="true"
          />
          <button
            type="button"
            className="toggle-password-button"
            onClick={togglePasswordVisibility}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            aria-pressed={passwordVisible}
          >
            {passwordVisible ? <EyeSlash/> : <Eye/> }
          </button>
        </div>
        <label htmlFor='verify-field'>Type <i id='verification-keyword'>delete</i> to confirm</label>
        <input 
          id='verify-field' 
          type='text' 
          required 
          aria-required="true"
        />
        {showErrorMessage && (
          <p className="error-message" role="alert">
            {errorMessage}
          </p>
        )}
        <button className='submit-button' type='submit' aria-label="Delete Account">Delete Account</button>
        <button className='cancel-button' type='button' onClick={closeModal} aria-label="Cancel">Cancel</button>
      </form>
    </div>
  </dialog>
);

  if (!isModalVisible) return null;

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default DeleteAccount;