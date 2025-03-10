import React from 'react';
import loginImage from '../../resources/images/login.png';
import '../global.css';
import './LoginButton.css';

const LoginButton = ({ showModal, closeModal, isModalVisible }) => {
  return (
    <>
      <nav className="nav-bar">
        <img src={loginImage} id="login-image" alt="Login" />
        <button id="login-create" onClick={showModal}>Login|Register</button>
      </nav>
      {isModalVisible && (
        <div id="loginModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <form>
              <input id="email-field" type="text" placeholder="E-mail" required />
              <input id="password-field" type="password" placeholder="Password" required />
              <button id="submit-button" type="submit">Login</button>
            </form>
            <section id="register-forgot-wrapper">
              <button id="register-button">Create account</button>
              <button id="forgot-password-button">Forgot password</button>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;