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
        <div id="loginModal" className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <form>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;