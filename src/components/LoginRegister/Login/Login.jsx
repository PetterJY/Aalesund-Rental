import React, { useState, useEffect } from 'react';
import RegisterButton from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword'; // Import ForgotPassword component
import '../../App.css';
import '../LoginRegister.css';

const LoginButton = ({ closeModal, isModalVisible, defaultMode }) => {
  const [mode, setMode] = useState(defaultMode);

  useEffect(() => {
    if (!isModalVisible) {
      setMode(defaultMode);
    }
  }, [isModalVisible, defaultMode]);

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  const handleLogin = (event) => {
    event.preventDefault(); 
    console.log("Login button clicked.");
    const data = {
      email: document.getElementById('email-field').value,
      password: document.getElementById('password-field').value,
    };

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User has been logged in.");
          return response.json(); 
        } else {
          console.log("Error logging in.");
          alert("Error logging in. Please try again.");
        }
      })
      .then((data) => { 
        const token = data.jwt; 
        localStorage.setItem('jwt', token); 
        console.log("Token: ", token);
        console.log("User has been logged in. Token stored.");
        closeModal();
      });
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
                  <input id="email-field" type="text" placeholder="E-mail" required />
                  <input id="password-field" type="password" placeholder="Password" required />
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