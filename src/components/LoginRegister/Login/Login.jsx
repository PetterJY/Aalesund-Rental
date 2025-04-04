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
                <h2 class="title">Login</h2>
                <form>
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