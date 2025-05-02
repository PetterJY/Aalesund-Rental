import React from 'react';
import PropTypes from 'prop-types';
import './DropDownMenu.css';
import '../../App.css';

const DropDownMenu = ({ isDropdownVisible, navigate, handleLogout }) => {
  return (
    <div className={`dropdown-menu ${isDropdownVisible ? 'visible' : ''}`}>
      <ul className="dropdown-menu-list">
        <li onClick={() => navigate('/account')}>Account</li>
        <li onClick={() => navigate('/account/orders')}>Orders</li>
        <li onClick={() => navigate('/account/my-rentals')}>Rentals</li>
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