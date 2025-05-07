import React from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import '../LoginRegister.css';
import '../../App.css';

const RegisterButton = ({ closeModal, isModalVisible, toggleMode }) => {
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(""); 

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };
  
  const handleRegister = (event) => {
    event.preventDefault(); 
    console.log("Register button clicked.");

    const data = retrieveData();

    /**
     * Check if the password and confirm password fields match.
     */
    if (data.password !== document.getElementById('confirm-password-field').value) {
      setErrorMessage("Passwords do not match.");
      setShowErrorMessage(true);
      return;
    }

    /**
     * Check if the password format is valid.
     * Must be:
     * - At least 8 characters long
     * - At least one letter and one number
     * - No special characters or non-ASCII characters
     */
    if (!validatePassword(data.password)) {
      setErrorMessage("Password must be at least 8 characters with letter and number, no special or non-ASCII characters.");
      setShowErrorMessage(true);
      return;
    }

    /**
     * Check if the email format is valid.
     */
    if (!validateEmail(data.email)) {
      setErrorMessage("Invalid email format.");
      setShowErrorMessage(true);
      return;
    }
    
    console.log("Data object: ", data);

    fetch('http://localhost:8080/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User has been registered.");
          closeModal();
        } else {
          console.log("Error creating account.");
          setErrorMessage("Error creating account. Please try again later.");
          setShowErrorMessage(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Error creating account. Please try again later.");
        setShowErrorMessage(true);
      });
  };

  function retrieveData() {
    return {
      firstName: document.getElementById('first-name-field').value,
      lastName: document.getElementById('last-name-field').value,
      email: document.getElementById('register-email-field').value,
      password: document.getElementById('register-password-field').value
    };
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  return (
    <>
      {isModalVisible && (
        <div id="registerModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h2 className="title">Create Account</h2>
            <form id="wrapper">
              <input className='input-field' id='register-email-field' type="text" placeholder="E-mail" required />
              <div id="name-wrapper">
                <input className='input-field' id="first-name-field" type="text" placeholder="First Name" required />
                <input className='input-field' id="last-name-field" type="text" placeholder="Last Name" required />
              </div>
              <div id="password-wrapper">
                <div className="toggle-password-button-container">
                  <input
                    id="register-password-field"
                    className="password-input-field"
                    type={passwordVisible ? 'text' : 'password'} 
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-button"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <EyeSlash color="#FF5F00" /> : <Eye color="#FF5F00" />}
                  </button>
                </div>
                  <div className="toggle-password-button-container">
                    <input
                      id="confirm-password-field"
                      className="password-input-field"
                      type={confirmPasswordVisible ? 'text' : 'password'} 
                      placeholder="Confirm Password"
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password-button"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {confirmPasswordVisible ? <EyeSlash color="#FF5F00" /> : <Eye color="#FF5F00" />}
                    </button>
                  </div>              </div>
              {showErrorMessage && (
                <p className="error-message" id="register-error-message">
                  {errorMessage}
                </p>
              )}
              <button id="submit-button" type="submit" onClick={handleRegister} className="submit-button">
                Register
              </button>
              <button className="toggle-login-register-button" onClick={toggleMode}>
                Already have an account? Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterButton;