import React from 'react';
import '../LoginRegister.css';

const ForgotPassword = ({ closeModal, isModalVisible, toggleMode }) => {
  return (
    <>
      {isModalVisible && (
        <div id="forgotPasswordModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h2 className="title">Forgot Password</h2>
            <form>
              <input className='input-field' id='forgotpassword-email-field' type="text" placeholder="E-mail" required />
              <button id="submit-button" type="submit" aria-label="Reset Password">Reset Password</button>
            </form>
            <button className="toggle-login-register-button" onClick={toggleMode} aria-label="Back to Login">Back to Login</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;