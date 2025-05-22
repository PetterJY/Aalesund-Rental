import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { getRole } from '../../utils/JwtUtility'; 
import { Link } from 'react-router-dom';
import './AccountHeader.css';

const AccountHeader = () => {
  const location = useLocation(); 
  const isAdmin = getRole() === 'ROLE_ADMIN';
  const isAdminAccountPage = isAdmin && location.pathname === '/account/admin-rentals';

  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(getRole());
  }, []);

  return (
    <header className="account-menu">
      <nav aria-label="Account navigation">
        <ul className="account-menu-list" role="menubar">
          <li id="account-link" 
              className={location.pathname === '/account/account' ? 'active' : ''}
              role="menuitem">
            <Link to="/account/account" 
                  aria-current={location.pathname === '/account/account' ? 'page' : undefined}>
              Account
            </Link>
          </li>
          {role === 'ROLE_USER' && (
            <li id="orders-link" 
                className={location.pathname === '/account/orders' ? 'active' : ''}
                role="menuitem">
              <Link to="/account/orders" 
                    aria-current={location.pathname === '/account/orders' ? 'page' : undefined}>
                Orders
              </Link>
            </li>
          )}
          {role === 'ROLE_PROVIDER' && (
            <li id="my-rentals-link" 
                className={location.pathname === '/account/my-rentals' ? 'active' : ''}
                role="menuitem">
              <Link to="/account/my-rentals" 
                    aria-current={location.pathname === '/account/my-rentals' ? 'page' : undefined}>
                My Rentals
              </Link>
            </li>
          )}
          {role === 'ROLE_USER' && (
            <li id="favourites-link" 
                className={location.pathname === '/account/favourites' ? 'active' : ''}
                role="menuitem">
              <Link to="/account/favourites" 
                    aria-current={location.pathname === '/account/favourites' ? 'page' : undefined}>
                Favourites
              </Link>
            </li>
          )}
          {role === 'ROLE_ADMIN' && (
            <li id="admin-rentals-link" 
                className={location.pathname === '/account/admin-rentals' ? 'active' : ''}
                role="menuitem">
              <Link to="/account/admin-rentals" 
                    aria-current={location.pathname === '/account/admin-rentals' ? 'page' : undefined}>
                Rentals
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AccountHeader;