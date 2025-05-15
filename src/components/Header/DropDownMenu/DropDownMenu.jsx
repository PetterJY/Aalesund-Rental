import React, { useState, useEffect } from 'react';
import { getRole } from '../../utils/JwtUtility'; 
import PropTypes from 'prop-types';
import './DropDownMenu.css';
import '../../App.css';

const DropDownMenu = ({ isDropdownVisible, navigate, handleLogout }) => {
  const [role, setRole] = useState('');

  useEffect(() => { 
    setRole(getRole());
  });

  return (
    <div className={`dropdown-menu ${isDropdownVisible ? 'visible' : ''}`}>
      <ul className="dropdown-menu-list">
        <li onClick={() => navigate('/account/account')}>Account</li>
        {role === 'ROLE_USER' && (
          <li onClick={() => navigate('/account/orders')}>Orders</li>
        )}
        {role === 'ROLE_PROVIDER' && (
          <li onClick={() => navigate('/account/my-rentals')}>My Rentals</li>
        )}
        {role === 'ROLE_USER' && (
          <li onClick={() => navigate('/account/favourites')}>Favourites</li>
        )}
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

DropDownMenu.propTypes = {
  isDropdownVisible: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default DropDownMenu;