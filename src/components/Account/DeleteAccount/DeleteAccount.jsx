import { useState } from 'react';
import { Warning } from '@phosphor-icons/react';
import './DeleteAccount.css';
import '../../App.css';

const DeleteAccount = ({ closeModal, isModalVisible }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function deleteAccount(event) {
    event.preventDefault();
  
    const data = retrieveData();
  
    // Check if the verification-keyword matches
    if (document.getElementById('verify-field').value !== 'delete') {
      console.log("Verification keyword does not match.");
      setErrorMessage("Verification keyword does not match.");
      setShowErrorMessage(true);
      return; // Exit early if the verification keyword is incorrect
    }
  
    // Verify the password
    fetch('http://localhost:8080/auth/verify-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.password),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error verifying password.");
          setErrorMessage("Password doesn't match.");
          setShowErrorMessage(true);
          return; // Exit early if the password verification fails
        }
  
        console.log("Password has been verified.");
  
        // Proceed to delete the account
        return fetch('http://localhost:8080/users/email', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data.email),
        });
      })
      .then((response) => {
        if (!response || !response.ok) {
          console.log("Email not found.");
          setErrorMessage("Email not found.");
          setShowErrorMessage(true);
          return; // Exit early if the email deletion fails
        }
  
        console.log("Account has been deleted.");
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
      email: document.getElementById('email-field').value,
      password: document.getElementById('password-field').value,
    };
  }

  return (
    <>
      {isModalVisible && (
        <main id='deleteAccountModal' className='modal' onMouseDown={closeModal}>
          <div className='modal-content' onMouseDown={(e) => e.stopPropagation()}>
            <h1 id='title'>Delete Account</h1>
            <Warning size={32} color="#FF0000" weight="fill" />
            <p>Are you sure you want to delete your account?</p>
            <p>You will not be able to recover your account after deletion.</p>
            <p>All your data will be permanently removed.</p>
            <p>Do you want to proceed?</p>
            <form id='bottom-section' onSubmit={deleteAccount}>
              <label htmlFor='email-field'>Email</label>
              <input id='email-field' className='email-field' type='text' required />
              <label htmlFor='password-field'>Password</label>
              <input id='password-field' className='password-field' type='text' required />
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
      )}
    </>
  );
};

export default DeleteAccount;