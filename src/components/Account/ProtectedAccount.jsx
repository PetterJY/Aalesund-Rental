import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import AccountHeader from './AccountHeader/AccountHeader';

const ProtectedAccount = () => {
  const { isAuthenticated, isAuthInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && isAuthInitialized) {
      
      navigate('/home');
    }
  }, [isAuthenticated, isAuthInitialized, navigate]);
  
  if (!isAuthInitialized) {
    return (
      <div className="loading" role="status" aria-live="polite">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="account">
      <AccountHeader />
      <Outlet />
    </main>
  );
};

export default ProtectedAccount;