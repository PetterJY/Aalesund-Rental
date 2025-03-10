import React, { useState, useEffect } from 'react';
import RegisterButton from '../RegisterButton/RegisterButton';
import '../../global.css';
import '../LoginRegister.css';

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
              <RegisterButton closeModal={closeModal} isModalVisible={isModalVisible} toggleMode={toggleMode} />
            ) : (
              <>
                <h2>Login</h2>
                <form>
                  <input id="email-field" type="text" placeholder="E-mail" required />
                  <input id="password-field" type="password" placeholder="Password" required />
                  <button id="submit-button" type="submit">Login</button>
                </form>
                <section id="register-forgot-wrapper">
                  <button class="toggle-login-register-button" onClick={toggleMode}>Create account</button>
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