import React, { useState, useEffect } from 'react';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import ChangePassword from './ChangePassword/ChangePassword';
import AccountHeader from './AccountHeader/AccountHeader';
import './Account.css';
import '../App.css';

const Account = () => {
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

  return (
    <div className="account">
      <AccountHeader />
      <section className="account-section">
        <h1>Account</h1>
        <h2>Personal Information</h2>
        <h3>First name</h3>
        <input type="text" id="name" name="name" required />
        <h3>Last name</h3>
        <input type="text" id="last-name" name="last-name" required />
        <button className="save-button">Save</button>
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