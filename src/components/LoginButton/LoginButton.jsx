import React, { useState, useEffect } from 'react';
import '../global.css';
import './LoginButton.css';

const LoginButton = ({ showModal, closeModal, isModalVisible, defaultMode }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(defaultMode === 'register');

  useEffect(() => {
    if (!isModalVisible) {
      setIsRegisterMode(defaultMode === 'register');
    }
  }, [isModalVisible, defaultMode]);

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <>
      {isModalVisible && (
        <div id="loginModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            {isRegisterMode ? (
              <>
                <h2>Register</h2>
                <form>
                  <input id="register-email-field" type="text" placeholder="E-mail" required />
                  <input id="register-password-field" type="password" placeholder="Password" required />
                  <button id="register-submit-button" type="submit">Register</button>
                </form>
                <button id="toggle-login-button" onClick={toggleMode}>Already have an account? Login</button>
              </>
            ) : (
              <>
                <h2>Login</h2>
                <form>
                  <input id="email-field" type="text" placeholder="E-mail" required />
                  <input id="password-field" type="password" placeholder="Password" required />
                  <button id="submit-button" type="submit">Login</button>
                </form>
                <section id="register-forgot-wrapper">
                  <button id="register-button" onClick={toggleMode}>Create account</button>
                  <button id="forgot-password-button">Forgot password</button>
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