import React, { useState, useEffect } from 'react';
import RegisterButton from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { useAuth } from '../../utils/AuthContext';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import '../LoginRegister.css';

const LoginButton = ({ closeModal, isModalVisible, defaultMode }) => {
  const [mode, setMode] = useState(defaultMode);

  const { setIsAuthenticated, setIsAuthInitialized } = useAuth();
  
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isModalVisible) {
      setMode(defaultMode);
      setShowErrorMessage(false);
      setErrorMessage("");
    }
  }, [isModalVisible, defaultMode]);

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  function retrieveData() {
    return {
      email: document.getElementById('login-email-field').value,
      password: document.getElementById('login-password-field').value,
    };
  }

  async function handleLogin(event) {
    event.preventDefault(); 

    console.log("Attempting to login.");
    
    const loginDetails = retrieveData();

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
        if (response.status === 401) {
          setErrorMessage("The username and/or password you specified are not correct.");
          setShowErrorMessage(true);
          throw new Error("Login Failed: The username and/or password you specified are not correct.");
        } else if (response.status === 403) {
          setErrorMessage("You do not have permission to access this resource.");
          setShowErrorMessage(true);
          throw new Error("Login Failed: You do not have permission to access this resource.");
        } else {
          setErrorMessage("An unknown error occurred. Please try again later.");
          setShowErrorMessage(true);
          throw new Error("Login Failed: An unknown error occurred. Please try again later.");
        }
      }

      const data = await response.json();
    
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      console.log("Refresh Token: ", refreshToken);
      console.log("Access Token: ", accessToken);

      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken); 

      setIsAuthenticated(true);
      setIsAuthInitialized(true);
      closeModal();
    } catch(error) {
      console.error(error);
      setErrorMessage("The username and/or password you specified are not correct.");
      setShowErrorMessage(true);
    };
  }

  return (
    <>
      {isModalVisible && (
        <div id="loginModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            {mode === 'register' ? (
              <RegisterButton 
                closeModal={closeModal} 
                isModalVisible={isModalVisible}
                toggleMode={() => toggleMode('login')} 
              />
            ) : mode === 'forgotPassword' ? (
              <ForgotPassword 
                closeModal={closeModal} 
                isModalVisible={isModalVisible} 
                toggleMode={() => toggleMode('login')} 
              />
            ) : (
              <>
                <h2 className="title">Login</h2>
                <form onSubmit={handleLogin}>
                  <input className='input-field' id='login-email-field' type="text" placeholder="E-mail" required />
                  <div className="toggle-password-button-container">
                    <input
                      id="login-password-field"
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

                  {showErrorMessage && (
                    <p className="error-message" id="register-error-message">
                      {errorMessage}
                    </p>
                  )}

                  <button id="submit-button" type="submit" aria-label="Login">Login</button>
                </form>
                <section id="register-forgot-wrapper">
                  <button className="toggle-login-register-button" onClick={() => toggleMode('register')} aria-label="Create account">Create account</button>
                  <button className="forgot-password-button" onClick={() => toggleMode('forgotPassword')} aria-label="Forgot password">Forgot password</button>
                </section>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;