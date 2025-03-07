import React, { useState } from 'react';
import logo from '../../resources/images/logo.png';
import loginImage from '../../resources/images/login.png';
import './Header.css';

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <header className="top-header">
      <img src={logo} id="logo-image" alt="Logo" />
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
    </header>
  );
};

export default Header;