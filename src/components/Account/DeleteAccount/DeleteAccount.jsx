import { useState } from 'react';
import { Warning } from '@phosphor-icons/react';
import './DeleteAccount.css';
import '../../App.css';

const DeleteAccount = ({ closeModal, isModalVisible }) => {
  function deleteAccount(event) {
    event.preventDefault();

    const data = retrieveData();

    if (document.getElementById('verify-field').value === 'delete') {
      fetch('http://localhost:8080/auth/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.password),
      })
        .then((response) => {
          if (response.ok) { 
            console.log("Password has been verified.");

            fetch('http://localhost:8080/users/email', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data.email),
            })
      
            alert('Account deleted successfully!');
            return response.json(); 
          } else {
            alert("The password you specified is not correct.");
            throw new Error('Password verification failed');
          }
        })
   
      closeModal();
    } else {
      alert('Please try again, something went wrong.');
    }
  }

  function retrieveData() {
    return {
      email: document.getElementById('email-field').value,
      password: document.getElementById('password-field').value,
    };
  }

  return (
    <>
      {isModalVisible && (
        <main id='deleteAccountModal' className='modal' onMouseDown={closeModal}>
          <div className='modal-content' onMouseDown={(e) => e.stopPropagation()}>
            <h1 id='title'>Delete Account</h1>
            <section id='warning-section'>
              <Warning size={32} color="#FF0000" weight="fill" />
              <h2>Are you sure you want to delete your account?</h2>
            </section>
            <p>You will not be able to recover your account after deletion.</p>
            <p>All your data will be permanently removed.</p>
            <p>Do you want to proceed?</p>
            <form id='bottom-section' onSubmit={deleteAccount}>
              <label htmlFor='email-field'>Email</label>
              <input id='email-field' className='email-field' type='text' required />
              <label htmlFor='password-field'>Password</label>
              <input id='password-field' className='password-field' type='text' required />
              <label htmlFor='verify-field'>Type <i id='verification-keyword'>delete</i> to confirm</label>
              <input id='verify-field' type='text' required />
              <button className='submit-button' type='submit'>Delete Account</button>
              <button className='cancel-button' type='button' onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </main>
      )}
    </>
  );
};

export default DeleteAccount;