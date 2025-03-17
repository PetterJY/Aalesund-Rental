import React, { useState } from 'react';
import LoginButton from '../LoginRegister/Login/Login';
import logo from '../../resources/images/logo.png';
import '../global.css';
import './Header.css';
import { User, PencilSimple} from "@phosphor-icons/react";

const Header = ({page}) => {
  const showMenu = page === "rental";

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // TODO: Fix link
  return (
    <header className="top-header">
      <a href="http://localhost:3000/home" className="logoButton">
        <img src={logo} id="logo-image" alt="Logo" />
      </a>

      {showMenu && (
        <div className="top-menu-container">
          <div className="date-time-menu">
            <p>
              19. March | 12.30 - 05. April | 08.30
            </p>
          </div>
          <button className="edit-button">
            <PencilSimple size={32} className="edit-icon"/>
          </button>
        </div>
      )}

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