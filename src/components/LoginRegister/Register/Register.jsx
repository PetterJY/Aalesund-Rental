import React from 'react';
import '../../global.css';
import '../LoginRegister.css';

const RegisterButton = ({ closeModal, isModalVisible, toggleMode }) => {
  return (
    <>
      {isModalVisible && (
        <div id="registerModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h2 class="title">Create Account</h2>
            <form id="wrapper">
              <input id="email-field" type="text" placeholder="E-mail" required />
              <div id="name-wrapper">
                <input id="first-name-field" type="text" placeholder="First Name" required />
                <input id="last-name-field" type="text" placeholder="Last Name" required />
              </div>
              <div id="password-wrapper">
                <input id="password-field" type="password" placeholder="Password" required />
                <input id="confirm-password-field" type="password" placeholder="Confirm Password" required />
              </div>
              <button id="submit-button" type="submit">Register</button>
              <button class="toggle-login-register-button" onClick={toggleMode}>Already have an account? Login</button>
            </form> 
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterButton;