import React, { useState } from 'react';
import LoginButton from '../LoginButton/LoginButton';
import logo from '../../resources/images/logo.png';
import loginImage from '../../resources/images/login.png';
import '../global.css';
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
        <LoginButton showModal={showModal} closeModal={closeModal} isModalVisible={isModalVisible} defaultMode="login" />
        <button id="login-create" onClick={showModal}>Login|Register</button>
      </nav>
    </header>
  );
};

export default Header;