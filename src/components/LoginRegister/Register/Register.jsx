import React from 'react';
import '../../App.css';
import '../LoginRegister.css';

const RegisterButton = ({ closeModal, isModalVisible, toggleMode }) => {
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(""); 
  
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
      setErrorMessage("Must be at least 8 characters with letter and number, no special or non-ASCII characters.");
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
      email: document.getElementById('email-field').value,
      password: document.getElementById('password-field').value,
      role: "USER"
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
              <input id="email-field" type="text" placeholder="E-mail" required />
              <div id="name-wrapper">
                <input id="first-name-field" type="text" placeholder="First Name" required />
                <input id="last-name-field" type="text" placeholder="Last Name" required />
              </div>
              <div id="password-wrapper">
                <input id="password-field" type="password" placeholder="Password" required />
                <input id="confirm-password-field" type="password" placeholder="Confirm Password" required />
              </div>
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