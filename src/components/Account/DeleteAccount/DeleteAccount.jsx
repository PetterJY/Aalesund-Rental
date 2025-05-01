import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { jwtDecode } from 'jwt-decode';
import { Warning, Eye, EyeSlash } from '@phosphor-icons/react';
import './DeleteAccount.css';
import '../../App.css';

const DeleteAccount = ({ closeModal, isModalVisible }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false); 
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const retrieveData = ( token ) => {
    try {
      if (!token) {
        throw new Error("Token not found in localStorage.");
      }
  
      const decodedToken = jwtDecode(token);
      const email = decodedToken.sub;
      
      console.log("Decoded Token:", decodedToken);
  
      if (!email) {
        throw new Error("Email not found in token payload.");
      }
  
      return {
        email: String(email),
        password: document.getElementById('delete-account-password-field').value,
      };
    } catch (error) {
      console.error("Error retrieving data:", error.message);
      return { email: "", password: "" }; // Return empty values if an error occurs
    }
  };
  function deleteAccount(event) {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    const data = retrieveData(token);
    
    if (data.email === "" || data.password === "") {
      console.log("Unable to retrieve email or password.");
      setErrorMessage("Unable to retrieve email or password.");
      setShowErrorMessage(true);
      return; 
    }

    // Check if the verification-keyword matches
    if (document.getElementById('verify-field').value !== 'delete') {
      console.log("Verification keyword does not match.");
      setErrorMessage("Verification keyword does not match.");
      setShowErrorMessage(true);
      return; // Exit early if the verification keyword is incorrect
    }
  
    return fetch('http://localhost:8080/accounts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 401) {
          console.log("Password does not match.");
          setErrorMessage("Password does not match.");
          setShowErrorMessage(true);
          return;
        }

        if (response.status === 403) {
          console.log("You are not authorized to delete this account.");
          setErrorMessage("You are not authorized to delete this account.");
          setShowErrorMessage(true);
          return;
        }

        if (response.status === 404) {
          console.log("Account not found.");
          setErrorMessage("Account not found.");
          setShowErrorMessage(true);
          return;
        }

        if (response.status !== 204) {
          console.error(response.status + ": An unexpected error occurred:", response.statusText);
          setErrorMessage("An unexpected error occurred.");
          setShowErrorMessage(true);
          return;
        }
  
        console.log("Account has been deleted.");
        closeModal();
        return response.json();
      })
      .catch((error) => {
        console.error("An unexpected error occurred:", error);
        setErrorMessage("An unexpected error occurred. Please try again later.");
        setShowErrorMessage(true);
      });
  }

  const modalContent = (
 
        <main id='deleteAccountModal' className='modal' onMouseDown={closeModal}>
          <div className='modal-content' onMouseDown={(e) => e.stopPropagation()}>
            <h1 id='title'>Delete Account</h1>
            <Warning size={32} color="#FF0000" weight="fill" />
            <p>Are you sure you want to delete your account?</p>
            <p>You will not be able to recover your account after deletion.</p>
            <p>All your data will be permanently removed.</p>
            <p>Do you want to proceed?</p>
            <form id='bottom-section' onSubmit={deleteAccount}>
              <label htmlFor='password-field'>Password</label>
              <div className='toggle-password-button-container'>
                <input 
                  id='delete-account-password-field'
                  className='password-input-field' 
                  type={passwordVisible ? 'text' : 'password' }
                  required 
                />
                <button
                  type="button"
                  className="toggle-password-button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <EyeSlash/> : <Eye/> }
                </button>
              </div>
              <label htmlFor='verify-field'>Type <i id='verification-keyword'>delete</i> to confirm</label>
              <input id='verify-field' type='text' required />
              {showErrorMessage && (
                <p className="error-message">
                  {errorMessage}
                </p>
              )}
              <button className='submit-button' type='submit'>Delete Account</button>
              <button className='cancel-button' type='button' onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </main>
      );

      if (!isModalVisible) return null;

      return ReactDOM.createPortal(
        modalContent,
        document.body
      );
};

export default DeleteAccount;