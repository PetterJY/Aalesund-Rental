import React, {useState, useEffect, useRef} from 'react';
import { getRole } from '../../utils/JwtUtility';
import PropTypes from 'prop-types';
import './HeaderDropDownMenu.css';

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
    <nav 
      ref={accountHeaderRef} 
      className={`dropdown-menu ${isDropdownVisible ? 'visible' : ''}`}
      aria-expanded={isDropdownVisible}
      aria-label="Account navigation"
    >
      <ul 
        className="dropdown-menu-list" 
        role="menu"
      >
        <li role="none">
          <a 
            role="menuitem" 
            onClick={() => navigate('/account/account')}
            href="/account/account"
            tabIndex={isDropdownVisible ? 0 : -1}
          >
            Account
          </a>
        </li>
        {role === 'ROLE_USER' && (
          <li role="none">
            <a 
              role="menuitem" 
              onClick={() => navigate('/account/orders')}
              href="/account/orders"
              tabIndex={isDropdownVisible ? 0 : -1}
            >
              Orders
            </a>
          </li>
        )}
        {role === 'ROLE_PROVIDER' && (
          <li role="none">
            <a 
              role="menuitem" 
              onClick={() => navigate('/account/my-rentals')}
              href="/account/my-rentals"
              tabIndex={isDropdownVisible ? 0 : -1}
            >
              My Rentals
            </a>
          </li>
        )}
        {role === 'ROLE_USER' && (
          <li role="none">
            <a 
              role="menuitem" 
              onClick={() => navigate('/account/favourites')}
              href="/account/favourites"
              tabIndex={isDropdownVisible ? 0 : -1}
            >
              Favourites
            </a>
          </li>
        )}
        {role === 'ROLE_ADMIN' && (
          <li role="none">
            <a 
              role="menuitem" 
              onClick={() => navigate('/account/admin-rentals')}
              href="/account/admin-rentals"
              tabIndex={isDropdownVisible ? 0 : -1}
            >
              Rentals
            </a>
          </li>
        )}
        <li role="none">
          <a 
            role="menuitem" 
            onClick={handleLogout}
            href="#logout"
            tabIndex={isDropdownVisible ? 0 : -1}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

DropDownMenuMenu.propTypes = {
  isDropdownVisible: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default DropDownMenuMenu;