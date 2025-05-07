import React, { useState, useEffect } from 'react';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import ChangePassword from './ChangePassword/ChangePassword';
import AccountHeader from './AccountHeader/AccountHeader';
import { getAccountId, getRole } from '../utils/JwtUtility';
import './Account.css';
import '../App.css';

const Account = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    setShowErrorMessage(false);
    setErrorMessage("");
  }, []); 
  
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  
  const openDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };
  
  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };
  
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);

  const openChangePasswordModal = () => {
    setIsChangePasswordModalVisible(true);
  };

  const closeChangePasswordModal = () => {
    setIsChangePasswordModalVisible(false);
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [accountId, setAccountId] = useState(getAccountId());
  const [role, setRole] = useState('');

  useEffect(() => {
    setAccountId(getAccountId());
    setRole(getRole());
  }, []);


  async function fetchUserData() {
    if (role !== 'ROLE_USER') {
      console.error('Unauthorized access: User role is not ROLE_USER');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/users/' + accountId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch user data:', response.statusText);
        return;
      }
      const data = await response.json();
      setFirstName(data.firstName);
      document.getElementById('name').value = firstName;
      setLastName(data.lastName);
      document.getElementById('last-name').value = lastName;
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    fetchUserData();
  });

  async function updateUserInformation() {    
    if (role !== 'ROLE_USER') {
      console.error('Unauthorized access: Account role is not ROLE_USER');
      setErrorMessage('Unauthorized access: Account role is not ROLE_USER');
      setShowErrorMessage(true);
      return;
    }

    const updatedUserDetails = {
      updatedFirstName: document.getElementById('name').value,
      updatedLastName: document.getElementById('last-name').value,
    };
    
    if (updatedUserDetails.updatedFirstName === '' || updatedUserDetails.updatedLastName === '') {
      setErrorMessage('Please fill in all fields.');
      setShowErrorMessage(true);
      return;
    }
    
    if (updatedUserDetails.updatedFirstName === firstName && updatedUserDetails.updatedLastName === lastName) {
      setErrorMessage('You can not update your account with the same data.');
      setShowErrorMessage(true);
      return;
    }

    try {
      const userData = await fetchUserData();
      if (!userData) {
        setErrorMessage('Failed to fetch user data. Please try again.');
        setShowErrorMessage(true);
        return;
      }

      const userDetails = {
        ...userData, // Include all existing fields
        firstName: updatedUserDetails.updatedFirstName,
        lastName: updatedUserDetails.updatedLastName,
      };

      console.log('Updated user details:', userDetails);

      const response = await fetch('http://localhost:8080/users/' + accountId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) {
        console.error('Failed to update user data:', response.statusText);
        setErrorMessage('Failed to update user data. Please try again.');
        setShowErrorMessage(true);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setFirstName(data.firstName);
        document.getElementById('name').value = firstName;
        setLastName(data.lastName);
        document.getElementById('last-name').value = lastName;
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setErrorMessage('An error occurred while updating user data. Please try again.');
      setShowErrorMessage(true);
    }
  }
    
  return (
    <div className="account">
      <AccountHeader />
      <section className="account-section">
        <h1>Account</h1>
        <h2>Personal Information</h2>
        {role === 'ROLE_USER' && (
          <>
            <h3>First name</h3>
            <input type="text" id="name" name="name" required />
            <h3>Last name</h3>
            <input type="text" id="last-name" name="last-name" required />
          </>
        )}

        {role === 'ROLE_PROVIDER' && (
          <>
            <h3>Company name</h3>
            <input type="text" id="company-name" name="company-name" required />    
          </>  
        )}

        {showErrorMessage && <p className="error-message">{errorMessage}</p>}

        <button className="save-button" onClick={updateUserInformation}>Save</button>
        <ul className="bottom-button-list">
          <li>
            <button className="bottom-button" onClick={openDeleteModal}>
              Delete Account
            </button>
          </li>
          <li>
            <button className="bottom-button" onClick={openChangePasswordModal}>
              Change Password
            </button>
          </li>
        </ul>
      </section>
      <DeleteAccount
        isModalVisible={isDeleteModalVisible}
        closeModal={closeDeleteModal}
      />
      <ChangePassword
        isModalVisible={isChangePasswordModalVisible}
        closeModal={closeChangePasswordModal}
      />
    </div>
  );
};

export default Account;