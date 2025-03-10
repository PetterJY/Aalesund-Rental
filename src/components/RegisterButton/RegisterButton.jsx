import React from 'react';
import '../global.css';
import './RegisterButton.css';

const RegisterButton = ({closeModal, isModalVisible }) => {
  return (
    <>
      {isModalVisible && (
        <div id="registerModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h2>Register</h2>
            <form>
              <input id="register-email-field" type="text" placeholder="E-mail" required />
              <input id="register-password-field" type="password" placeholder="Password" required />
              <button id="register-submit-button" type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterButton;