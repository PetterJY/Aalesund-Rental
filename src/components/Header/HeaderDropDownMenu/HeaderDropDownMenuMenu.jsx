import React, {useState, useEffect, useRef} from 'react';
import { getRole } from '../../utils/JwtUtility';
import PropTypes from 'prop-types';
import './HeaderDropDownMenu.css';
import '../../App.css';

const DropDownMenuMenu = ({ toggleDropdownMenu, isDropdownVisible, navigate, handleLogout }) => {
  const [role, setRole] = useState('');

  const accountHeaderRef = useRef(null);

  useEffect(() => {
    setRole(getRole());
  });


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownVisible &&
        accountHeaderRef.current &&
        !accountHeaderRef.current.contains(event.target)
      ) {
        toggleDropdownMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownVisible]);

  return (
    <div ref={accountHeaderRef} className={`dropdown-menu ${isDropdownVisible ? 'visible' : ''}`}>
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
        {role === 'ROLE_ADMIN' && (
          <li onClick={() => navigate('/account/admin-rentals')}>Rentals</li>
        )}
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

DropDownMenuMenu.propTypes = {
  isDropdownVisible: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default DropDownMenuMenu;