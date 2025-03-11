import React, { useState } from 'react';
import LoginButton from '../LoginRegister/Login/Login';
import logo from '../../resources/images/logo.png';
import loginImage from '../../resources/images/login.png';
import '../global.css';
import './Header.css';
import { createRoot } from "react-dom/client";
import { User } from "@phosphor-icons/react";

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
      <a href="http://localhost:3000/home" className="logoButton">
        <img src={logo} id="logo-image" alt="Logo" />
      </a>
      <nav className="nav-bar">
        <LoginButton showModal={showModal} closeModal={closeModal} isModalVisible={isModalVisible} defaultMode="login" />
        <button id="login-create" onClick={showModal}>
          <User size={32} />
          Login | Register
        </button>
      </nav>
    </header>
  );
};

export default Header;