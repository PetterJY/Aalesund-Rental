import React, { useState } from 'react';
import LoginButton from '../LoginButton/LoginButton';
import logo from '../../resources/images/logo.png';
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
      <LoginButton showModal={showModal} closeModal={closeModal} isModalVisible={isModalVisible} />
    </header>
  );
};

export default Header;