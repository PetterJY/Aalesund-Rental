import React, { useState, useEffect } from 'react';
import { getAccountId, getRole } from '../utils/JwtUtility';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import ChangePassword from './ChangePassword/ChangePassword';
import RegisterProvider from '../LoginRegister/Register/RegisterProvider';
import './Account.css';

const Account = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateProviderModalVisible, setIsCreateProviderModalVisible] = useState(false);
  
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

  const openCreateProviderModal = () => {
    setIsCreateProviderModalVisible(true);
  };

  const closeCreateProviderModal = () => {
    setIsCreateProviderModalVisible(false);
  };

  const [accountId, setAccountId] = useState(getAccountId());
  const [role, setRole] = useState('');

  const [messageType, setMessageType] = useState('error');

  useEffect(() => {
    setAccountId(getAccountId());
    setRole(getRole());
  }, []);

  useEffect(() => {
    if (role === 'ROLE_USER') {
      fetchUserData();
    } else if (role === 'ROLE_PROVIDER') {
      fetchProviderData();
    } else if (role === 'ROLE_ADMIN') {
      fetchAdminData();
    }
  }, [role, accountId]); // Add dependencies

  async function updateAccountInformation() {
    if (role === 'ROLE_USER') {
      await updateUserInformation();
    } else if (role === 'ROLE_PROVIDER') {
      await updateProviderInformation();
    } else if (role === 'ROLE_ADMIN') {
      await updateAdminInformation();
    }
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  async function fetchUserData() {
    if (role !== 'ROLE_USER') {
      console.error('Unauthorized access: User role is not ROLE_USER');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/accounts/${accountId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch user data:', response.statusText);
        return;
      }

      const data = await response.json();

      setFirstName(data.firstName);
      setLastName(data.lastName);
      
      if (document.getElementById('first-name')) {
        document.getElementById('first-name').value = data.firstName;
      }
      if (document.getElementById('last-name')) {
        document.getElementById('last-name').value = data.lastName;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async function updateUserInformation() {    
    if (role !== 'ROLE_USER') {
      console.error('Unauthorized access: Account role is not ROLE_USER');
      setErrorMessage('Unauthorized access: Account role is not ROLE_USER');
      setShowErrorMessage(true);
      return;
    }

    const updatedFirstName = document.getElementById('first-name').value;
    const updatedLastName = document.getElementById('last-name').value;
    
    if (updatedFirstName === '' || updatedLastName === '') {
      setErrorMessage('Please fill in all fields.');
      setShowErrorMessage(true);
      return;
    }
    
    if (updatedFirstName === firstName && updatedLastName === lastName) {
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

      // Create properly formatted user details object
      const userDetails = {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber
      };

      const response = await fetch(`http://localhost:8080/api/users/${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        console.error('Failed to update user data:', response.statusText);
        setErrorMessage('Failed to update user data. Please try again.');
        setShowErrorMessage(true);
        return;
      }

      // Update state and input fields with the new values
      const data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      
      // Set the input fields to the NEW values from the response
      document.getElementById('first-name').value = data.firstName;
      document.getElementById('last-name').value = data.lastName;
      
      setErrorMessage("Profile updated successfully!");
      setMessageType('success');
      setShowErrorMessage(true);

    } catch (error) {
      console.error('Error updating user data:', error);
      setErrorMessage('An error occurred while updating user data. Please try again.');
      setShowErrorMessage(true);
    }
  }

  async function fetchProviderData() {
    if (role !== 'ROLE_PROVIDER') {
      console.error('Unauthorized access: Provider role is not ROLE_PROVIDER');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/providers/' + accountId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch provider data:', response.statusText);
        return;
      }
      const data = await response.json();
      setCompanyName(data.companyName);
      // USE DATA FROM RESPONSE, not the state variable
      document.getElementById('company-name').value = data.companyName;
      return data;
    } catch (error) {
      console.error('Error fetching provider data:', error);
    }
  }
      
  const [companyName, setCompanyName] = useState('');

  async function updateProviderInformation() {
    if (role !== 'ROLE_PROVIDER') {
      console.error('Unauthorized access: Account role is not ROLE_PROVIDER');
      setErrorMessage('Unauthorized access: Account role is not ROLE_PROVIDER');
      setShowErrorMessage(true);
      return;
    }

    const updatedCompanyName = document.getElementById('company-name').value;

    if (updatedCompanyName === '') {
      setErrorMessage('Please fill in all fields.');
      setShowErrorMessage(true);
      return;
    }

    if (updatedCompanyName === companyName) {
      setErrorMessage('You can not update your account with the same data.');
      setShowErrorMessage(true);
      return;
    }

    try {
      const providerData = await fetchProviderData();
      if (!providerData) {
        setErrorMessage('Failed to fetch provider data. Please try again.');
        setShowErrorMessage(true);
        return;
      }

      const providerDetails = {
        ...providerData, 
        companyName: updatedCompanyName,
      };

      console.log('Updated provider details:', providerDetails);

      const response = await fetch('http://localhost:8080/api/providers/' + accountId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(providerDetails),
      });
      if (!response.ok) {
        console.error('Failed to update provider data:', response.statusText);
        setErrorMessage('Failed to update provider data. Please try again.');
        setShowErrorMessage(true);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setCompanyName(data.companyName);
        document.getElementById('company-name').value = data.companyName;

        setErrorMessage("Company profile updated successfully!");
        setMessageType('success');
        setShowErrorMessage(true);
        
      }
    } catch (error) {
      console.error('Error updating provider data:', error);
      setErrorMessage('An error occurred while updating provider data. Please try again.');
      setShowErrorMessage(true);
    }
  }

  async function fetchAdminData() {
    if (role !== 'ROLE_ADMIN') {
      console.error('Unauthorized access: Admin role is not ROLE_ADMIN');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/admins/' + accountId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch admin data:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Admin data:', data);

      const usernameValue = data.name;
      setUsername(usernameValue);
      document.getElementById('username').value = data.name;
      return data;
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  }

  const [username, setUsername] = useState('');

  async function updateAdminInformation() {
    if (role !== 'ROLE_ADMIN') {
      console.error('Unauthorized access: Account role is not ROLE_ADMIN');
      setErrorMessage('Unauthorized access: Account role is not ROLE_ADMIN');
      setShowErrorMessage(true);
      return;
    }

    const updatedUsername = document.getElementById('username').value;

    if (updatedUsername === '') {
      setErrorMessage('Please fill in all fields.');
      setShowErrorMessage(true);
      return;
    }

    if (updatedUsername === username) {
      setErrorMessage('You can not update your account with the same data.');
      setShowErrorMessage(true);
      return;
    }

    try {
      const adminData = await fetchAdminData();
      if (!adminData) {
        setErrorMessage('Failed to fetch admin data. Please try again.');
        setShowErrorMessage(true);
        return;
      }

      const adminDetails = {
        ...adminData, 
        name: updatedUsername,
      };

      console.log('Updated admin details:', adminDetails);

      const response = await fetch('http://localhost:8080/api/admins/' + accountId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(adminDetails),
      });

      if (!response.ok) {
        console.error('Failed to update admin data:', response.statusText);
        setErrorMessage('Failed to update admin data. Please try again.');
        setShowErrorMessage(true);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        document.getElementById('username').value = data.name;

        setErrorMessage("Admin profile updated successfully!");
        setMessageType('success');
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error('Error updating admin data:', error);
      setErrorMessage('An error occurred while updating admin data. Please try again.');
      setShowErrorMessage(true);
    }
  }
    
  return (
    <main className="account">
      <section className="account-section">
        <h1>Account</h1>
        <h2>Personal Information</h2>

        {role === 'ROLE_USER' && (
          <>
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" name="first-name" required />
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" name="last-name" required />
          </>
        )}

        {role === 'ROLE_PROVIDER' && (
          <>
            <label htmlFor="company-name">Company name</label>
            <input type="text" id="company-name" name="company-name" required />    
          </>  
        )}

        {role === 'ROLE_ADMIN' && (
          <>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="name" required />
          </>
        )}

        {showErrorMessage && (
          <p className={messageType === 'error' ? "error-message" : "success-message"}>
            {errorMessage}
          </p>
        )}

        <button
          className="save"
          onClick={updateAccountInformation}
          aria-label="Save account information"
        >
          Save
        </button>
        <ul className="bottom-button-list">
          <li>
            <button
              className="bottom-button"
              onClick={openDeleteModal}
              aria-label="Delete Account"
            >
              Delete Account
            </button>
          </li>
          <li>
            <button
              className="bottom-button"
              onClick={openChangePasswordModal}
              aria-label="Change Password"
            >
              Change Password
            </button>
          </li>
          {role === 'ROLE_ADMIN' && (
          <li>
            <button
              className="bottom-button action-button"
              onClick={openCreateProviderModal}
              aria-label="Create Provider Account"
            >
              Create Provider Account
            </button>
          </li>
        )}
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
      {role === 'ROLE_ADMIN' && (
      <RegisterProvider
        isModalVisible={isCreateProviderModalVisible}
        closeModal={closeCreateProviderModal}
      />
    )}
    </main>
  );
};

export default Account;