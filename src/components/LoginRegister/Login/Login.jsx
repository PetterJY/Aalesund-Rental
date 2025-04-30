import React, { useState, useEffect } from 'react';
import RegisterButton from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import '../../App.css';
import '../LoginRegister.css';

const LoginButton = ({ closeModal, isModalVisible, setIsLoggedIn, isLoggedIn, defaultMode }) => {
  const [mode, setMode] = useState(defaultMode);
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

  const handleLogin = (event) => {
    event.preventDefault(); 
    console.log("Login button clicked.");
    
    const data = retrieveData();

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        }
      })
      .then((data) => { 
        const token = data.jwt;
        localStorage.setItem('jwt', token); 
        setIsLoggedIn(true);
        console.log("isLoggedIn: " + isLoggedIn)
        console.log("Token: ", token);
        console.log("User has been logged in. Token stored.");
        closeModal();
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("The username and/or password you specified are not correct.");
        setShowErrorMessage(true);
      });
  }

  function retrieveData() {
    return {
      email: document.getElementById('login-email-field').value,
      password: document.getElementById('login-password-field').value,
    };
  }

  return (
    <>
      {isModalVisible && (
        <div id="loginModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            {mode === 'register' ? (
              <RegisterButton closeModal={closeModal} isModalVisible={isModalVisible} toggleMode={() => toggleMode('login')} />
            ) : mode === 'forgotPassword' ? (
              <ForgotPassword closeModal={closeModal} isModalVisible={isModalVisible} toggleMode={() => toggleMode('login')} />
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
                    >
                      {passwordVisible ? <EyeSlash color="#FF5F00" /> : <Eye color="#FF5F00" />}
                    </button>
                  </div>
                  {showErrorMessage && (
                    <p className="error-message" id="register-error-message">
                      {errorMessage}
                    </p>
                  )}
                  <button id="submit-button" type="submit">Login</button>
                </form>
                <section id="register-forgot-wrapper">
                  <button className="toggle-login-register-button" onClick={() => toggleMode('register')}>Create account</button>
                  <button className="forgot-password-button" onClick={() => toggleMode('forgotPassword')}>Forgot password</button>
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