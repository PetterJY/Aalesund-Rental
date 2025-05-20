import React from 'react';
import { useAuth } from '../../utils/AuthContext';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import '../LoginRegister.css';

const RegisterButton = ({ closeModal, isModalVisible, toggleMode }) => {
  const { setIsAuthenticated, setIsAuthInitialized } = useAuth();

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
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  function retrieveData() {
    return {
      firstName: document.getElementById('first-name-field').value,
      lastName: document.getElementById('last-name-field').value,
      email: document.getElementById('register-email-field').value,
      password: document.getElementById('register-password-field').value,
      phoneNumber: document.getElementById('phone-number-field').value
    };
  }
  
  async function handleRegister(event) {
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

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed: " + response.statusText);
      }

      console.log("User has been registered.");
      const responseData = await response.json();
      console.log("Response data: ", responseData);
      const loginDetails = {
        email: data.email,
        password: data.password,
      };
      await login(loginDetails);
      closeModal();
    } catch(error) {
      console.error(error);
      setErrorMessage("Error creating account. Please try again later.");
      setShowErrorMessage(true);
    };
  };

  async function login(loginDetails) {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
      });

      console.log("Response status: ", response.status);
      if (!response.ok) {
        console.error("Login failed: ", response.statusText);
        if (response.status === 401) {;
          throw new Error("Login Failed: The username and/or password you specified are not correct.");
        } else if (response.status === 403) {
          throw new Error("Login Failed: You do not have permission to access this resource.");
        } else {
          throw new Error("Login Failed: An unknown error occurred. Please try again later.");
        }
      }

      const data = await response.json();
      const token = data.accessToken;

      console.log("Token: ", token);
      localStorage.setItem('accessToken', token); 
      setIsAuthenticated(true);
      setIsAuthInitialized(true);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <>
      {isModalVisible && (
        <div id="registerModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h2 className="title">Create Account</h2>
            <form id="wrapper">
              <input className='input-field' id='register-email-field' type="text" placeholder="E-mail" required />
              <input className='input-field' id='phone-number-field' type="text" placeholder="Phone Number" required />
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
                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                  >
                    {passwordVisible ? <EyeSlash color="var(--secondary-color)" /> : <Eye color="var(--secondary-color)" />}
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
                    aria-label={confirmPasswordVisible ? "Hide confirm password" : "Show confirm password"}
                  >
                    {confirmPasswordVisible ? <EyeSlash color="var(--secondary-color)" /> : <Eye color="var(--secondary-color)" />}
                  </button>
                </div>              
              </div>
              {showErrorMessage && (
                <p className="error-message" id="register-error-message">
                  {errorMessage}
                </p>
              )}
              <button id="submit-button" type="submit" onClick={handleRegister} className="submit-button" aria-label="Register">
                Register
              </button>
              <button className="toggle-login-register-button" onClick={toggleMode} aria-label="Already have an account? Login">
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