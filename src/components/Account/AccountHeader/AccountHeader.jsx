import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { getRole } from '../../utils/JwtUtility'; 
import './AccountHeader.css';
import '../../App.css';

const AccountHeader = () => {
  const location = useLocation(); 

  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(getRole());
    console.log('Role:', role);
  }, []);

  return (
    <header className="account-menu">
      <ul className="account-menu-list">
        <li id="account-link" className={location.pathname === '/account/account' ? 'active' : ''}>
          <a href="/account/account">Account</a>
        </li>
        {role === 'USER' && (
          <li id="orders-link" className={location.pathname === '/account/orders' ? 'active' : ''}>
            <a href="/account/orders">Orders</a>
          </li>
        )}
        {role === 'PROVIDER' && (
          <li id="my-rentals-link" className={location.pathname === '/account/my-rentals' ? 'active' : ''}>
            <a href="/account/my-rentals">My Rentals</a>
          </li>
        )}
      </ul>
    </header>
  );
};

export default AccountHeader;