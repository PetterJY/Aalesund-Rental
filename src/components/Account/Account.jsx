import React, { useState, useEffect } from 'react';
import { getAccountId, getRole } from '../utils/JwtUtility';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import ChangePassword from './ChangePassword/ChangePassword';
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

  const [accountId, setAccountId] = useState(getAccountId());
  const [role, setRole] = useState('');

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
  });

  async function updateAccountInformation() {
    if (role === 'ROLE_USER') {
      await updateUserInformation();
    } else if (role === 'ROLE_PROVIDER') {
      await updateProviderInformation();
    } else if (role === 'ROLE_ADMIN') {
      await updateAdminInformation();
    }
  }

  //USER SECTION:

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  async function fetchUserData() {
    if (role !== 'ROLE_USER') {
      console.error('Unauthorized access: User role is not ROLE_USER');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/accounts/${accountId}`, {
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

    const updatedUserDetails = {
      updatedFirstName: document.getElementById('first-name').value,
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

      const oldFirstName = firstName;
      const oldLastName = lastName;

      const userDetails = {
        ...userData, // Include all existing fields
        firstName: updatedUserDetails.updatedFirstName,
        lastName: updatedUserDetails.updatedLastName,
      };


      console.log('Updated user details:', userDetails);

      const response = await fetch(`http://localhost:8080/users/${accountId}`, {
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
      if (response.ok) {
        const data = await response.json();
        setFirstName(data.firstName);
        document.getElementById('first-name').value = firstName;
        setLastName(data.lastName);
        document.getElementById('last-name').value = lastName;
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setErrorMessage('An error occurred while updating user data. Please try again.');
      setShowErrorMessage(true);
    }
  }

  // PROVIDER SECTION:

  async function fetchProviderData() {
    if (role !== 'ROLE_PROVIDER') {
      console.error('Unauthorized access: Provider role is not ROLE_PROVIDER');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/providers/' + accountId, {
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
      document.getElementById('company-name').value = companyName;
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
        ...providerData, // Include all existing fields
        companyName: updatedCompanyName,
      };

      console.log('Updated provider details:', providerDetails);

      const response = await fetch('http://localhost:8080/providers/' + accountId, {
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
        document.getElementById('company-name').value = companyName;
      }
    } catch (error) {
      console.error('Error updating provider data:', error);
      setErrorMessage('An error occurred while updating provider data. Please try again.');
      setShowErrorMessage(true);
    }
  }

  //ADMIN SECTION:

  async function fetchAdminData() {
    if (role !== 'ROLE_ADMIN') {
      console.error('Unauthorized access: Admin role is not ROLE_ADMIN');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/admins/' + accountId, {
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
      setUsername(data.name);
      document.getElementById('username').value = username;
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
        ...adminData, // Include all existing fields
        username: updatedUsername,
      };

      console.log('Updated admin details:', adminDetails);

      const response = await fetch('http://localhost:8080/admins/' + accountId, {
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
        document.getElementById('username').value = username;
      }
    } catch (error) {
      console.error('Error updating admin data:', error);
      setErrorMessage('An error occurred while updating admin data. Please try again.');
      setShowErrorMessage(true);
    }
  }
    
  return (
    <div className="account">
      <section className="account-section">
        <h1>Account</h1>
        <h2>Personal Information</h2>

        {role === 'ROLE_USER' && (
          <>
            <h3>First name</h3>
            <input type="text" id="first-name" name="first-name" required />
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

        {role === 'ROLE_ADMIN' && (
          <>
            <h3>Username</h3>
            <input type="text" id="username" name="name" required />
          </>
        )}

        {showErrorMessage && <p className="error-message">{errorMessage}</p>}

        <button className="save-button" onClick={updateAccountInformation}>Save</button>
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