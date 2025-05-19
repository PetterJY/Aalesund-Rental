import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import AccountHeader from './AccountHeader/AccountHeader';

const ProtectedAccount = () => {
  const { isAuthenticated, isAuthInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && isAuthInitialized) {
      console.error('User is not authenticated. Redirecting to home page.');
      navigate('/home');
    }
  }, [isAuthenticated, isAuthInitialized, navigate]);

  if (!isAuthInitialized) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="account">
      <AccountHeader />
      <Outlet />
    </div>
  );
};

export default ProtectedAccount;